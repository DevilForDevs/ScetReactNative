import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../MainApp/MainApp";
import React, { useState, useEffect } from "react";
import { fetchTopics, Topic } from "../../utils/apis";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "BottomNav">;

export default function CategoriesScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [topicsList, setTopicsList] = useState<Topic[]>([]);
  const domain = "https://kingamit.com";

  useEffect(() => {
    fetchTopics().then((res) => {
      if (res.items) {
        const tempTopics: Topic[] = [];

        res.items.forEach((element) => {
          // Normalize thumbnail
          if (!element.thumbnail.startsWith("http")) {
            element.thumbnail = `${domain}/thumbnails/${element.thumbnail}`;
          }

          if (element.language !== "Setup") {
            tempTopics.push(element);
          }
        });

        setTopicsList(tempTopics);
      }
    });
  }, []);



  const renderItem = ({ item, index }: { item: Topic; index: number }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => {
      navigation.navigate("CatgegoryDetail", topicsList[index]);
    }}
  >
    <Image source={{ uri: item.thumbnail }} style={styles.image} />
    <View style={styles.overlay}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  </TouchableOpacity>
);

  return (
    <View style={styles.body}>
      <Text style={styles.header}>Categories</Text>
      <FlatList
        data={topicsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.topic_id.toString()}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingTop: 50,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  item: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
    width: 100, // you can adjust or calculate with Dimensions
    height: 100,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 4,
  },
});
