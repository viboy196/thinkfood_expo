import { View, Text } from "react-native";
import React from "react";
import ItemInfo from "./ItemInfo";
import { RootTabScreenProps } from "../../../navigation/types";

export default function TabInfo({ navigation }: RootTabScreenProps<"TabInfo">) {
  return (
    <View>
      <ItemInfo
        onPress={() => {
          navigation.navigate("PersoInfo");
        }}
        text={"Thông tin cá nhân"}
      />

      <ItemInfo
        onPress={() => {
          navigation.navigate("ServicePack");
        }}
        text={"Gói dịch vụ"}
      />

      <ItemInfo
        onPress={() => {
          navigation.navigate("PaymentHistory");
        }}
        text={"Lịch sử  đặt hàng"}
      />

      <ItemInfo
        onPress={() => {
          navigation.navigate("Address");
        }}
        text={"Địa chỉ đặt hàng"}
      />
    </View>
  );
}
