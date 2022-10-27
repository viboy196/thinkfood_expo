import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { RootStackScreenProps } from "../navigation/types";
import { TypeAddress } from "../utils/helper/AddressHelper";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import AddressCrud from "../utils/api/AddressCrud";
import { ResultStatusCode } from "../utils/api/apiTypes";
import { logOut } from "../redux/features/auth/authSlices";
import { getStringAddress } from "../utils/helper/HelperFunc";
export default function Address(props: {
  nav: RootStackScreenProps<"Payment">;
}) {
  const [address, setAddress] = useState<TypeAddress>();

  const { token } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const fetchData = () => {
    if (token) {
      AddressCrud.getAddressDefault(token)
        .then((res) => {
          if (res.code === ResultStatusCode.success) {
            setAddress(res.result);
          }
        })
        .catch((error) => {
          dispatch(logOut());
        });
    }
  };
  useEffect(() => {
    fetchData();
    const willFocusSubscription = props.nav.navigation.addListener(
      "focus",
      () => {
        fetchData();
      }
    );

    return willFocusSubscription;
  }, []);
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        marginVertical: 5,
        backgroundColor: "#fff",
        paddingVertical: 10,
      }}
      onPress={() => {
        props.nav.navigation.navigate("Address");
      }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Ionicons name="location" />
      </View>
      <View style={{ flex: 8 }}>
        <Text>Địa chỉ nhận hàng : </Text>

        {address && <Text>{getStringAddress(address)}</Text>}
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Ionicons name="chevron-forward" />
      </View>
    </TouchableOpacity>
  );
}
