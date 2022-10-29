import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { RootStackScreenProps } from "../../navigation/types";
import { UrlHelper } from "../../utils/helper/UrlHelper";
import Layout from "../../constants/Layout";
import { color1, color2 } from "../../utils/helper/Color";
import { Ionicons } from "@expo/vector-icons";
import { TypeDoAn } from "../../utils/helper/DoAnHelper";
import { useAppSelector } from "../../redux/store/hooks";
import DoAnCrud from "../../utils/api/DoAnCrud";
import { ResultStatusCode } from "../../utils/api/apiTypes";
import ItemDoAn from "./ItemDoAn";
import { TypeDonGiaView } from "../../redux/features/SanPhamViewSlices";
import ItemFood from "../ListFood/ItemFood";

export default function Cheft({
  navigation,
  route,
}: RootStackScreenProps<"cheft">) {
  const [select, setSelect] = useState<number>(1);
  const listButton = [
    { value: 1, title: "Món Ăn" },
    { value: 2, title: "Thông tin" },
    { value: 3, title: "Câu chuyện" },
  ];
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Image
          source={{ uri: UrlHelper.urlFile + route.params.data.avartarUri }}
          style={{
            width: Layout.window.width,
            height: (Layout.window.width * 3) / 3,
            resizeMode: "cover",
          }}
        />
        <View style={{ position: "absolute", bottom: 10, left: 10 }}>
          <Text
            style={{
              color: color1,
              fontSize: 24,
              fontWeight: "600",
            }}
          >
            {route.params.data.name}
          </Text>
          <Text style={{ marginVertical: 5, fontSize: 16, color: color1 }}>
            {route.params.data.info}
          </Text>
        </View>
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
          <Ionicons name="arrow-back" size={32} color={color1} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          {listButton.map((item) => (
            <TouchableOpacity
              style={{ flex: 1, padding: 2, height: 60 }}
              onPress={() => {
                setSelect(item.value);
              }}
            >
              <View
                style={{
                  backgroundColor: select === item.value ? color1 : "#fff",
                  flex: 1,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: color1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: select === item.value ? "#fff" : color1 }}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flex: 1 }}>
          {select === 1 && (
            <DoAnByIdDauBep
              idDauBep={route.params.data.id}
              navigation={navigation}
            />
          )}
        </View>
      </View>
    </View>
  );
}

function DoAnByIdDauBep(props: { idDauBep: string; navigation: any }) {
  const { listSanPhamView } = useAppSelector((s) => s.sanPhamView);
  return (
    <ScrollView style={{ flex: 1 }}>
      {listSanPhamView &&
        listSanPhamView
          .filter((x) => x.idDauBep === props.idDauBep)
          .map((item) => (
            <ItemFood
              item={item}
              onPress={() => {
                props.navigation.navigate("FoodDeTail", item);
              }}
              key={item.id}
            />
          ))}
    </ScrollView>
  );
}
