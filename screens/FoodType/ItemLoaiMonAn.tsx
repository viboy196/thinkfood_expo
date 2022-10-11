import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Layout from "../../constants/Layout";

import Ionicons from "@expo/vector-icons/build/Ionicons";
import { TypeNhomSanPham } from "../../utils/helper/NhomSanPhamHelper";
import { UrlHelper } from "../../utils/helper/UrlHelper";
import { useAppDispatch } from "../../redux/store/hooks";
export default function ItemLoaiMonAn({
  item,
  onPress,
}: {
  item: TypeNhomSanPham;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: Layout.window.width,
          paddingHorizontal: 10,
          paddingVertical: 5,
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
        <Image
          source={{ uri: UrlHelper.urlFile + item.avartarUri }}
          resizeMode="cover"
          style={{
            width: 50,
            height: 50,
          }}
        />
        <View
          style={{
            flex: 1,
            padding: 10,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 18, color: "#2b2a2a" }}>{item.name}</Text>
          {/* <Text>Các Sản phẩm</Text> */}
        </View>
        <View
          style={{
            height: 60,
            width: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons
            name="chevron-forward-outline"
            size={32}
            color={"#2b2a2a"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
