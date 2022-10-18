import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { TypeKhachHangGoiTieuDung } from "../../../utils/helper/KhachHangGoiTieuDungHelper";
import { TypeGoiTieuDung } from "../../../utils/helper/GoiTieuDungHelper";
import GoiTieuDungCrud from "../../../utils/api/GoiTieuDungCrud";
import { ResultStatusCode } from "../../../utils/api/apiTypes";
import { UrlHelper } from "../../../utils/helper/UrlHelper";

export default function ServicePackItem(props: {
  item: TypeKhachHangGoiTieuDung;
}) {
  const [goiTieuDung, setGoiTieuDung] = useState<TypeGoiTieuDung>();
  useEffect(() => {
    if (props.item.idGoiTieuDung) {
      GoiTieuDungCrud.getDetailPublish(props.item.idGoiTieuDung).then((res) => {
        if (res.code === ResultStatusCode.success) {
          setGoiTieuDung(res.result);
        }
      });
    }
  }, [props.item.idGoiTieuDung]);
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ flex: 4 }}>
        <Image
          source={
            goiTieuDung?.avartarUri
              ? { uri: UrlHelper.urlFile + goiTieuDung.avartarUri }
              : require("../../../assets/images/logo/thinkfoodlogo.png")
          }
          style={{ width: 40, height: 40 }}
        />
      </View>

      <View style={{ flex: 6 }}>
        <Text>{goiTieuDung?.name}</Text>

        <Text>{`số dư :${props.item.price}`}</Text>
      </View>
    </View>
  );
}
