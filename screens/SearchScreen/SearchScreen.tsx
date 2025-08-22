import { StyleSheet, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import TopPart from './widgets/TopPart';
import { searchTopics, Topic } from '../../utils/apis';
import TopicItem from '../HomeScreen/widgets/TopicItem';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../MainApp/MainApp";
import { useNavigation } from "@react-navigation/native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "BottomNav">;

const domain = "https://kingamit.com";

export default function SearchScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [topicsList, setTopicsList] = useState<Topic[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.trim().length > 0) {
      searchTopics(query).then((results) => {
        if (results.items) {
          // ✅ verify & fix thumbnails before storing
          const sanitized = results.items.map((t) => ({
            ...t,
            thumbnail: t.thumbnail?.startsWith("http")
              ? t.thumbnail
              : `${domain}/thumbnails/${t.thumbnail}`,
          }));

          setTopicsList(sanitized);
        } else {
          setTopicsList([]);
          console.warn(results.message);
        }
      });
    } else {
      setTopicsList([]); // clear when query empty
    }
  }, [query]);

  return (
    <View style={styles.body}>
      <FlatList
        data={topicsList}
        keyExtractor={(item) => item.topic_id.toString()}
        renderItem={({ item }) => (
          <TopicItem
            item={item}
            isSaved={false}
            onPress={() => navigation.navigate("CatgegoryDetail", item)}
          />
        )}
        ListHeaderComponent={<TopPart query={query} setQuery={setQuery} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 16,
  },
});
