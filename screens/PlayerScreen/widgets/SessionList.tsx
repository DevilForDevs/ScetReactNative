import React from "react";
import { FlatList } from "react-native";
import SessionItem from "../../CategoryDetailScreen/widgets/SessionItem";


interface Props {
  items: any[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export default function SessionList({ items, currentIndex, onSelect }: Props) {
  return (
    <FlatList
      data={items}
      renderItem={({ index, item }) => (
        <SessionItem
          isPlaying={index === currentIndex}
          title={item.title}
          duration={item.duration}
          onPress={() => onSelect(index)}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 24 }}
      showsVerticalScrollIndicator={false}
    />
  );
}
