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
import { TypeSetDoAn } from "../utils/helper/SetDoAnHelper";
import SetDoAnItem from "./items/SetDoAnItem";
import GirlViewItem from "./items/GirlViewItem";

export default function NhomSanPhamSetDoAnIsLiveItem({
  listIdSetDoAn,
  nav,
}: {
  listIdSetDoAn: string[];
  nav: RootTabScreenProps<"TabHome">;
}) {
  const [listIdSetDoAnHz, setListIdSetDoAnHz] = useState<string[][]>();

  useEffect(() => {
    if (listIdSetDoAn) {
      let listItem: string[][] = [];
      let itemArr: string[] = [];
      listIdSetDoAn.forEach((x) => {
        itemArr.push(x);
        if (itemArr.length == 3) {
          listItem.push(itemArr);
          itemArr = [];
        }
      });
      listItem.push(itemArr);
      setListIdSetDoAnHz(listItem);
    }
  }, [listIdSetDoAn]);

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
        <View style={{ flex: 1 }} />
      </View>

      {listIdSetDoAnHz &&
        listIdSetDoAnHz.map((item, index) => (
          <GirlViewItem
            data={item}
            renderItem={(_item) => (
              <SetDoAnItem
                nav={nav}
                idSetDoAn={_item}
                colorText={"#424141"}
                sizeText={14}
                size={80}
                width={100}
                key={"DonGiaItem" + _item}
              />
            )}
            key={"GirlViewItem" + index}
          />
        ))}
      {/* <FlatList
        data={listIdSetDoAn}
        renderItem={({ item, index }) => (
          <SetDoAnItem
            nav={nav}
            idSetDoAn={item}
            colorText={"#424141"}
            sizeText={14}
            size={80}
            width={100}
          />
        )}
        keyExtractor={(item, index) => `listIdSetDoAn${index}`}
      /> */}
    </View>
  );
}
