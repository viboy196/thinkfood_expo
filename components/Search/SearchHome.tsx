import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import DonGiaCrud from "../../utils/api/DonGiaCrud";
import { ResultStatusCode } from "../../utils/api/apiTypes";
import { setDonGiaState } from "../../redux/features/DonGiaOderSlices";
import DoAnCrud from "../../utils/api/DoAnCrud";
import { setDoAnState } from "../../redux/features/DoAnSlices";
import ThucPhamTieuChuanCrud from "../../utils/api/ThucPhamTieuChuanCrud";
import { setThucPhamTieuChuanState } from "../../redux/features/ThucPhamTieuChuanSlices";
import DonViDoCrud from "../../utils/api/DonViDoCrud";
import { setDonViDoState } from "../../redux/features/DonViDoSlices";
import {
  setSanPhamViewState,
  TypeSanPhamView,
} from "../../redux/features/SanPhamViewSlices";
import ItemSearchHome from "./ItemSearchHome";

export default function SearchHome(props: { searchStr?: string }) {
  const { searchHome } = useAppSelector((s) => s.textSearch);

  const { listDonGia } = useAppSelector((s) => s.donGia);

  const { listDoAn } = useAppSelector((s) => s.doAn);

  const { listThucPhamTieuChuan } = useAppSelector((s) => s.thucPhamTieuChuan);

  const { listDonViDo } = useAppSelector((s) => s.donViDo);

  const { listSanPhamView } = useAppSelector((s) => s.sanPhamView);

  const { token } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (listDonGia === undefined && token) {
      DonGiaCrud.GetAll(token).then((res) => {
        if (res.code === ResultStatusCode.success) {
          dispatch(setDonGiaState({ listDonGia: res.result }));
        }
      });
    }
  }, [listDonGia, token]);

  useEffect(() => {
    if (listDoAn === undefined && token) {
      DoAnCrud.GetAll(token).then((res) => {
        if (res.code === ResultStatusCode.success) {
          dispatch(setDoAnState({ listDoAn: res.result }));
        }
      });
    }
  }, [listDoAn, token]);

  useEffect(() => {
    if (listThucPhamTieuChuan === undefined && token) {
      ThucPhamTieuChuanCrud.GetAll(token).then((res) => {
        if (res.code === ResultStatusCode.success) {
          dispatch(
            setThucPhamTieuChuanState({ listThucPhamTieuChuan: res.result })
          );
        }
      });
    }
  }, [listThucPhamTieuChuan, token]);

  useEffect(() => {
    if (listDonViDo === undefined && token) {
      DonViDoCrud.GetAll(token).then((res) => {
        if (res.code === ResultStatusCode.success) {
          dispatch(setDonViDoState({ listDonViDo: res.result }));
        }
      });
    }
  }, [listDonViDo, token]);

  useEffect(() => {
    if (listDonGia && listDoAn && listThucPhamTieuChuan && listDonViDo) {
      let listSanPhamViewItem: TypeSanPhamView[] = [];
      listDonGia.forEach((dongiaItem) => {
        let sanPhamViewItem: TypeSanPhamView = dongiaItem;
        if (sanPhamViewItem.idDoAn) {
          let _doAn = listDoAn.find((x) => x.id === sanPhamViewItem.idDoAn);
          if (_doAn) {
            sanPhamViewItem.avartarUri = _doAn.avartarUri;
            sanPhamViewItem.listMediaUri = _doAn.listMediaUri;
            sanPhamViewItem.name = _doAn.name;
            sanPhamViewItem.info = _doAn.info;
          }
        }
        if (sanPhamViewItem.idThucPhamTieuChuan) {
          let _thucPhamTieuChuan = listThucPhamTieuChuan.find(
            (x) => x.id === sanPhamViewItem.idThucPhamTieuChuan
          );
          if (_thucPhamTieuChuan) {
            sanPhamViewItem.avartarUri = _thucPhamTieuChuan.avartarUri;
            sanPhamViewItem.listMediaUri = _thucPhamTieuChuan.listMediaUri;
            sanPhamViewItem.name = _thucPhamTieuChuan.name;
            sanPhamViewItem.info = _thucPhamTieuChuan.info;
          }
        }

        if (sanPhamViewItem.idDonViDo) {
          let _donViDo = listDonViDo.find(
            (x) => x.id === sanPhamViewItem.idDonViDo
          );
          if (_donViDo) {
            sanPhamViewItem.nameDonViDo = _donViDo.name;
          }
        }
        listSanPhamViewItem.push(sanPhamViewItem);
      });
      if (listSanPhamViewItem.length > 0) {
        dispatch(setSanPhamViewState({ listSanPhamView: listSanPhamViewItem }));
      }
    }
  }, [listDonGia, listDoAn, listThucPhamTieuChuan, listDonViDo]);

  const [listSanPham, setListSamPham] = useState<TypeSanPhamView[]>();

  useEffect(() => {
    if (listSanPhamView) {
      if (searchHome) {
        const list = listSanPhamView.filter((x) =>
          x.name?.includes(searchHome)
        );
        setListSamPham(list);
      } else {
        setListSamPham(listSanPhamView);
      }
    }
  }, [listSanPhamView, searchHome]);

  return (
    <View style={{ backgroundColor: "transparent" }}>
      <FlatList
        data={listSanPham}
        renderItem={({ item, index }) => <ItemSearchHome item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
