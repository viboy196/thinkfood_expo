import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";

import Ionicons from "@expo/vector-icons/build/Ionicons";
import { tintColorLight } from "../constants/Colors";
export default function TitleCompenents({
  onGoBack,
}: {
  onGoBack: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 70,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
      }}
    >
      <TouchableOpacity onPress={onGoBack}>
        <Ionicons name="arrow-back" size={32} color={tintColorLight} />
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          margin: 10,
        }}
      >
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 18 }}>Thực phẩm nổi bật</Text>

          <Text>5 Sản phẩm</Text>
        </View>
      </View>
    </View>
  );
}
