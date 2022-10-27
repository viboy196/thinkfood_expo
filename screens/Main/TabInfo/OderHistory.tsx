import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { TypeOder } from "../../../utils/helper/OderHelper";
import OderCrud from "../../../utils/api/OderCrud";
import { useAppSelector } from "../../../redux/store/hooks";
import { ResultStatusCode } from "../../../utils/api/apiTypes";
import PaymentHistoryItem from "./OderHistoryItem";

export default function OderHistory() {
  const [state, setState] = useState<TypeOder[]>();
  const { token } = useAppSelector((s) => s.auth);
  useEffect(() => {
    if (token) {
      OderCrud.OderListByAuth(token).then((res) => {
        if (res.code === ResultStatusCode.success) {
          setState(res.result);
        }
      });
    }
  }, [token]);
  return (
    <View>
      {state &&
        state.map((item) => (
          <PaymentHistoryItem
            item={item}
            key={"PaymentHistoryItem" + item?.id}
          />
        ))}
    </View>
  );
}
