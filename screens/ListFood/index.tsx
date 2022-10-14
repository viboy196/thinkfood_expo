import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ItemFood from "./ItemFood";
import TitleCompenents from "../../components/TitleCompenents";
import { DanhSachSanPham } from "../../dataMockaroo/DanhSachLoaiThucPham";
import { RootStackScreenProps } from "../../navigation/types";
import Layout from "../../constants/Layout";
import { goBackNav } from "../../utils/helper/navigationHelper";
import DonGiaCrud from "../../utils/api/DonGiaCrud";
import { TypeDonGia } from "../../utils/helper/DonGiaHelper";
import { ResultStatusCode } from "../../utils/api/apiTypes";
import { TypeDonGiaView } from "../../redux/features/SanPhamViewSlices";
import { useAppSelector } from "../../redux/store/hooks";
export default function ListFood({
  navigation,
  route,
}: RootStackScreenProps<"ListDonGia">) {
  const { listSanPhamView } = useAppSelector((s) => s.sanPhamView);
  const [listDonGia, setListDonGia] = useState<Array<TypeDonGiaView>>();
  useEffect(() => {
    console.log("vao day");
    let _listDonGia: TypeDonGiaView[] = [];
    route.params.listIdDonGia.forEach((idDOnGia) => {
      const item = listSanPhamView.find((x) => x.id === idDOnGia);
      if (item) {
        _listDonGia.push(item);
      }
    });
    setListDonGia(_listDonGia);
  }, [route.params.listIdDonGia, listSanPhamView]);
  return (
    <View>
      <TitleCompenents
        prodNo={listDonGia?.length ? listDonGia.length : 0}
        onGoBack={() => {
          goBackNav(navigation);
        }}
      />
      <View
        style={{
          width: Layout.window.width,
          height: Layout.window.height - 100,
        }}
      >
        {listDonGia && (
          <FlatList
            data={listDonGia}
            renderItem={({ item }) => (
              <ItemFood
                item={item}
                onPress={() => {
                  navigation.navigate("FoodDeTail", item);
                }}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  );
}
