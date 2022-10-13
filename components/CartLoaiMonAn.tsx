import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { TypeLoaiMonAn } from "../utils/helper/LoaiMonAnHelper";
import LoaiMonAnCrud from "../utils/api/LoaiMonAnCrud";
import { ResultStatusCode } from "../utils/api/apiTypes";
import ButtonImageShow from "./items/ButtonImageShow";
import ItemFoodType from "./items/ItemFoodType";
import { RootTabScreenProps } from "../navigation/types";

export default function CartLoaiMonAn(props: {
  nav: RootTabScreenProps<"TabHome">;
}) {
  const [listData, setListData] = useState<Array<TypeLoaiMonAn>>();

  useEffect(() => {
    LoaiMonAnCrud.GetAllPublish()
      .then((res) => {
        const arr = res.result as Array<TypeLoaiMonAn>;

        if (res.code === ResultStatusCode.success)
          setListData(
            arr.sort((a, b) => Number(a.oderPublish) - Number(b.oderPublish))
          );
      })
      .catch((error) => {
        console.log("error GetLoaiMonAnPublish", error);
      });
  }, []);

  return (
    <>
      <FlatList
        data={listData}
        renderItem={({ item }) => <ItemFoodType nav={props.nav} item={item} />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}
