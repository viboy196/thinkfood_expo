import { View, Text, TouchableOpacity, Button, Alert } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { TypeAddress } from "../../utils/helper/AddressHelper";
import AddressCrud from "../../utils/api/AddressCrud";
import { useAppSelector } from "../../redux/store/hooks";
import { ResultStatusCode } from "../../utils/api/apiTypes";
export default function AddressItem(props: {
  checked?: boolean;
  item: TypeAddress;
  onPress: () => void;
}) {
  const { token } = useAppSelector((s) => s.auth);

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        marginVertical: 5,
        backgroundColor: "#fff",
        paddingVertical: 10,
      }}
    >
      <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
        <RadioButton
          value="first"
          status={props.checked === true ? "checked" : "unchecked"}
          onPress={props.onPress}
        />
      </View>
      <View style={{ flex: 6 }}>
        <Text>Địa chỉ nhận hàng</Text>

        {props.item && (
          <Text>
            {props.item.receiverName} | {props.item.phone} |{" "}
            {props.item.address} , {props.item.ward} , {props.item.district} ,{" "}
            {props.item.province}
          </Text>
        )}
      </View>
      <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
        <Button title="Sửa" />
      </View>
    </TouchableOpacity>
  );
}
