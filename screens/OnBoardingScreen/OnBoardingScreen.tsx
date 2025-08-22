import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function OnBoardingScreen() {
  console.log("onboarding screen")
  return (
    <SafeAreaView style={styles.container}>
      <View>
          <Text>OnBoardingScreen</Text>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }

})