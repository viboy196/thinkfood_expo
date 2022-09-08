import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Layout from "../../constants/Layout";

import Ionicons from "@expo/vector-icons/build/Ionicons";
export default function ItemLoaiMonAn({
  item,
  onPress,
}: {
  item: {
    id: string;
    name: string;
    numFood: number;
    imageUrl: string;
  };
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: Layout.window.width,
          paddingHorizontal: 10,
          paddingVertical: 5,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.4,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <Image
          source={{ uri: item.imageUrl }}
          resizeMode="cover"
          style={{
            width: 50,
            height: 50,
          }}
        />
        <View
          style={{
            flex: 1,
            padding: 10,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 18, color: "#2b2a2a" }}>{item.name}</Text>
          <Text>{item.numFood} Sản phẩm</Text>
        </View>
        <View
          style={{
            height: 60,
            width: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons
            name="chevron-forward-outline"
            size={32}
            color={"#2b2a2a"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
