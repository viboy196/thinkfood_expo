import { View, Text, TextInput, Button } from "react-native";
import React from "react";
import { TypeAccount } from "../../../utils/helper/AccountHelper";

export default function PersoInfoItem({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText?: (text: string) => void;
  title: string;
}) {
  return (
    <View style={{ flexDirection: "row", marginVertical: 10 }}>
      <View style={{ flex: 8 }}>
        <Text>Số điện thoại</Text>
        <TextInput value={value} onChangeText={onChangeText} editable={false} />
      </View>
      <View style={{ flex: 2 }}>
        <Button title="Sửa" />
      </View>
    </View>
  );
}
