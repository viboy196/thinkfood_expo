import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { TypeKhachHangGoiTieuDung } from "../../../utils/helper/KhachHangGoiTieuDungHelper";
import { TypeGoiTieuDung } from "../../../utils/helper/GoiTieuDungHelper";
import GoiTieuDungCrud from "../../../utils/api/GoiTieuDungCrud";
import { ResultStatusCode } from "../../../utils/api/apiTypes";
import { UrlHelper } from "../../../utils/helper/UrlHelper";
import { currencyFormat } from "../../../utils/helper/HelperFunc";

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
    <>
      {goiTieuDung ? (
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 3,
            elevation: 5,
          }}
        >
          <View style={{ flex: 4 }}>
            <Image
              source={
                goiTieuDung?.avartarUri
                  ? { uri: UrlHelper.urlFile + goiTieuDung.avartarUri }
                  : require("../../../assets/images/logo/thinkfoodlogo.png")
              }
              style={{ width: 80, height: 60 }}
            />
          </View>

          <View style={{ flex: 6, justifyContent: "center" }}>
            <Text>Gói : {goiTieuDung?.name}</Text>

            <Text>{`Giá trị :${currencyFormat(
              Number(goiTieuDung?.price)
            )} vnđ`}</Text>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
}
