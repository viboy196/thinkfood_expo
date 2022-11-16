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
import { currencyFormat, getStatusDoAn } from "../../utils/helper/HelperFunc";

export default function DonGiaItem({
  item,
  color,
  size,
  sizeText,
  width,
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
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
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
                backgroundColor: getStatusDoAn(item.status, item.activeTime)
                  .backgroundColor,
                borderRadius: 8,
                padding: 4,
              }}
            >
              <Text
                style={{
                  color: getStatusDoAn(item.status, item.activeTime).color,
                  fontSize: 8,
                }}
              >
                {item.isBook === true && item.timeBook
                  ? `Đặt trước ${item.timeBook}`
                  : getStatusDoAn(item.status, item.activeTime).text}
              </Text>
            </View>
          </View>
        </View>
        <View>
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
