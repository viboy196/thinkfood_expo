import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { color1, color2 } from "../../../utils/helper/Color";
import { useAppSelector } from "../../../redux/store/hooks";
import { RootTabScreenProps } from "../../../navigation/types";
import ApiRequest from "../../../utils/api/Main/ApiRequest";
import { ResultStatusCode } from "../../../utils/api/apiTypes";
import { currencyFormat } from "../../../utils/helper/HelperFunc";
import PaymentHistory from "./PaymentHistory";

export default function TabPay(nav: RootTabScreenProps<"TabPay">) {
  const { navigation } = nav;
  const { fullName } = useAppSelector((s) => s.auth).accountDetail;
  const [balance, setBalance] = useState<number>(0);
  const { token } = useAppSelector((s) => s.auth);
  const fetchData = () => {
    if (token) {
      ApiRequest.getBalance(token).then((res) => {
        if (res.code === ResultStatusCode.success) {
          setBalance(res.result);
        }
      });
    }
  };
  useEffect(() => {
    fetchData();
    const willFocusSubscription = navigation.addListener("focus", () => {
      fetchData();
    });

    return willFocusSubscription;
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: color1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            position: "absolute",
            left: 10,
            top: 10,
            color: "#fff",
            paddingVertical: 10,
          }}
        >
          xin chào {fullName}
        </Text>

        <TouchableOpacity
          style={{
            position: "absolute",
            right: 10,
            top: 10,
            padding: 10,
            backgroundColor: color2,
            borderRadius: 6,
            borderWidth: 2,
            borderColor: "#fff",
          }}
          onPress={() => {
            navigation.navigate("Recharge");
          }}
        >
          <Text style={{ color: "#fff" }}>Mua Gói Tiêu dùng</Text>
        </TouchableOpacity>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#fff", fontSize: 32, fontWeight: "bold" }}>
              {currencyFormat(balance)}
            </Text>
            <Text
              style={{
                color: "#fff",
                position: "absolute",
                bottom: 0,
                right: -25,
              }}
            >
              {" "}
              vnđ
            </Text>
          </View>
          <View>
            <Text style={{ color: "#fff" }}>Số dư hiện tại</Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <PaymentHistory nav={nav} />
      </View>
    </View>
  );
}
