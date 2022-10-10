import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import Ionicons from "@expo/vector-icons/build/Ionicons";

import { ProgressBar } from "react-native-paper";
import Layout from "../../constants/Layout";
import { TypeDonGia } from "../../utils/helper/DonGiaHelper";
import { UrlHelper } from "../../utils/helper/UrlHelper";
import DoAnCrud from "../../utils/api/DoAnCrud";
import { ResultStatusCode } from "../../utils/api/apiTypes";
import ThucPhamTieuChuanCrud from "../../utils/api/ThucPhamTieuChuanCrud";
import DonViDoCrud from "../../utils/api/DonViDoCrud";
export default function ItemFood({
  item,
  onPress,
}: {
  item: TypeDonGia;
  onPress: () => void;
}) {
  const [state, setState] = useState<{
    name?: string;
    price?: number;
    link?: string;
    nameDonViDo?: string;
  }>();

  useEffect(() => {
    if (item.idDoAn) {
      DoAnCrud.getDetailPublish(item.idDoAn).then((res) => {
        if (res.code === ResultStatusCode.success) {
          // @ts-ignore
          setState((old) => {
            return {
              ...old,
              name: res.result.name,
              price: item.unitPrice,
              link: `/action/DoAn/${res.result.id}`,
            };
          });
        }
      });
    }
    if (item.idThucPhamTieuChuan) {
      ThucPhamTieuChuanCrud.getDetailPublish(item.idThucPhamTieuChuan).then(
        (res) => {
          if (res.code === ResultStatusCode.success) {
            // @ts-ignore
            setState((old) => {
              return {
                ...old,
                name: res.result.name,
                link: `/action/ThucPhamTieuChuan/${res.result.id}`,
              };
            });
          }
        }
      );
    }
    if (item.idDonViDo) {
      DonViDoCrud.getDetailPublish(item.idDonViDo).then((res) => {
        if (res.code === ResultStatusCode.success) {
          // @ts-ignore
          setState((old) => {
            return {
              ...old,
              nameDonViDo: res.result.name,
            };
          });
        }
      });
    }
  }, [item.idDoAn, item.idDonViDo, item.idThucPhamTieuChuan]);

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: Layout.window.width,
        backgroundColor: "#fff",
        paddingVertical: 5,
        paddingHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
      }}
      onPress={onPress}
    >
      <Image
        source={{ uri: UrlHelper.urlFile + item.avartarUri }}
        resizeMode="cover"
        style={{
          width: 100,
          height: 100,
        }}
      />
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ color: "#575757", fontSize: 16 }}>{state?.name}</Text>
        <Text style={{ textDecorationLine: "line-through", color: "#cfcfcf" }}>
          đ {0}
        </Text>

        <Text style={{ color: "#f52132", fontSize: 20, fontWeight: "bold" }}>
          đ {item.unitPrice}
        </Text>
        <View style={{ paddingHorizontal: 5, width: 140, marginTop: 10 }}>
          <ProgressBar
            progress={0 / 0}
            color={"#f41f2f"}
            style={{ height: 15, borderRadius: 10, position: "absolute" }}
          />
          <Text
            style={{
              fontSize: 10,
              textAlign: "center",
              color: "#fff",
              fontWeight: "500",
            }}
          >
            {" "}
            {0}/{0} sản phẩm đã bán
          </Text>
        </View>
      </View>
      <View
        style={{
          width: 100,
          height: 60,
          position: "absolute",
          right: 0,
          bottom: 0,
          justifyContent: "flex-end",
          marginRight: 5,
          marginBottom: 5,
        }}
      >
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: "#00b454",
              padding: 4,
              marginTop: 5,
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <View>
              <Ionicons name="call" color={"#fff"} size={12} />
            </View>
            <Text style={{ fontSize: 10, padding: 4, color: "#fff" }}>
              Mua Ngay
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: "#00b454",
              padding: 4,
              marginTop: 5,
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <View>
              <Ionicons name="add-circle" color={"#fff"} size={12} />
            </View>
            <Text style={{ fontSize: 10, padding: 4, color: "#fff" }}>
              Thêm giỏ hàng
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
