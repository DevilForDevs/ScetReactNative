import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  query: string;
  setQuery: (text: string) => void;
};

export default function TopPart({ query, setQuery }: Props) {
  return (
    <View style={styles.body}>
      <View style={styles.bigIcon}>
        <Ionicons name="search" size={36} style={styles.bigicon} color="#242A38" />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Search here..."
        placeholderTextColor="#A7AAAF"
        value={query}
        onChangeText={setQuery}  // 🔑 updates query in parent
      />

      {/* ✅ Show only when query has text */}
      {query.trim().length > 0 && (
        <Text style={styles.pc}>Popular Projects</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    marginTop: 50,
    paddingHorizontal: 10,
  },
  bigIcon: {
    flexDirection: "row",
    justifyContent: "center",
  },
  bigicon: {
    borderRadius: 50,
    padding: 20,
    backgroundColor: "#F2F2F2",
  },
  input: {
    fontSize: 17,
    marginTop: 10,
    fontFamily: "Montserrat-Bold",
    borderBottomWidth: 2,
    borderBottomColor: "#F2F2F2",
  },
  pc: {
    marginTop: 10,
    color: "#242A38",
    fontFamily: "Montserrat-Medium",
    fontSize: 20,
    marginBottom: 10,
  },
});
