import { View, Text, Image } from "react-native";
import React from "react";
import { TypeAccount } from "../../../utils/helper/AccountHelper";
import { UrlHelper } from "../../../utils/helper/UrlHelper";

export default function ItemPerson(props: { item: TypeAccount }) {
  return (
    <View
      style={{ flexDirection: "row", padding: 10, backgroundColor: "#fff" }}
    >
      <View style={{ flex: 1 }}>
        <Image
          source={
            props.item.linkImageAvatar
              ? { uri: UrlHelper.urlFile + props.item.linkImageAvatar }
              : require("../../../assets/images/logo/thinkfoodlogo.png")
          }
          style={{ width: 60, height: 60, borderRadius: 60 }}
        />
      </View>
      <View style={{ flex: 3, justifyContent: "center" }}>
        <Text>{props.item.fullName}</Text>
      </View>
    </View>
  );
}
