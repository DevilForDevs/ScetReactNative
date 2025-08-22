import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props {
  isLandscape: boolean;
  paused: boolean;
  togglePlayPause: () => void;
  toggleLandscape: () => void;
}

export default function Controls({ isLandscape,toggleLandscape }: Props) {
  return (
    <View style={styles.bottomInfo}>
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
  bottomInfo: {
    position: "absolute",
    top: 230,
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 25,
    justifyContent: "space-between",
  },
  infoGroup: { flexDirection: "row", alignItems: "center", gap: 20 },
  bottomBtn: { backgroundColor: "white", padding: 5, borderRadius: 20 },
});
