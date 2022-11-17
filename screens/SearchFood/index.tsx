import { View, Text, FlatList, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import DonGiaCrud from "../../utils/api/DonGiaCrud";
import { ResultStatusCode } from "../../utils/api/apiTypes";
import { setDonGiaState } from "../../redux/features/DonGiaOderSlices";
import DoAnCrud from "../../utils/api/DoAnCrud";
import { setDoAnState } from "../../redux/features/DoAnSlices";
import ThucPhamTieuChuanCrud from "../../utils/api/ThucPhamTieuChuanCrud";
import { setThucPhamTieuChuanState } from "../../redux/features/ThucPhamTieuChuanSlices";
import DonViDoCrud from "../../utils/api/DonViDoCrud";
import { setDonViDoState } from "../../redux/features/DonViDoSlices";
import {
  setSanPhamViewState,
  TypeDonGiaView,
} from "../../redux/features/SanPhamViewSlices";
import { RootStackScreenProps } from "../../navigation/types";
import TitleCompenents1 from "../../components/TitleCompenents1";
import { goBackNav } from "../../utils/helper/navigationHelper";
import { Ionicons } from "@expo/vector-icons";
import { setStateTextSearch } from "../../redux/features/TextSearchSlides";
import Layout from "../../constants/Layout";
import ItemFood from "../ListFood/ItemFood";
import { getMaginTopByDevice } from "../../utils/helper/HelperFunc";

export default function SearchHome(nav: RootStackScreenProps<"SearchDonGia">) {
  const { navigation } = nav;
  const { searchHome } = useAppSelector((s) => s.textSearch);

  const { listSanPhamView } = useAppSelector((s) => s.sanPhamView);
  const dispatch = useAppDispatch();

  const [listSanPham, setListSamPham] = useState<TypeDonGiaView[]>();

  useEffect(() => {
    if (listSanPhamView) {
      if (searchHome) {
        const list = listSanPhamView.filter((x) =>
          x.name?.toLowerCase().includes(searchHome.toLowerCase())
        );
        setListSamPham(list);
      } else {
        setListSamPham(listSanPhamView);
      }
    }
  }, [listSanPhamView, searchHome]);

  return (
    <View style={{ backgroundColor: "transparent" ,}}>
      {/* <TitleCompenents1
        onGoBack={() => {
          goBackNav(navigation);
        }}
        title={"Tìm Kiếm Món ăn"}
      /> */}
      {/* Search MonAn */}
      <View
        style={{
          width: Layout.window.width - 10,
          height: 60,
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: 60,
            backgroundColor: "#fff",
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
          }}
        >
          <Ionicons name="search" size={32} color={"#707070"} />
        </View>
        <TextInput
          placeholder={"Bạn muốn ăn gì ?"}
          value={searchHome}
          onChangeText={(text) => {
            dispatch(setStateTextSearch({ search: { searchHome: text } }));
          }}
          selectionColor={"#a6a5a5"}
          autoFocus={true}
          style={{
            paddingLeft: 10,
            width: "100%",
            height: "100%",
            backgroundColor: "#fff",
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}
        />
      </View>
      <FlatList
        data={listSanPham}
        renderItem={({ item, index }) => (
          <ItemFood
            onPress={() => {
              navigation.navigate("FoodDeTail", item);
            }}
            item={item}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
