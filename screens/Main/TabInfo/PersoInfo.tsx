import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { useAppSelector } from "../../../redux/store/hooks";
import { TypeAccount } from "../../../utils/helper/AccountHelper";

export default function PersoInfo() {
  const { accountDetail } = useAppSelector((s) => s.auth);
  const [account, setAccount] = useState<TypeAccount>(accountDetail);
  return (
    <View style={{ padding: 10 }}>
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        <View style={{ flex: 8 }}>
          <Text>Họ và tên</Text>
          <TextInput
            value={account.fullName}
            onChangeText={(text) => {
              setAccount((old) => {
                return { ...old, fullName: text };
              });
            }}
            editable={false}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Button title="Sửa" />
        </View>
      </View>

      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        <View style={{ flex: 8 }}>
          <Text>Email</Text>
          <TextInput
            value={account.email}
            onChangeText={(text) => {
              setAccount((old) => {
                return { ...old, email: text };
              });
            }}
            editable={false}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Button title="Sửa" />
        </View>
      </View>

      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        <View style={{ flex: 8 }}>
          <Text>Số điện thoại</Text>
          <TextInput
            value={account.phone}
            onChangeText={(text) => {
              setAccount((old) => {
                return { ...old, phone: text };
              });
            }}
            editable={false}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Button title="Sửa" />
        </View>
      </View>
    </View>
  );
}
