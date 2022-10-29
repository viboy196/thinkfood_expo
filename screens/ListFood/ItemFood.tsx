import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
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
import { TypeDoAn } from "../../utils/helper/DoAnHelper";
import { TypeThucPhamTieuChuan } from "../../utils/helper/ThucPhamTieuChuanHelper";
import { callNumber, currencyFormat } from "../../utils/helper/HelperFunc";
import { TypeDonGiaView } from "../../redux/features/SanPhamViewSlices";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import CartOderCrud from "../../utils/api/CartOderCrud";
import { setCartOderState } from "../../redux/features/CartOderSlices";
import ApiRequest from "../../utils/api/Main/ApiRequest";
export default function ItemFood({
  item,
  onPress,
}: {
  item: TypeDonGiaView;
  onPress: () => void;
}) {
  const distpatch = useAppDispatch();
  const { token, accountDetail } = useAppSelector((s) => s.auth);
  const addCart = () => {
    if (accountDetail?.id && token)
      CartOderCrud.addItem(accountDetail?.id, token, {
        chon: true,
        idDonGia: item.id,
        soLuong: 1,
        unitPrice: item.unitPrice,
      }).then((res) => {
        if (res.code === ResultStatusCode.success) {
          Alert.alert("thêm vào giỏ hàng thành công");
          distpatch(
            setCartOderState({
              id: res.result.id,
              listCartItem: res.result.listCart,
              idKhachHang: res.result.idKhachHang,
            })
          );
        }
      });
  };
  const Call = () => {
    if (token) {
      ApiRequest.getPhoneActive(token).then((res) => {
        if (res.code === ResultStatusCode.success) {
          const arrPhone = res.result as string[];
          if (arrPhone.length > 0) {
            callNumber(arrPhone[0]);
          } else {
            Alert.alert("Tổng đài viên đang bận liên hệ sau");
          }
        } else {
          Alert.alert("Tổng đài viên đang bận liên hệ sau");
        }
      });
    }
  };
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
        source={{ uri: UrlHelper.urlFile + item?.avartarUri }}
        resizeMode="cover"
        style={{
          width: 100,
          height: 100,
          borderRadius: 8,
        }}
      />
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ color: "#575757", fontSize: 16 }}>{item?.name}</Text>
        {/* <Text style={{ textDecorationLine: "line-through", color: "#cfcfcf" }}>
          đ{" "}
          {(item.unitPrice ? item.unitPrice * 1.5 : 0).toLocaleString("en-US")}
        </Text> */}

        <Text style={{ color: "#f52132", fontSize: 20, fontWeight: "bold" }}>
          đ {item.unitPrice ? currencyFormat(item.unitPrice) : 0}
        </Text>
        <View style={{ paddingHorizontal: 5, width: 140, marginTop: 10 }}>
          <ProgressBar
            progress={0 / 1}
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
        <TouchableOpacity onPress={Call}>
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
        <TouchableOpacity onPress={addCart}>
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
