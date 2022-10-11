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
export default function ListFood({
  navigation,
  route,
}: RootStackScreenProps<"ListDonGia">) {
  const [listDonGia, setListDonGia] = useState<Array<TypeDonGia>>();
  useEffect(() => {
    console.log("vao day");

    if (route.params.listIdDonGia)
      DonGiaCrud.getListPublishByListId(route.params.listIdDonGia).then(
        (res) => {
          if (res.code === ResultStatusCode.success) {
            setListDonGia(res.result);
          }
        }
      );
  }, [route.params.listIdDonGia]);
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
                  navigation.navigate("FoodDeTail");
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
