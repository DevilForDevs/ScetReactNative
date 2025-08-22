import { StyleSheet, View, FlatList } from "react-native";

import TopPart from "./widgets/TopPart";
import SessionItem from "./widgets/SessionItem";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App/App"; // adjust path if needed
import { fetchItems, Subtopic, SubTopicItem, Topic } from "../../utils/apis";
import React, { useState, useEffect } from 'react';
import AdsManager from "../../utils/AdsManager";


type NavigationProp = NativeStackNavigationProp<RootStackParamList, "CatgegoryDetail">;
type RouteProps = RouteProp<RootStackParamList, "CatgegoryDetail">;

export default function CategoryDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const topic: Topic = route.params; // 

  const [subtopicList, setSubtopicList] = useState<Subtopic[]>([]);

  useEffect(() => {
    fetchItems(topic.topic_id).then((res) => {
      if (res.subtopics) {
        setSubtopicList(res.subtopics);
      }
    });
  }, []);

  const handlePress = (topic: SubTopicItem, mindex: number) => {
    const shown = AdsManager.showAd(() => {
      console.log("Ad closed ✅");
      navigation.navigate("PlayerScreen", {
        items: subtopicList,
        selectedIndex: mindex,  // 👈 start from first item
      })
    });

    if (!shown) {
      navigation.navigate("PlayerScreen", {
        items: subtopicList,
        selectedIndex: mindex,  // 👈 start from first item
      })
    }
  };

  return (

    <View style={styles.body}>
      <FlatList
        data={subtopicList}
        renderItem={({ index, item }) => (
          <SessionItem
            title={item.title}
            duration={item.duration}
            onPress={() => handlePress(item, index)
            }
            isPlaying={false}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<TopPart topic={topic} />}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 50
  },
});
