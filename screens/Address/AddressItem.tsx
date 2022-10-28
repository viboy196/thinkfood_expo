import { View, Text, TouchableOpacity, Button, Alert } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { TypeAddress } from "../../utils/helper/AddressHelper";
import AddressCrud from "../../utils/api/AddressCrud";
import { useAppSelector } from "../../redux/store/hooks";
import { ResultStatusCode } from "../../utils/api/apiTypes";
import { color1, color2 } from "../../utils/helper/Color";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { getStringAddress } from "../../utils/helper/HelperFunc";
export default function AddressItem(props: {
  checked?: boolean;
  item: TypeAddress;
  onPress: () => void;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "Address",
    undefined
  >;
}) {
  const { token } = useAppSelector((s) => s.auth);

  return (
    <View
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
          color={color1}
          onPress={props.onPress}
        />
      </View>
      <View style={{ flex: 6 }}>
        <Text>Địa chỉ nhận hàng</Text>

        {props.item && (
          <>
            <Text>{getStringAddress(props.item)}</Text>
            <Text style={{ color: color1 }}>{props.item.type}</Text>
          </>
        )}
      </View>
      <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Sửa"
          color={color2}
          onPress={() => {
            props.navigation.navigate("UpdateAddress", { data: props.item });
          }}
        />
      </View>
    </View>
  );
}
