import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/store/hooks";
import { ResultStatusCode } from "../../../utils/api/apiTypes";
import DonhangHistoryItem from "./DonhangHistoryItem";
import DonHangCrud from "../../../utils/api/DonHangCrud";
import { TypeDonHang } from "../../../utils/helper/DonHangHelper";

export default function DonHangHistory() {
  const [state, setState] = useState<TypeDonHang[]>();
  const { token, accountDetail } = useAppSelector((s) => s.auth);
  useEffect(() => {
    if (token) {
      DonHangCrud.getAllByIdKhachHang(accountDetail.id, token).then((res) => {
        if (res.code === ResultStatusCode.success) {
          setState(res.result);
        }
      });
    }
  }, [token]);
  return (
    <ScrollView>
      {state &&
        state
          .reverse()
          .map((item) => (
            <DonhangHistoryItem
              item={item}
              key={"PaymentHistoryItem" + item?.id}
            />
          ))}
    </ScrollView>
  );
}
