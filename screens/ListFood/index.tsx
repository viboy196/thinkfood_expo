import { View, Text, FlatList } from "react-native";
import React from "react";
import ItemFood from "./ItemFood";
import TitleCompenents from "../../components/TitleCompenents";
import { DanhSachSanPham } from "../../dataMockaroo/DanhSachLoaiThucPham";
import { RootStackScreenProps } from "../../navigation/types";
import Layout from "../../constants/Layout";
import { goBackNav } from "../../utils/Helper/navigationHelper";
export default function ListFood({
  navigation,
}: RootStackScreenProps<"ListFood">) {
  return (
    <View>
      <TitleCompenents
        onGoBack={() => {
          goBackNav(navigation);
        }}
      />
      <View
        style={{
          width: Layout.window.width,
          height: Layout.window.height - 100,
        }}
      >
        <FlatList
          data={DanhSachSanPham}
          renderItem={({ item }) => (
            <ItemFood
              item={item}
              onPress={() => {
                navigation.navigate("FoodDeTail");
              }}
            />
          )}
        />
      </View>
    </View>
  );
}
