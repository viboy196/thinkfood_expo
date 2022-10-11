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

export default function NhomSanPhamIsLiveItem({
  item,
}: {
  item: TypeNhomSanPham;
}) {
  const _listIdDonGia = item.listItemDonGia
    ? genListIdDonGia(item.listItemDonGia)
    : undefined;

  const [listDonGia, setListDonGia] = useState<Array<TypeDonGia>>();
  useEffect(() => {
    if (_listIdDonGia)
      DonGiaCrud.getListPublishByListId(_listIdDonGia).then((res) => {
        if (res.code === ResultStatusCode.success) {
          setListDonGia(res.result);
        }
      });
  }, []);

  return (
    <View
      style={{
        width: Layout.window.width - 20,
        marginHorizontal: 10,
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
            paddingBottom:5,
          }}
        >
          {item.name}
        </Text>
        <View style={{ flex: 1 }} />

        <Text style={{ color: "tomato", fontWeight: "700" }}> • Đang bán</Text>
      </View>

      <FlatList
        data={listDonGia}
        numColumns={3}
        renderItem={({ item }) => (
          <DonGiaItem
            item={item}
            colorText={"#424141"}
            sizeText={16}
            size={80}
            width={120}
            height={150}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
