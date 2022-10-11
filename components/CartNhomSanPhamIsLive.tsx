import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { TypeNhomSanPham } from "../utils/helper/NhomSanPhamHelper";
import NhomSanPhamCrud from "../utils/api/NhomSanPhamCrud";
import { ResultStatusCode } from "../utils/api/apiTypes";
import NhomSanPhamIsLiveItem from "./NhomSanPhamIsLiveItem";

export default function CartNhomSanPhamIsLive() {
  const [listData, setListData] = useState<Array<TypeNhomSanPham>>();
  useEffect(() => {
    NhomSanPhamCrud.getAllPublishIsLive()
      .then((res) => {
        const arr = res.result as Array<TypeNhomSanPham>;

        if (res.code === ResultStatusCode.success) setListData(arr);
      })
      .catch((error) => {
        console.log("error GetLoaiMonAnPublish", error);
      });
  }, []);

  return (
    <>
      {listData && (
        <FlatList
          data={listData}
          renderItem={({ item }) => (
            <NhomSanPhamIsLiveItem
              item={item}
              key={`ItemFoodType_${item.id}`}
            />
          )}
        />
      )}
    </>
  );
}
