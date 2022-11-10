import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { UrlHelper } from "../../utils/helper/UrlHelper";
import Layout from "../../constants/Layout";
import { RootTabScreenProps } from "../../navigation/types";
import { TypeDonGiaView } from "../../redux/features/SanPhamViewSlices";
import { currencyFormat } from "../../utils/helper/HelperFunc";

export default function DonGiaItem({
  item,
  color,
  size,
  sizeText,
  width,
  height,
  colorText,
  nav,
}: {
  item: TypeDonGiaView;
  color?: string;
  nav: RootTabScreenProps<"TabHome">;

  colorText?: string;

  size?: string | number;
  sizeText?: number;
  width?: number;
  height?: string | number | undefined;
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        nav.navigation.navigate("FoodDeTail", item);
      }}
      style={{ width: (Layout.window.width - 20) / 3 }}
    >
      <View
        style={{
          width: width ? width : 75,
          height: height ? height : 100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            height: "60%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View>
            <Image
              source={{ uri: UrlHelper.urlFile + item.avartarUri }}
              resizeMode="cover"
              style={{
                width: width ? width : 100,
                height: width ? width * 0.75 : 75,
                tintColor: color ? color : undefined,
                borderRadius: 8,
              }}
            />
            <View
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                backgroundColor: "#fff",
                borderRadius: 8,
                padding: 4,
              }}
            >
              <Text
                style={{
                  color: "red",
                  fontSize: 8,
                }}
              >
                {item.isBook === true && item.timeBook
                  ? `Đặt trước ${item.timeBook}`
                  : "có sẵn"}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ height: "40%" }}>
          <Text style={{ fontSize: 10, color: "tomato", textAlign: "center" }}>
            {item.unitPrice ? currencyFormat(item.unitPrice) : ""}
            {" vnđ/"}
            {item?.nameDonViDo}
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: colorText ? colorText : undefined,
              fontSize: sizeText ? sizeText : 12,
            }}
          >
            {item?.name ? item.name : "Chưa nhập"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
