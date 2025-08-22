// App.tsx
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import BottomNav from '../BottomNav/BottomNav';
import CategoryDetailScreen from '../CategoryDetailScreen/CategoryDetailScreen';
import PlayerScreen from '../PlayerScreen/PlayerScreen';
import { Subtopic, Topic } from '../../utils/apis';

export type RootStackParamList = {
  BottomNav: undefined;
  CatgegoryDetail: Topic;
  PlayerScreen: { items: Subtopic[]; selectedIndex: number }
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainApp() {
  

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'BottomNav'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="BottomNav" component={BottomNav} />
        <Stack.Screen name="CatgegoryDetail" component={CategoryDetailScreen} />
        <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
