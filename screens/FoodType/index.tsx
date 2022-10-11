import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";

import SearchCompenents from "../../components/SearchCompenents";
import ItemLoaiMonAn from "./ItemLoaiMonAn";
import { RootStackScreenProps } from "../../navigation/types";
import { goBackNav } from "../../utils/helper/navigationHelper";
import NhomSanPhamCrud from "../../utils/api/NhomSanPhamCrud";
import {
  ItemDonGiaLive,
  TypeNhomSanPham,
} from "../../utils/helper/NhomSanPhamHelper";
import { ResultStatusCode } from "../../utils/api/apiTypes";
import { genListIdDonGia } from "../../utils/helper/HelperFunc";

export default function FoodType({
  navigation,
  route,
}: RootStackScreenProps<"LoaiGiaoDich">) {
  const [listNhomSanPham, setlistNhomSanPham] = useState<TypeNhomSanPham[]>();
  useEffect(() => {
    if (route.params.data.id) {
      NhomSanPhamCrud.getAllPublishByIdLoaiGiaoDich(route.params.data.id).then(
        (res) => {
          if (res.code === ResultStatusCode.success) {
            setlistNhomSanPham(res.result);
          }
        }
      );
    }
  }, [route.params.data.id]);
  return (
    <View style={{ flex: 1 }}>
      <SearchCompenents
        onGoBack={() => {
          goBackNav(navigation);
        }}
      />
      <FlatList
        data={listNhomSanPham}
        renderItem={({ item }) => (
          <ItemLoaiMonAn
            item={item}
            onPress={() => {
              navigation.navigate("ListDonGia", {
                listIdDonGia: item.listItemDonGia
                  ? genListIdDonGia(item.listItemDonGia)
                  : [],
              });
            }}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
