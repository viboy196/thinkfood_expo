import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";
import { useAppSelector } from "../../redux/store/hooks";
import Address from "../../components/Address";
import {
  currencyFormat,
  numActive,
  sumPriceCart,
} from "../../utils/helper/HelperFunc";
import Layout from "../../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import PaymentItem from "./PaymentItem";
import { RootStackScreenProps } from "../../navigation/types";

export default function Payment(nav: RootStackScreenProps<"Payment">) {
  const { listCartItem, id, idKhachHang } = useAppSelector((s) => s.cart);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Address nav={nav} />
        {listCartItem &&
          listCartItem
            .filter((x) => x.chon === true)
            .map((item, index) => (
              <PaymentItem item={item} key={`itemCart_${index}`} />
            ))}

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            padding: 10,

            marginTop: 5,
          }}
        >
          <View
            style={{
              flex: 2,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text>nhắn tin</Text>
          </View>

          <View style={{ flex: 5 }}>
            <TextInput
              placeholder="Lưu ý cho người bán ..."
              style={{ textAlign: "right", height: 60 }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            padding: 10,

            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <View
            style={{
              flex: 2,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text>Chọn phương thức thanh toán</Text>
          </View>

          <View
            style={{
              flex: 3,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ textAlign: "right", flex: 1 }}>
              Thanh toán khi nhận hàng
            </Text>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="chevron-forward" />
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          width: "100%",
          height: 60,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 2,
            paddingHorizontal: 10,
            justifyContent: "center",
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 3,
            elevation: 5,
          }}
        >
          <Text style={{ textAlign: "right" }}>Tổng thanh toán</Text>

          <Text style={{ textAlign: "right", fontSize: 8 }}>
            {"( chưa bao gồm phí ship )"}
          </Text>

          <Text style={{ textAlign: "right", color: "tomato" }}>
            {currencyFormat(sumPriceCart(listCartItem))} vnđ
          </Text>
        </View>

        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",

            backgroundColor: "tomato",
          }}
          onPress={() => {}}
        >
          <Text
            style={{ color: "#fff", fontWeight: "500", textAlign: "center" }}
          >
            Đặt hàng
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
