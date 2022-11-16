import { View, Text } from "react-native";
import React from "react";

export default function GirlViewItem(props: {
  renderItem: (item: any) => JSX.Element;
  data?: any[];
}) {
  return (
    <View style={{ flexDirection: "row" }}>
      {props.data && props.data.map((item) => props.renderItem(item))}
    </View>
  );
}
