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
import { color1 } from "../utils/helper/Color";
export default function Address(props: {
  nav: RootStackScreenProps<"Payment">;
  address:TypeAddress
}) {
 
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

        {props.address && (
          <>
            <Text>{getStringAddress(props.address)}</Text>
            <Text style={{ color: color1 }}>{props.address.type}</Text>
          </>
        )}
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Ionicons name="chevron-forward" />
      </View>
    </TouchableOpacity>
  );
}
