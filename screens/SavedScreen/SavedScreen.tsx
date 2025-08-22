import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Topic } from "../../utils/apis";
import TopicItem from "../HomeScreen/widgets/TopicItem";
import TopPart from "./widgets/TopPart";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../MainApp/MainApp";
import { useNavigation } from "@react-navigation/native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "BottomNav">;

export default function SavedScreen() {
  const [savedTopics, setSavedTopics] = useState<Topic[]>([]);
  const navigation = useNavigation<NavigationProp>();
  const loadSaved = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem("savedTopics");
      setSavedTopics(stored ? JSON.parse(stored) : []);
      console.log(stored)
    } catch (err) {
      console.error("Error loading saved topics", err);
    }
  }, []);

  // Reload whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadSaved();
    }, [loadSaved])
  );

  // When bookmark toggled
  const handleToggleSave = async (id: number) => {
    await loadSaved(); // reload from storage
  };

  return (
    <FlatList
      data={savedTopics}
      keyExtractor={(item) => item.topic_id.toString()}
      renderItem={({ item }) => (
        <TopicItem
          item={item}
          isSaved={true} // All in saved screen are saved
          onToggleSave={handleToggleSave}
          onPress={() => navigation.navigate("CatgegoryDetail", item)}
        />
      )}
      ListHeaderComponent={<TopPart />}
      showsVerticalScrollIndicator={false}
      style={styles.body}
      ListEmptyComponent={
        <View style={{ padding: 24 }}>
          <Text style={{ textAlign: "center", color: "#7C7F88" }}>
            No saved items yet
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "white",
    flex: 1,
   
  },
});
