import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './screens/SplashScreen/SplashScreen';
import { StyleSheet } from 'react-native';
import MainApp from './screens/MainApp/MainApp';
import mobileAds from 'react-native-google-mobile-ads';
function App() {
  const [isSplashHidden, setSplashHidden] = useState(false);
  mobileAds()
  .initialize()
  .then(adapterStatuses => {
    console.log("AdMob initialized");
  });

  const hideSplash = () => {
    setSplashHidden(true);
  };

  return (
    <SafeAreaProvider style={styles.container}>
      {!isSplashHidden
        ? <SplashScreen onFinish={() => setSplashHidden(true)} />
        : <MainApp />}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // ✅ ensures provider covers the full screen,
    backgroundColor:"white"
  },
});

export default App;

