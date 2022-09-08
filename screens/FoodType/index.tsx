import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React from "react";

import Ionicons from "@expo/vector-icons/build/Ionicons";
import { tintColorLight } from "../../constants/Colors";
import SearchCompenents from "../../components/SearchCompenents";
import ItemLoaiMonAn from "./ItemLoaiMonAn";
import { List_LoaiThucPham } from "../../dataMockaroo/LoaiThucPham";
import { RootStackScreenProps } from "../../navigation/types";
import { goBackNav } from "../../utils/Helper/navigationHelper";
export default function FoodType({
  navigation,
}: RootStackScreenProps<"FoodType">) {
  return (
    <View style={{ flex: 1 }}>
      <SearchCompenents onGoBack={() =>{
        goBackNav(navigation)
      }} />
      <FlatList
        data={List_LoaiThucPham}
        renderItem={({ item }) => (
          <ItemLoaiMonAn
            item={item}
            onPress={() => {
              navigation.navigate("ListFood", { id: item.id });
            }}
          />
        )}
      />
    </View>
  );
}
