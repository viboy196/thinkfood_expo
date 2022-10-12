import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Layout from "../../constants/Layout";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { tintColorLight } from "../../constants/Colors";
import { RootStackScreenProps } from "../../navigation/types";
import DoAnCrud from "../../utils/api/DoAnCrud";
import { ResultStatusCode } from "../../utils/api/apiTypes";
import { UrlHelper } from "../../utils/helper/UrlHelper";
import { TypeDoAn } from "../../utils/helper/DoAnHelper";

export default function FoodDetail({
  navigation,
  route,
}: RootStackScreenProps<"FoodView">) {
  const item = route.params;
  const [numCount, setNumCount] = useState<number>(1);

  const [listDoAn, setListDoAn] = useState<TypeDoAn[]>();
  useEffect(() => {
    if (item.id) {
      DoAnCrud.getListPublishDoAnByIdMonAn(item.id).then((res) => {
        if (res.code === ResultStatusCode.success) {
          // @ts-ignore
          setListDoAn(res.result);
        }
      });
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={
          item?.avartarUri
            ? {
                uri: UrlHelper.urlFile + item?.avartarUri,
              }
            : require("../../assets/images/logo/thinkfoodbg.png")
        }
        resizeMode="cover"
        style={{
          width: Layout.window.width,
          height: 180,
        }}
      />
      <TouchableOpacity
        style={{
          width: 64,
          height: 64,
          position: "absolute",
          top: 10,
          left: 5,
        }}
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        }}
      >
        <Ionicons name="arrow-back" size={32} color={tintColorLight} />
      </TouchableOpacity>
      {/* thông tin tên giá , giá khuyến mãi */}
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        <View style={{ flex: 1, paddingRight: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {item?.name ? item?.name : ""}
          </Text>
        </View>
        <View style={{ marginRight: 10 }}></View>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Giới thiệu</Text>
        <Text>{item?.info}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></View>
    </View>
  );
}
