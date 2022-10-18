import { View, Text, Image } from "react-native";
import React from "react";
import { TypeOder } from "../../../utils/helper/OderHelper";
import { useAppSelector } from "../../../redux/store/hooks";

export default function PaymentHistoryItem(props: { item: TypeOder }) {
    const {} = useAppSelector(s => s.)
  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 10,
        marginVertical: 5,
      }}
    >
      <View style={{ flexDirection: "row", paddingVertical: 10 }}>
        <Text>THINKFOOD</Text>
        <View style={{ flex: 1 }} />
        <Text>Hoàn Thành</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#aeaeae",
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={require("../../../assets/images/logo/thinkfoodlogo.png")}
            style={{ width: 40, height: 40 }}
          />
        </View>

        <View style={{ flex: 4 }}>
          <Text>Cá kho tộ</Text>
          <View style={{ flexDirection: "row" }}>
            <Text>Thơm Ngon tới giọt cuối cùng</Text>
            <View style={{ flex: 1 }} />
            <Text>x2</Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row", paddingTop: 10 }}>
        <Text>2 sản phẩm</Text>
        <View style={{ flex: 1 }} />
        <Text>Thành tiền : đ 44.500</Text>
      </View>
    </View>
  );
}
