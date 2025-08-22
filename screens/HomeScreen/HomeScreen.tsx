import { StyleSheet, Text, View, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import Poster from "./widgets/Poster";
import { fetchTopics, Topic } from "../../utils/apis";
import TopicItem from "./widgets/TopicItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../MainApp/MainApp";
import { useNavigation } from "@react-navigation/native";
import AdsManager from "../../utils/AdsManager";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "BottomNav">;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [isLoading, setIsLoading] = useState(true);
  const [savedTopics, setSavedTopics] = useState<Topic[]>([]);
  const [category, setCategory] = useState(-1); // 👈 -1 means "All"

  const [banners, setBanners] = useState<Topic[]>([]);
  const [languagesAndFrameWorks, setLanguagesAndFrameWorks] = useState<string[]>([]);
  const [topicsList, setTopicsList] = useState<Topic[]>([]);

  const domain = "https://kingamit.com";


  useEffect(() => {
    // preload an ad when screen mounts
    AdsManager.loadAd();
  }, []);

  // 🔹 Load saved topics initially
  const loadSaved = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem("savedTopics");
      setSavedTopics(stored ? JSON.parse(stored) : []);
    } catch (err) {
      console.error("Error loading saved topics", err);
    }
  }, []);

  useEffect(() => {
    loadSaved();
  }, [loadSaved]);

  // 🔹 Toggle bookmark
  const handleToggleSave = async (id: number) => {
    await loadSaved(); // reload from storage
  };

  useEffect(() => {
    fetchTopics().then((res) => {
      if (res.items) {
        const totalItems = res.items.length;

        const tempBanners: Topic[] = [];
        const tempLanguages: string[] = [];
        const tempTopics: Topic[] = [];

        res.items.forEach((element, index) => {
          // Normalize thumbnail
          if (!element.thumbnail.startsWith("http")) {
            element.thumbnail = `${domain}/thumbnails/${element.thumbnail}`;
          }

          if (element.language !== "Setup") {
            if (!tempLanguages.includes(element.language)) {
              tempLanguages.push(element.language);
            }
            if (!tempLanguages.includes(element.framework)) {
              tempLanguages.push(element.framework);
            }
            tempTopics.push(element);
          } else {
            tempBanners.push(element);
          }

          if (index >= totalItems - 2 && !tempBanners.includes(element)) {
            tempBanners.push(element);
          }
        });

        setLanguagesAndFrameWorks(tempLanguages);
        setTopicsList(tempTopics);
        setBanners(tempBanners);

        // 👇 default select first category
        if (tempLanguages.length > 0) {
          setCategory(0);
        }
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#242A38" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // 👇 filter based on category
  const filteredTopics =
    category >= 0 && languagesAndFrameWorks[category]
      ? topicsList.filter(
          (item) =>
            item.language === languagesAndFrameWorks[category] ||
            item.framework === languagesAndFrameWorks[category]
        )
      : topicsList;

  // 👇 convert saved topics to ids for quick lookup
  const savedIds = savedTopics.map((t) => t.topic_id);

  return (
    <View style={styles.root}>
      <FlatList
        data={filteredTopics}
        keyExtractor={(item) => item.topic_id.toString()}
        ListHeaderComponent={
          <Poster
            images={banners}
            onCategorySelect={setCategory}
            onPosterPress={(index) => navigation.navigate("CatgegoryDetail",index )}
            categories={languagesAndFrameWorks}
          />
        }
        renderItem={({ item }) => (
          <TopicItem
            item={item}
            onPress={(topic) => navigation.navigate("CatgegoryDetail", item)}
            isSaved={savedIds.includes(item.topic_id)}
            onToggleSave={handleToggleSave} // 👈 reloads after toggle
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 50,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#242A38",
    fontFamily: "Montserrat-Medium",
  },
});
