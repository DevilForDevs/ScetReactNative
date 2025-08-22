import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import Orientation from "react-native-orientation-locker";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Video, { OnLoadData, OnProgressData } from "react-native-video";

import { RootStackParamList } from "../MainApp/MainApp";
import VideoPlayer from "./widgets/VideoPlayer";
import SessionList from "./widgets/SessionList";
import Controls from "./widgets/Controls";
import LandscapeControls from "./widgets/LandscapeControls";
import AdsManager from "../../utils/AdsManager";

type PlayerRouteProps = RouteProp<RootStackParamList, "PlayerScreen">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function PlayerScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [isLandscape, setIsLandscape] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [duration, setDuration] = useState(0);

  const route = useRoute<PlayerRouteProps>();
  const { items, selectedIndex } = route.params;
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);

  const currentItem = items[currentIndex];

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };


  const onLoad = (data: OnLoadData) => setDuration(data.duration);

  const togglePlayPause = () => setPaused((prev) => !prev);

  const toggleLandscape = () => {
    if (isLandscape) {
      Orientation.lockToPortrait();
      setIsLandscape(false);
    } else {
      Orientation.lockToLandscapeLeft();
      setIsLandscape(true);
    }
  };

  const handleBack = () => {
    if (isLandscape) {
      Orientation.lockToPortrait();
      setIsLandscape(false);
      return true; // 🔑 prevent default back action
    } else {
      setPaused(true)
      navigation.goBack();
      return true;
    }
  };

  // 🔑 Capture Android hardware back press
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBack
    );

    return () => backHandler.remove();
  }, [isLandscape]);



  const playVideo = (index: number) => {
    setPaused(true);
    const shown = AdsManager.showAd(() => {
      console.log("Ad closed ✅");
      setCurrentIndex(index);
      setCurrentTime(0);
      setPaused(false);
    });

  };

  return (
    <View style={styles.body}>
      <VideoPlayer
        uri={`https://yourdomains/ScetFiles/${currentItem.video_url}`}
        isLandscape={isLandscape}
        paused={paused}
        onLoad={onLoad}
        backPress={handleBack}
      />

      {!isLandscape && (
        <>
          <SessionList
            items={items}
            currentIndex={currentIndex}
            onSelect={playVideo}
          />
          <Controls
            isLandscape={isLandscape}
            paused={paused}
            togglePlayPause={togglePlayPause}
            toggleLandscape={toggleLandscape}
          />
        </>
      )}

      {isLandscape && (
        <LandscapeControls
          currentTime={formatTime(currentTime)}
          duration={formatTime(duration)}
          paused={paused}
          isLandscape={isLandscape}
          togglePlayPause={togglePlayPause}
          toggleLandscape={toggleLandscape}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1 },
  timeText: { color: "grey", fontSize: 14 },
  durationInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10
  }
});
