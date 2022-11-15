import { View, Text, Button, Alert, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AddressItem from "./AddressItem";
import { TypeAddress } from "../../utils/helper/AddressHelper";
import { RootStackScreenProps } from "../../navigation/types";
import AddressCrud from "../../utils/api/AddressCrud";
import { useAppSelector } from "../../redux/store/hooks";
import { ResultStatusCode } from "../../utils/api/apiTypes";
import { Ionicons } from "@expo/vector-icons";
import { color1 } from "../../utils/helper/Color";

export default function Address({
  navigation,
}: RootStackScreenProps<"Address">) {
  const [listAddress, setListAddress] = useState<TypeAddress[]>();
  const { token, accountDetail } = useAppSelector((s) => s.auth);
  const onPressSelectAddress = (id: string) => {
    AddressCrud.setDefault(token, id).then((res) => {
      if (res.code === ResultStatusCode.success) {
        Alert.alert("Thông báo", "Chọn địa chỉ thành công", [
          {
            text: "Ok",
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      }
    });
  };
  const fetchData = () => {
    if (token && accountDetail.id)
      AddressCrud.getListByIdConnect(token, accountDetail.id).then((res) => {
        if (res.code === ResultStatusCode.success) {
          setListAddress(res.result);
        }
      });
  };
  useEffect(() => {
    fetchData();
    const willFocusSubscription = navigation.addListener("focus", () => {
      fetchData();
    });

    return willFocusSubscription;
  }, []);
  return (
    <View>
      <View>
        {listAddress &&
          listAddress.map((item) => (
            <AddressItem
              checked={item.isDefault}
              navigation={navigation}
              onPress={() => {
                onPressSelectAddress(item.id);
              }}
              item={item}
              key={item.id}
            />
          ))}
      </View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          padding: 20,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          marginVertical: 5,
        }}
        onPress={() => {
          navigation.navigate("AddAddress");
        }}
      >
        <Ionicons name="add-circle-outline" color={color1} />
        <Text style={{ color: color1 }}>Thêm địa chỉ mới</Text>
      </TouchableOpacity>
    </View>
  );
}
