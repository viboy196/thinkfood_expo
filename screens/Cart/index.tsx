import { View, Text } from "react-native";
import React from "react";
import { useAppSelector } from "../../redux/store/hooks";

export default function Cart() {
  const { listCartOder } = useAppSelector((s) => s.cart);

  return (
    <View>
      {listCartOder &&
        listCartOder.map((item, index) => <Text>{index + 1}</Text>)}
    </View>
  );
}
