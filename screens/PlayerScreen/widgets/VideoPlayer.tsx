import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Video from "react-native-video";

interface Props {
  uri: string;
  isLandscape: boolean;
  backPress: () => void;
}


export default function VideoPlayer({ uri, isLandscape,backPress}: Props) {

  return (
    <>
      <Video
        source={{ uri }}
        style={isLandscape ? styles.landscapeVideo : styles.portraitVideo}
        resizeMode="cover"
        controls

      />
      <TouchableOpacity style={styles.backButton} onPress={backPress}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  portraitVideo: { height: 220, marginHorizontal: 20, marginTop: 50 },
  landscapeVideo: { flex: 1, backgroundColor: "black" },
  backButton: {
    backgroundColor: "white",
    borderRadius: 20,
    height: 30,
    width: 30,
    position: "absolute",
    top: 55,
    left: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
