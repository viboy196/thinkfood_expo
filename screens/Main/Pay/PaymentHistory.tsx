import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import PaymentHistoryItem from "./PaymentHistoryItem";
import { useAppSelector } from "../../../redux/store/hooks";
import PaymentHistoryCrud from "../../../utils/api/PaymentHistoryCrud";
import { ResultStatusCode } from "../../../utils/api/apiTypes";
import { TypePaymentHistory } from "../../../utils/helper/PaymentHistoryHelper";
import { RootTabScreenProps } from "../../../navigation/types";

export default function PaymentHistory(props: {
  nav: RootTabScreenProps<"TabPay">;
}) {
  const { token } = useAppSelector((s) => s.auth);
  const [listDataPaymentHistory, setListDataPaymentHistory] =
    useState<TypePaymentHistory[]>();

  const fetchData = () => {
    if (token) {
      PaymentHistoryCrud.getAllByUser(token).then((res) => {
        if (res.code === ResultStatusCode.success) {
          setListDataPaymentHistory(res.result);
        }
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
    <>
      <Text style={{ textAlign: "center", padding: 20 }}>
        Lịch sử Thanh toán
      </Text>
      <FlatList
        data={listDataPaymentHistory}
        renderItem={({ item }) => (
          <PaymentHistoryItem item={item} key={item.id} />
        )}
      />
      
    </>
  );
}
