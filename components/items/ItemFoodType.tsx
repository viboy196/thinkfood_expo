import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { TypeMonAn } from "../../utils/helper/MonAnHelper";
import { TypeLoaiMonAn } from "../../utils/helper/LoaiMonAnHelper";
import MonAnCrud from "../../utils/api/MonAnCrud";
import { ResultStatusCode } from "../../utils/api/apiTypes";
import ButtonImageShow from "./ButtonImageShow";
import { tintColorLight } from "../../constants/Colors";
import FoodItem from "./FoodItem";
import { RootTabScreenProps } from "../../navigation/types";

export default function ItemFoodType({
  item,
  nav,
}: {
  nav: RootTabScreenProps<"TabHome">;
  item: TypeLoaiMonAn;
}) {
  const [listImageFood, setListImageFood] = useState<Array<TypeMonAn>>();

  useEffect(() => {
    if (item.id)
      MonAnCrud.getListPublishHomeByIdLoaiMonAn(item.id).then((res) => {
        if (res.code === ResultStatusCode.success) {
          const arr = res.result as Array<TypeMonAn>;
          setListImageFood(arr.sort((a, b) => a.oderPublish - b.oderPublish));
        }
      });
  }, [item.id]);
  return (
    <>
      <Text
        style={{
          color: tintColorLight,
          fontSize: 18,
          fontWeight: "bold",
          marginVertical: 10,
        }}
      >
        {item.name}{" "}
      </Text>
      <FlatList
        data={listImageFood}
        numColumns={3}
        renderItem={({ item }) => (
          <FoodItem
            nav={nav}
            item={item}
            colorText={"#424141"}
            sizeText={16}
            width={100}
            height={120}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}
