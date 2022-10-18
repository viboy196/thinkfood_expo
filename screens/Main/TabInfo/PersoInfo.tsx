import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { useAppSelector } from "../../../redux/store/hooks";
import { TypeAccount } from "../../../utils/helper/AccountHelper";
import PersoInfoItem from "./PersoInfoItem";

export default function PersoInfo() {
  const { accountDetail } = useAppSelector((s) => s.auth);
  const [account, setAccount] = useState<TypeAccount>(accountDetail);
  return (
    <View style={{ padding: 10 }}>
      <PersoInfoItem
        value={account.fullName}
        onChangeText={(text) => {
          setAccount((old) => {
            return { ...old, fullName: text };
          });
        }}
        title="Họ và tên"
      />

      <PersoInfoItem
        value={account.email}
        onChangeText={(text) => {
          setAccount((old) => {
            return { ...old, email: text };
          });
        }}
        title="Email"
      />

      <PersoInfoItem
        value={account.phone}
        onChangeText={(text) => {
          setAccount((old) => {
            return { ...old, phone: text };
          });
        }}
        title="Số điện thoại"
      />
    </View>
  );
}
