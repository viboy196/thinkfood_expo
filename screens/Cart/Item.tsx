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

export default function Item(props: { item: TypeCartOderItem }) {
  const { chon, idDonGia, soLuong, unitPrice } = props.item;
  const [donGia, setDonGia] = useState<TypeDonGia>();
  const { token, accountDetail } = useAppSelector((s) => s.auth);

  const distpatch = useAppDispatch();

  const [state, setState] = useState<{
    name?: string;
    link?: string;
    avatarUri?: string;
    nameDonViDo?: string;
    listMediaUri?: string[];
    info?: string;
  }>();

  useEffect(() => {
    DonGiaCrud.getDetail(idDonGia).then((res) => {
      if (res.code === ResultStatusCode.success) {
        console.log(res.result);

        setDonGia(res.result);
      }
    });
  }, []);

  useEffect(() => {
    if (donGia?.idDoAn) {
      DoAnCrud.getDetailPublish(donGia.idDoAn).then((res) => {
        if (res.code === ResultStatusCode.success) {
          // @ts-ignore
          setState((old) => {
            return {
              ...old,
              avatarUri: res.result.avartarUri,
              listMediaUri: res.result.listMediaUri,
              name: res.result.name,
              info: res.result.info,
              link: `/action/DoAn/${res.result.id}`,
            };
          });
        }
      });
    }
    if (donGia?.idThucPhamTieuChuan) {
      ThucPhamTieuChuanCrud.getDetailPublish(donGia.idThucPhamTieuChuan).then(
        (res) => {
          if (res.code === ResultStatusCode.success) {
            // @ts-ignore
            setState((old) => {
              return {
                ...old,
                avatarUri: res.result.avartarUri,
                listMediaUri: res.result.listMediaUri,
                name: res.result.name,
                link: `/action/ThucPhamTieuChuan/${res.result.id}`,
              };
            });
          }
        }
      );
    }
    if (donGia?.idDonViDo) {
      DonViDoCrud.getDetailPublish(donGia.idDonViDo).then((res) => {
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
  }, [donGia?.idDoAn, donGia?.idDonViDo, donGia?.idThucPhamTieuChuan]);

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
        width: Layout.window.width,
        flexDirection: "row",
        marginTop: 5,
        backgroundColor: "#fff",
        paddingVertical: 10,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Checkbox
          status={chon ? "checked" : "unchecked"}
          onPress={() => {
            distpatch(
              updateCartOderItem({ input: { ...props.item, chon: !chon } })
            );
          }}
        />
      </View>
      <View
        style={{
          flex: 4,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {state?.avatarUri && (
          <Image
            source={{ uri: UrlHelper.urlFile + state?.avatarUri }}
            style={{
              width: 120,
              height: 80,
              resizeMode: "cover",
            }}
          />
        )}
      </View>
      <View style={{ flex: 4, padding: 10 }}>
        <Text>{state?.name}</Text>

        <Text>
          {unitPrice ? currencyFormat(unitPrice) : ""}
          {" vnđ/"}
          {state?.nameDonViDo}
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
              style={{ textAlign: "center", fontSize: 14, fontWeight: "bold" }}
            >
              -
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text
              style={{ textAlign: "center", fontSize: 14, fontWeight: "bold" }}
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
              style={{ textAlign: "center", fontSize: 14, fontWeight: "bold" }}
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
              "Xóa sản phẩm" + state.name,
              "Bạn muốn xóa sản phẩm " + state.name + " ra khỏi giỏ hàng",
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
  );
}
