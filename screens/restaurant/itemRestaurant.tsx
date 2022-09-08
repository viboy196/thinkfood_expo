import { View, Text, ImageBackground, ImageSourcePropType } from "react-native";
import React from "react";
import Layout from "../../constants/Layout";

export default function itemRestaurant({
  imageSource,
  title,
}: {
  imageSource?: ImageSourcePropType;
  title?: string;
}) {
  return (
    <View style={{ flex: 1, margin: 5 }}>
      <ImageBackground
        source={
          imageSource
            ? imageSource
            : require("../../assets/images/thinkfood/restaurant/1.jpg")
        }
        resizeMode="cover"
        style={{
          width: Layout.window.width / 2 - 10,
          height: (Layout.window.width * 3) / 8 - 10,
          justifyContent: "flex-end",
          borderRadius: 8,
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: 10,
            borderRadius: 8,
            width: 100,
            margin: 5,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {title ? title : "nhà hàng 1"}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}
