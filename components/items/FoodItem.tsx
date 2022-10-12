import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { TypeMonAn } from "../../utils/helper/MonAnHelper";
import { UrlHelper } from "../../utils/helper/UrlHelper";
import { RootTabScreenProps } from "../../navigation/types";

export default function FoodItem({
  sizeText,
  width,
  height,
  colorText,
  item,
  nav,
}: {
  nav: RootTabScreenProps<"TabHome">;
  color?: string;
  item: TypeMonAn;
  colorText?: string;
  size?: string | number;
  sizeText?: number;
  width?: string | number | undefined;
  height?: string | number | undefined;
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        nav.navigation.navigate("FoodView", item);
      }}
      style={{ flex: 1, marginVertical: 5 }}
    >
      <View
        style={{
          width: width ? width : 100,
          height: height ? height : 75,
          alignItems: "center",
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Image
            source={
              item.avartarUri
                ? { uri: UrlHelper.urlFile + item.avartarUri }
                : require("../../assets/images/thinkfood/item/it1.png")
            }
            resizeMode="cover"
            style={{
              width: width ? width : 100,
              // @ts-ignore
              height: width ? width * 0.75 : 75,
            }}
          />
        </View>
        <View style={{ paddingTop: 10 }}>
          <Text
            style={{
              textAlign: "center",
              color: colorText ? colorText : "#3a3d40",
              fontSize: sizeText ? sizeText : undefined,
            }}
          >
            {item.name ? item.name : "Chưa nhập"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
