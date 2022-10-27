import { View, Text, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import AddressItem from "./AddressItem";
import { TypeAddress } from "../../utils/helper/AddressHelper";
import { RootStackScreenProps } from "../../navigation/types";
import AddressCrud from "../../utils/api/AddressCrud";
import { useAppSelector } from "../../redux/store/hooks";
import { ResultStatusCode } from "../../utils/api/apiTypes";

export default function Address({
  navigation,
}: RootStackScreenProps<"Address">) {
  const [listAddress, setListAddress] = useState<TypeAddress[]>();
  const { token, accountDetail } = useAppSelector((s) => s.auth);
  const onPressSelectAddress = (id: string) => {
    AddressCrud.setDefault(token, id).then((res) => {
      if (res.code === ResultStatusCode.success) {
        Alert.alert("Thành công", "Chọn địa chỉ thành công", [
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
  useEffect(() => {
    if (token && accountDetail.id)
      AddressCrud.getListByIdConnect(token, accountDetail.id).then((res) => {
        if (res.code === ResultStatusCode.success) {
          setListAddress(res.result);
        }
      });
  }, [token, accountDetail.id]);
  return (
    <View>
      <View>
        {listAddress &&
          listAddress.map((item) => (
            <AddressItem
              checked={item.isDefault}
              onPress={() => {
                onPressSelectAddress(item.id);
              }}
              item={item}
              key={item.id}
            />
          ))}
      </View>
      <View>
        <Button title="+ Thêm" color={"#5cb85c"} />
      </View>
    </View>
  );
}
