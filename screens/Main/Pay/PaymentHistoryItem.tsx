import { View, Text } from "react-native";
import React from "react";
import {
  actionPayment,
  TypePaymentHistory,
} from "../../../utils/helper/PaymentHistoryHelper";
import { currencyFormat } from "../../../utils/helper/HelperFunc";

export default function PaymentHistoryItem(props: {
  item: TypePaymentHistory;
}) {
  return (
    <>
      <View style={{ padding: 10, flexDirection: "row" }}>
        <View style={{ flex: 2, justifyContent: "center" }}>
          <Text>{props.item?.info}</Text>
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text
            style={{
              textAlign: "right",
              color: props.item.action === actionPayment.pay ? "red" : "green",
            }}
          >
            {props.item.action === actionPayment.pay ? "-" : "+"}
            {currencyFormat(props.item?.price)} vnđ
          </Text>
        </View>
      </View>
    </>
  );
}
