import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Topic } from "../../../utils/apis";

const { width } = Dimensions.get("window");
const domain = "https://kingamit.com";

type TopicItemProps = {
  item: Topic;
  onPress?: (item: Topic) => void;
  isSaved: boolean;
  onToggleSave?: (id: number) => void; // notify parent
};

export default function TopicItem({
  item,
  onPress,
  isSaved,
  onToggleSave,
}: TopicItemProps) {
  const toggleBookmark = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem("savedTopics");
      let saved: Topic[] = stored ? JSON.parse(stored) : [];

      if (isSaved) {
        // remove
        saved = saved.filter((t) => t.topic_id !== item.topic_id);
      } else {
        // add
        saved.push(item);
      }

      await AsyncStorage.setItem("savedTopics", JSON.stringify(saved));
      onToggleSave?.(item.topic_id);
    } catch (err) {
      console.error("Error saving topic", err);
    }
  }, [isSaved, item]);

  // ✅ ensure correct thumbnail URL
  const imageUri = item.thumbnail.startsWith("http")
    ? item.thumbnail
    : `${domain}/thumbnails/${item.thumbnail}`;

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onPress?.(item)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: imageUri }}
        style={styles.itemImage}
        resizeMode="contain"
      />

      <View style={styles.info}>
        <View style={styles.topPart}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>

          <TouchableOpacity onPress={toggleBookmark}>
            <Ionicons
              name={isSaved ? "bookmark" : "bookmark-outline"}
              size={20}
              color={"#242A38"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.subInfo}>
          <Text style={styles.nov}>No of videos</Text>
          <Text style={styles.nov}>{item.number_of_subtopics ?? 0}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    height: 80,
    width: width - 16,
    paddingHorizontal: 10,
    marginTop: 10,
    flexDirection: "row",
  },
  itemImage: {
    height: 80,
    width: 130,
  },
  info: {
    marginRight: 10,
    marginLeft: 5,
  },
  topPart: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "space-between",
    width: width - 150,
  },
  title: {
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
    flex: 1,
  },
  subInfo: {
    flexDirection: "row",
    gap: 10,
  },
  nov: {
    color: "#505560",
    fontFamily: "Montserrat-Light",
  },
});
