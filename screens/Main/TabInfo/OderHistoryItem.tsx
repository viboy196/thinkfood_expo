import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { TypeOder } from "../../../utils/helper/OderHelper";
import { useAppSelector } from "../../../redux/store/hooks";
import { UrlHelper } from "../../../utils/helper/UrlHelper";
import { currencyFormat } from "../../../utils/helper/HelperFunc";

export default function OderHistoryItem(props: { item: TypeOder }) {
  const { listSanPhamView } = useAppSelector((s) => s.sanPhamView);
  const sanPhamView = listSanPhamView.find(
    (x) => x.id === props.item?.idDonGia
  );
  const [priceSum, setPriceSum] = useState<number>(
    props.item?.unitPrice * props.item?.soLuong
  );
  useEffect(() => {
    if (props.item?.shipPrice) {
      console.log(typeof props.item?.shipPrice);

      setPriceSum((old) => {
        return Number(old) + Number(props.item?.shipPrice);
      });
    }
  }, [props.item]);
  console.log("ship", props.item);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 10,
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
      }}
    >
      <View style={{ flexDirection: "row", paddingVertical: 10 }}>
        <Text>THINKFOOD</Text>
        <View style={{ flex: 1 }} />
        <Text>{props.item.complete ? "Hoàn Thành" : "Chưa hoàn Thành"}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#aeaeae",
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={
              sanPhamView.avartarUri
                ? { uri: UrlHelper.urlFile + sanPhamView.avartarUri }
                : require("../../../assets/images/logo/thinkfoodlogo.png")
            }
            style={{ width: 40, height: 40 }}
          />
        </View>

        <View style={{ flex: 4, justifyContent: "center" }}>
          <Text style={{ paddingTop: 10 }}>{sanPhamView.name}</Text>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text>{sanPhamView.info}</Text>
            </View>

            <View style={{ flex: 1 }} />
            <View>
              <Text>vnđ {currencyFormat(props.item?.unitPrice)}</Text>
              <Text style={{ textAlign: "right" }}>x{props.item?.soLuong}</Text>
            </View>
          </View>
        </View>
      </View>
      {props.item?.shipPrice !== undefined && (
        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          <Text>Phí ship</Text>
          <View style={{ flex: 1 }} />
          <Text>vnđ {currencyFormat(Number(props.item?.shipPrice))}</Text>
        </View>
      )}
      <View style={{ flexDirection: "row", paddingTop: 10 }}>
        <Text>{props.item?.soLuong} sản phẩm</Text>
        <View style={{ flex: 1 }} />
        <Text>Thành tiền : vnđ {currencyFormat(priceSum)}</Text>
      </View>
    </View>
  );
}
