import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Layout from "../../constants/Layout";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { tintColorLight } from "../../constants/Colors";
import { RootStackScreenProps } from "../../navigation/types";

export default function FoodDetail({
  navigation,
}: RootStackScreenProps<"FoodDeTail">) {
  const data = {
    id: "91731086-6f02-438d-83ef-20cc2513a5c5",
    name: "Cyathea cooperi (Hook. ex F. Muell.) Domin",
    price: 16,
    priceFace: 24,
    imageUrl: "http://dummyimage.com/53x77.png/dddddd/000000",
    discount: 20,
    soldNum: 296,
    soldSum: 858,
    info: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
  };
  const [numCount, setNumCount] = useState<number>(1);
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: data.imageUrl }}
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
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{data.name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="pricetag" size={12} color={tintColorLight} />
            <Text style={{ paddingLeft: 5 }}>Giảm {data.discount}%</Text>
          </View>
        </View>
        <View style={{ marginRight: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            đ {data.soldNum}
          </Text>
          <Text
            style={{
              textDecorationLine: "line-through",
              color: "#bebebe",
              textAlign: "center",
            }}
          >
            đ {data.soldSum}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Giới thiệu</Text>
        <Text>{data.info}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            borderWidth: 2,
            borderColor: "#bebebe",
            padding: 10,
            borderRadius: 100,
            margin: 10,
          }}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              if (numCount > 1) setNumCount((old) => old - 1);
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 28, fontWeight: "bold" }}
            >
              -
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text
              style={{ textAlign: "center", fontSize: 28, fontWeight: "bold" }}
            >
              {numCount}
            </Text>
          </View>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              setNumCount((old) => old + 1);
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 28, fontWeight: "bold" }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            height: 110,
            justifyContent: "flex-end",
            marginRight: 5,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "#00b454",
                padding: 10,
                marginTop: 5,
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 5,
                height: 50,
              }}
            >
              <View>
                <Ionicons name="call" color={"#fff"} size={24} />
              </View>
              <Text
                style={{
                  padding: 4,
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                Mua Ngay
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "#00b454",
                padding: 10,
                marginTop: 5,
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 5,
                height: 50,
              }}
            >
              <View>
                <Ionicons name="add-circle" color={"#fff"} size={24} />
              </View>
              <Text
                style={{
                  padding: 4,
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                Thêm giỏ hàng
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
