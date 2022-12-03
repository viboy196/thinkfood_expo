import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  TypeCartOder,
  TypeCartOderItem,
} from "../../utils/helper/CartOderHelper";
import { TypeDonGia } from "../../utils/helper/DonGiaHelper";
import DonGiaCrud from "../../utils/api/DonGiaCrud";
import DoAnCrud from "../../utils/api/DoAnCrud";
import { ResultStatusCode } from "../../utils/api/apiTypes";
import ThucPhamTieuChuanCrud from "../../utils/api/ThucPhamTieuChuanCrud";
import DonViDoCrud from "../../utils/api/DonViDoCrud";
import Layout from "../../constants/Layout";

import { Checkbox } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import {
  setCartOderState,
  updateCartOderItem,
} from "../../redux/features/CartOderSlices";
import { UrlHelper } from "../../utils/helper/UrlHelper";
import { currencyFormat } from "../../utils/helper/HelperFunc";
import CartOderCrud from "../../utils/api/CartOderCrud";
import { color1 } from "../../utils/helper/Color";

export default function Item(props: { item: TypeCartOderItem }) {
  const { chon, idDonGia, soLuong, unitPrice } = props.item;
  const { token, accountDetail } = useAppSelector((s) => s.auth);
  const { listSanPhamView } = useAppSelector((s) => s.sanPhamView);
  const distpatch = useAppDispatch();

  const sanphamView = listSanPhamView.find((x) => x.id === idDonGia);
  console.log("sanphamView", sanphamView);

  const removeItemCart = () => {
    if (token && accountDetail?.id)
      CartOderCrud.removeItem(
        accountDetail?.id,
        props.item.idDonGia,
        token
      ).then((res) => {
        if (res.code === ResultStatusCode.success) {
          Alert.alert("Xóa thành công");
          console.log(res.result);

          distpatch(
            setCartOderState({
              id: res.result.id,
              listCartItem: res.result.listCart,
              idKhachHang: accountDetail?.id,
            })
          );
        }
      });
  };

  return (
    <View
      style={{
        marginTop: 5,

        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          padding: 10,
        }}
      >
        <Text style={{ color: color1, fontSize: 16, fontWeight: "600" }}>
          Điểm ẩm thực :
        </Text>
        <Text style={{ flex: 1, textAlign: "right" }}>
          {sanphamView.nameDiemAmThuc}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 10,
          }}
        >
          <View
            style={{ borderColor: color1, borderRadius: 8, borderWidth: 1 }}
          >
            <Checkbox
              status={chon ? "checked" : "unchecked"}
              color={color1}
              onPress={() => {
                distpatch(
                  updateCartOderItem({ input: { ...props.item, chon: !chon } })
                );
              }}
            />
          </View>
        </View>
        <View
          style={{
            flex: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {sanphamView?.avartarUri && (
            <Image
              source={{ uri: UrlHelper.urlFile + sanphamView?.avartarUri }}
              style={{
                width: 120,
                height: 80,
                resizeMode: "cover",
              }}
            />
          )}
        </View>
        <View style={{ flex: 4, padding: 10 }}>
          <Text>{sanphamView?.name}</Text>

          <Text>
            {unitPrice ? currencyFormat(unitPrice) : ""}
            {" vnđ/"}
            {sanphamView?.nameDonViDo}
          </Text>

          <View
            style={{
              width: "75%",
              height: 40,
              flexDirection: "row",
              borderWidth: 2,
              borderColor: "#bebebe",
              padding: 10,
              borderRadius: 100,
              margin: 10,
            }}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                if (soLuong > 1)
                  distpatch(
                    updateCartOderItem({
                      input: { ...props.item, soLuong: soLuong - 1 },
                    })
                  );
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                -
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                {soLuong}
              </Text>
            </View>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                distpatch(
                  updateCartOderItem({
                    input: { ...props.item, soLuong: soLuong + 1 },
                  })
                );
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            title="x"
            color={"red"}
            onPress={() => {
              Alert.alert(
                "Xóa sản phẩm" + sanphamView.name,
                "Bạn muốn xóa sản phẩm " +
                  sanphamView.name +
                  " ra khỏi giỏ hàng",
                [
                  {
                    text: "thôi",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  { text: "OK", onPress: removeItemCart },
                ]
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}
