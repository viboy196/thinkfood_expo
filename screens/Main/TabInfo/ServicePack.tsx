import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import KhachHangGoiTieuDungCrud from "../../../utils/api/KhachHangGoiTieuDungCrud";
import { useAppSelector } from "../../../redux/store/hooks";
import { ResultStatusCode } from "../../../utils/api/apiTypes";
import { TypeKhachHangGoiTieuDung } from "../../../utils/helper/KhachHangGoiTieuDungHelper";
import ServicePackItem from "./ServicePackItem";

export default function ServicePack() {
  const { accountDetail, token } = useAppSelector((s) => s.auth);
  const [listKhachHangGoiTieuDung, setListKhachHangGoiTieuDung] =
    useState<TypeKhachHangGoiTieuDung[]>();
  useEffect(() => {
    if (token && accountDetail.id)
      KhachHangGoiTieuDungCrud.getAllByIdKhachHang(
        accountDetail.id,
        token
      ).then((res) => {
        if (res.code === ResultStatusCode.success) {
          setListKhachHangGoiTieuDung(res.result);
        }
      });
  }, []);
  return (
    <ScrollView>
      {listKhachHangGoiTieuDung &&
        listKhachHangGoiTieuDung.map((item) => (
          <ServicePackItem item={item} key={"ServicePackItem" + item.id} />
        ))}
    </ScrollView>
  );
}
