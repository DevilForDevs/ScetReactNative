import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props {
  currentTime: string;
  duration: string;
  paused: boolean;
  isLandscape: boolean;
  togglePlayPause: () => void;
  toggleLandscape: () => void;
}

export default function LandscapeControls({
  isLandscape,
  toggleLandscape,
}: Props) {
  return (
    <View style={styles.bottomInfoLandscape}>
      
      <View style={styles.infoGroup}>
        
        <TouchableOpacity onPress={toggleLandscape} style={styles.bottomBtn}>
          <Ionicons
            name={isLandscape ? "contract" : "expand"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomInfoLandscape: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingLeft: 25,
    paddingRight: 100,
  },
  infoGroup: { flexDirection: "row", alignItems: "center", gap: 20 },
  bottomBtn: { backgroundColor: "white", padding: 5, borderRadius: 20 },
  timeText: { color: "grey", fontSize: 14 },
});
