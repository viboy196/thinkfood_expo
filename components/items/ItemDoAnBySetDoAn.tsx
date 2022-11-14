import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import Layout from "../../constants/Layout";
import { UrlHelper } from "../../utils/helper/UrlHelper";
import { TypeDoAn } from "../../utils/helper/DoAnHelper";
export default function ItemDoAnBySetDoAn({
  item,
  onPress,
}: {
  item: TypeDoAn;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: Layout.window.width,
        backgroundColor: "#fff",
        paddingVertical: 5,
        paddingHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
      }}
      onPress={onPress}
    >
      <Image
        source={{ uri: UrlHelper.urlFile + item?.avartarUri }}
        resizeMode="cover"
        style={{
          width: 100,
          height: 100,
        }}
      />
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ color: "#575757", fontSize: 16 }}>{item?.name}</Text>
      </View>
      <View
        style={{
          width: 100,
          height: 60,
          position: "absolute",
          right: 0,
          bottom: 0,
          justifyContent: "flex-end",
          marginRight: 5,
          marginBottom: 5,
        }}
      ></View>
    </TouchableOpacity>
  );
}
