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
  TypeDonGiaView,
} from "../../redux/features/SanPhamViewSlices";
import ItemSearchHome from "./ItemSearchHome";
import { RootTabScreenProps } from "../../navigation/types";
import useDebounce from "../../hooks/useDebounce";

export default function SearchHome(props: {
  searchStr?: string;
  nav: RootTabScreenProps<"TabHome">;
}) {
  const { searchHome } = useAppSelector((s) => s.textSearch);
  const debouncedValue = useDebounce(searchHome, 1000);
  const { listSanPhamView } = useAppSelector((s) => s.sanPhamView);

  const { token } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

  const [listSanPham, setListSamPham] = useState<TypeDonGiaView[]>();

  useEffect(() => {
    if (listSanPhamView) {
      if (debouncedValue) {
        const list = listSanPhamView.filter((x) =>
          x.name?.toLowerCase().includes(debouncedValue.toLowerCase())
        );
        setListSamPham(list);
      } else {
        setListSamPham(listSanPhamView);
      }
    }
  }, [listSanPhamView, debouncedValue]);

  return (
    <>
      {listSanPham &&
        listSanPham.map((item) => (
          <ItemSearchHome
            onPress={() => {
              props.nav.navigation.navigate("FoodDeTail", item);
            }}
            item={item}
            key={item.id}
          />
        ))}
    </>
  );
}
