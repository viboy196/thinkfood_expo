import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";

import Ionicons from "@expo/vector-icons/build/Ionicons";
import { tintColorLight } from "../constants/Colors";
export default function SearchCompenents({ onGoBack }: { onGoBack: () => void }) {
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
          height: 40,
          flexDirection: "row",
          alignItems: "center",
          margin: 10,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: 60,
            backgroundColor: "#f5f5f5",
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
          }}
        >
          <Ionicons name="search" size={32} color={"#707070"} />
        </View>
        <TextInput
          placeholder={"bạn muốn mua thực phần gì ?"}
          selectionColor={"#a6a5a5"}
          style={{
            paddingLeft: 10,
            width: "100%",
            height: "100%",
            backgroundColor: "#f5f5f5",
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}
        />
      </View>
    </View>
  );
}
