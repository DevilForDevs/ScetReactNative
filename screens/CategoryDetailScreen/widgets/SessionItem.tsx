// SessionItem.tsx
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";


type Props = {
  title: string;
  duration: string;
  onPress?: () => void;
  isPlaying: boolean;
};

export default function SessionItem({ title, duration, onPress,isPlaying }: Props) {
  return (
    <View style={styles.item}>
      <View style={styles.textBlock}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.duration}>{duration}</Text>
      </View>
      <TouchableOpacity style={styles.playButton} onPress={onPress}>
        <Ionicons
          name={isPlaying ? "pause-circle" : "play-circle"} // 👈 toggle here
          size={28}
          color={"#242A38"} // 👈 optional: green when playing
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#0000001A",
  },
  textBlock: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  duration: {
    fontSize: 13,
    color: "#7C7F88",
  },
  playButton: {
    marginLeft: 10,
  },
});
