import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

import Ionicons from "@expo/vector-icons/build/Ionicons";

import { ProgressBar } from "react-native-paper";
import Layout from "../../constants/Layout";

export default function ItemFood({
  item,
  onPress,
}: {
  item: {
    id: string;
    name: string;
    price: number;
    priceFace: number;
    imageUrl: string;
    soldNum: number;
    soldSum: number;
  };
  onPress: () => void;
}) {
  // const item = {
  //   id: "1ec6a6d1-4a55-44cb-a5fb-40c586eff931",
  //   name: "Cyrtandra heinrichii H. St. John",
  //   price: 512000,
  //   priceFace: 638000,
  //   imageUrl: "http://dummyimage.com/68x51.png/5fa2dd/ffffff",
  //   soldNum: 274,
  //   soldSum: 613,
  // };
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
        source={{ uri: item.imageUrl }}
        resizeMode="cover"
        style={{
          width: 100,
          height: 100,
        }}
      />
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ color: "#575757", fontSize: 16 }}>{item.name}</Text>
        <Text style={{ textDecorationLine: "line-through", color: "#cfcfcf" }}>
          đ {item.priceFace}
        </Text>

        <Text style={{ color: "#f52132", fontSize: 20, fontWeight: "bold" }}>
          đ {item.price}
        </Text>
        <View style={{ paddingHorizontal: 5, width: 140, marginTop: 10 }}>
          <ProgressBar
            progress={item.soldNum / item.soldSum}
            color={"#f41f2f"}
            style={{ height: 15, borderRadius: 10, position: "absolute" }}
          />
          <Text
            style={{
              fontSize: 10,
              textAlign: "center",
              color: "#fff",
              fontWeight: "500",
            }}
          >
            {" "}
            {item.soldNum}/{item.soldSum} sản phẩm đã bán
          </Text>
        </View>
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
      >
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: "#00b454",
              padding: 4,
              marginTop: 5,
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <View>
              <Ionicons name="call" color={"#fff"} size={12} />
            </View>
            <Text style={{ fontSize: 10, padding: 4, color: "#fff" }}>
              Mua Ngay
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: "#00b454",
              padding: 4,
              marginTop: 5,
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <View>
              <Ionicons name="add-circle" color={"#fff"} size={12} />
            </View>
            <Text style={{ fontSize: 10, padding: 4, color: "#fff" }}>
              Thêm giỏ hàng
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
