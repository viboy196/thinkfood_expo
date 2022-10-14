import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TypeDonGia } from "../../utils/helper/DonGiaHelper";
import DoAnCrud from "../../utils/api/DoAnCrud";
import { ResultStatusCode } from "../../utils/api/apiTypes";
import ThucPhamTieuChuanCrud from "../../utils/api/ThucPhamTieuChuanCrud";
import DonViDoCrud from "../../utils/api/DonViDoCrud";
import { UrlHelper } from "../../utils/helper/UrlHelper";
import Layout from "../../constants/Layout";
import { RootTabScreenProps } from "../../navigation/types";
import { TypeDonGiaView } from "../../redux/features/SanPhamViewSlices";

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
          <Image
            source={{ uri: UrlHelper.urlFile + item.avartarUri }}
            resizeMode="cover"
            style={{
              width: width ? width : 100,
              height: width ? width * 0.75 : 75,
              tintColor: color ? color : undefined,
            }}
          />
        </View>
        <View style={{ height: "40%" }}>
          <Text
            style={{
              textAlign: "center",
              color: colorText ? colorText : undefined,
              fontSize: sizeText ? sizeText : undefined,
            }}
          >
            {item?.name ? item.name : "Chưa nhập"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
