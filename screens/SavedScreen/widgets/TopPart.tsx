import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TopPart() {
  return (
    <View style={styles.body}>

      <View style={styles.bigIcon}>
        <Ionicons name="bookmark" size={36} style={styles.bigicon} color="#242A38" />
      </View>
      <Text style={styles.pc}>Saved Courses</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    marginTop: 100,
  },
  bigIcon: {
    flexDirection: "row",
    justifyContent: "center",
  },
  bigicon: {
    borderRadius: 50,
    padding: 20,
    backgroundColor: "#F2F2F2"

  },
  pc:{
    marginTop:40,
    color:"#242A38",
    fontFamily: "Montserrat-Bold",
    fontSize:20,
    marginBottom:10,
    paddingHorizontal:10
  }

})