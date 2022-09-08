import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import ItemRestaurant from "./itemRestaurant";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { tintColorLight } from "../../constants/Colors";
import { RootStackScreenProps } from "../../navigation/types";

export default function Restaurant() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            // navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={32} color={tintColorLight} />
        </TouchableOpacity>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Nhà Hàng</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList data={arr} renderItem={ItemRestaurant} numColumns={2} />
      </View>
    </View>
  );
}
