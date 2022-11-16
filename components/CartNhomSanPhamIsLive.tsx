import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { TypeNhomSanPham } from "../utils/helper/NhomSanPhamHelper";
import NhomSanPhamCrud from "../utils/api/NhomSanPhamCrud";
import { ResultStatusCode } from "../utils/api/apiTypes";
import NhomSanPhamIsLiveItem from "./NhomSanPhamIsLiveItem";
import { RootTabScreenProps } from "../navigation/types";
import NhomSanPhamSetDoAnIsLiveItem from "./NhomSanPhamSetDoAnIsLiveItem";

export default function CartNhomSanPhamIsLive(props: {
  nav: RootTabScreenProps<"TabHome">;
}) {
  const [listData, setListData] = useState<Array<TypeNhomSanPham>>();
  useEffect(() => {
    NhomSanPhamCrud.getAllPublishIsLive()
      .then((res) => {
        if (res.code === ResultStatusCode.success) {
          setListData(res.result);
        }
      })
      .catch((error) => {
        console.log("error GetLoaiMonAnPublish", error);
      });
  }, []);

  return (
    <>
      {listData &&
        listData.map((item) => (
          <View key={`NhomSanPhamIsLiveItem${item.id}`}>
            <NhomSanPhamIsLiveItem nav={props.nav} item={item} />
            {item.listIdSetDoAn && (
              <NhomSanPhamSetDoAnIsLiveItem
                nav={props.nav}
                listIdSetDoAn={item.listIdSetDoAn}
              />
            )}
          </View>
        ))}
    </>
  );
}
