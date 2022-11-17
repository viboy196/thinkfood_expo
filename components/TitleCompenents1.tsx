import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";

import Ionicons from "@expo/vector-icons/build/Ionicons";
import { tintColorLight } from "../constants/Colors";
import { getMaginTopByDevice } from "../utils/helper/HelperFunc";
export default function TitleCompenents1({
  onGoBack,
  title,
}: {
  onGoBack: () => void;
  title: string;
}) {
  return (
    <View
      style={{
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
          <Text style={{ fontSize: 18 }}>{title}</Text>
        </View>
      </View>
    </View>
  );
}
