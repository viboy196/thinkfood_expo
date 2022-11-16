import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { RootStackScreenProps } from "../../navigation/types";
import { UrlHelper } from "../../utils/helper/UrlHelper";
import Layout from "../../constants/Layout";
import { color1, color2 } from "../../utils/helper/Color";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "../../redux/store/hooks";
import ItemFood from "../ListFood/ItemFood";

export default function Cheft({
  navigation,
  route,
}: RootStackScreenProps<"cheft">) {
  const [select, setSelect] = useState<number>(1);
  const listButton = [{ value: 1, title: "Món Ăn" }];
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
        <View style={{ flexDirection: "row", marginTop: 5 }}></View>
        <View style={{ flex: 1 }}>
          <DoAnByIdDauBep
            idDauBep={route.params.data.id}
            navigation={navigation}
          />
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
              key={"ItemFoodChef" + item.id}
            />
          ))}
    </ScrollView>
  );
}
