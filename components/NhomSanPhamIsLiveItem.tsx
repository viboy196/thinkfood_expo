import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { TypeNhomSanPham } from "../utils/helper/NhomSanPhamHelper";
import Layout from "../constants/Layout";
import { tintColorLight } from "../constants/Colors";
import { genListIdDonGia } from "../utils/helper/HelperFunc";
import { TypeDonGia } from "../utils/helper/DonGiaHelper";
import DonGiaCrud from "../utils/api/DonGiaCrud";
import { ResultStatusCode } from "../utils/api/apiTypes";
import ButtonImageShow from "./items/ButtonImageShow";
import DonGiaItem from "./items/DonGiaItem";
import { RootTabScreenProps } from "../navigation/types";
import { TypeDonGiaView } from "../redux/features/SanPhamViewSlices";
import { useAppSelector } from "../redux/store/hooks";
import Textblink from "./Textblink";
import { color1, color2 } from "../utils/helper/Color";
import GirlViewItem from "./items/GirlViewItem";

export default function NhomSanPhamIsLiveItem({
  item,
  nav,
}: {
  item: TypeNhomSanPham;
  nav: RootTabScreenProps<"TabHome">;
}) {
  const _listIdDonGia = item.listItemDonGia
    ? genListIdDonGia(item.listItemDonGia)
    : undefined;

  const [listDonGia, setListDonGia] = useState<Array<TypeDonGiaView>>();

  const { listSanPhamView } = useAppSelector((s) => s.sanPhamView);

  const [listDonGiaHz, setListDonGiaHz] = useState<TypeDonGiaView[][]>();
  useEffect(() => {
    if (_listIdDonGia && listSanPhamView) {
      let _listDonGia: TypeDonGiaView[] = [];
      _listIdDonGia.forEach((idDOnGia) => {
        const item = listSanPhamView.find((x) => x.id === idDOnGia);
        if (item) {
          _listDonGia.push(item);
        }
      });
      setListDonGia(_listDonGia);
    }
  }, [item.listItemDonGia, listSanPhamView]);
  useEffect(() => {
    if (listDonGia) {
      let listItem: TypeDonGiaView[][] = [];
      let itemArr: TypeDonGiaView[] = [];
      listDonGia.forEach((x) => {
        itemArr.push(x);
        if (itemArr.length == 3) {
          listItem.push(itemArr);
          itemArr = [];
        }
      });
      listItem.push(itemArr);
      setListDonGiaHz(listItem);
    }
  }, [listDonGia]);

  return (
    <View
      style={{
        width: Layout.window.width - 20,
        marginBottom: 10,
        backgroundColor: "#fff",
        marginVertical: 5,
      }}
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text
          style={{
            color: tintColorLight,
            fontSize: 18,
            fontWeight: "bold",
            paddingBottom: 5,
          }}
        >
          {item.name}
        </Text>
        <View style={{ flex: 1 }} />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Textblink
            style={{
              color: color2,
              fontWeight: "700",
              fontSize: 14,
              left: -40,
            }}
            text="• Đang bán"
          />

          {/* <Text style={{ color: "tomato", fontWeight: "700" }}> Đang bán</Text> */}
        </View>
      </View>
      {listDonGiaHz &&
        listDonGiaHz.map((item, index) => (
          <GirlViewItem
            data={item}
            renderItem={(_item) => (
              <DonGiaItem
                nav={nav}
                item={_item}
                colorText={"#424141"}
                sizeText={14}
                size={80}
                width={100}
                key={"DonGiaItem" + _item.id}
              />
            )}
            key={"GirlViewItem" + index}
          />
        ))}
      {/* <FlatList
        data={listDonGia}
        renderItem={({ item, index }) => (
          <DonGiaItem
            nav={nav}
            item={item}
            colorText={"#424141"}
            sizeText={14}
            size={80}
            width={100}
          />
        )}
        keyExtractor={(item, index) => `${item.id}${index}`}
      /> */}
    </View>
  );
}
