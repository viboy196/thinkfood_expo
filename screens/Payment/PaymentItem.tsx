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

export default function PaymentItem(props: { item: TypeCartOderItem }) {
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
          padding: 10,
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
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: "bold",
            color: "#9e9e9e",
          }}
        >
          {"x"}
          {soLuong}
        </Text>
      </View>
    </View>
  );
}
