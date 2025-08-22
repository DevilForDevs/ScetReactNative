import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../MainApp/MainApp";
import { Topic } from "../../../utils/apis";

const image = require("../../../assets/images/Bitmap.png");

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
  onPress?: () => void;
  topic:Topic
};

export default function TopPart({onPress,topic}:Props) {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.body}>
      {/* Image background container */}
      <View>
        <Image source={{ uri: topic.thumbnail }} style={styles.image} />

        {/* Back Button overlay */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.t1}>{topic.title}</Text>
        <Ionicons name="bookmark" size={20} />
      </View>

      {/* Session Count */}
      <View style={styles.sessionCount}>
        <Text style={styles.t2}>Total Sessions</Text>
        <Text style={styles.t2}>{topic.number_of_subtopics}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: "100%",
   
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  t1: {
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
  },
  t2: {
    fontSize: 14,
    fontFamily: "Montserrat-Bold",
    color: "#7C7F88",
  },
  sessionCount: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  body: {
    backgroundColor: "white",
  },
});
