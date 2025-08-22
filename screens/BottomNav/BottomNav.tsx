import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../HomeScreen/HomeScreen";
import SavedScreen from "../SavedScreen/SavedScreen";
import SearchScreen from "../SearchScreen/SearchScreen";
import CategoriesScreen from "../CategoriesScreen/CategoriesScreen";

// Tab param list
export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Saved: undefined;
  Categories: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "home-outline";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Saved") {
            iconName = focused ? "bookmark" : "bookmark-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Categories") {
            iconName = focused ? "grid" : "grid-outline";
          }

          if (focused) {
            return (
              <View
                style={
                  route.name === "Home"
                    ? styles.pileContainer1st
                    : styles.pileContainer
                }
              >
                <Ionicons name={iconName} size={size} color={color} />
                <Text style={[styles.label, { color }]}>{route.name}</Text>
              </View>
            );
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#242A38",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  pileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#D3D4D7",
    borderRadius: 18,
    width: 103,
    height: 37,
    marginTop: 10,
    paddingHorizontal: 7,
    paddingVertical: 7,
    marginRight: 15,
  },
  label: {
    fontSize: 12,
  },
  pileContainer1st: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#D3D4D7",
    borderRadius: 18,
    width: 100,
    height: 37,
    marginTop: 10,
    paddingHorizontal: 7,
    paddingVertical: 7,
    marginLeft: 15,
  },
});
