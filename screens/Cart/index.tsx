import { View, Alert, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useAppSelector } from "../../redux/store/hooks";
import Item from "./Item";
import TitleCompenents1 from "../../components/TitleCompenents1";
import { RootStackScreenProps } from "../../navigation/types";
import { goBackNav } from "../../utils/helper/navigationHelper";
import { TypeCartOderItem } from "../../utils/helper/CartOderHelper";
import Layout from "../../constants/Layout";
import { callNumber, currencyFormat } from "../../utils/helper/HelperFunc";
import ApiRequest from "../../utils/api/Main/ApiRequest";
import { ResultStatusCode } from "../../utils/api/apiTypes";
import CartOderCrud from "../../utils/api/CartOderCrud";

export default function Cart({ navigation }: RootStackScreenProps<"Cart">) {
  const { listCartItem, id, idKhachHang } = useAppSelector((s) => s.cart);

  const { token } = useAppSelector((s) => s.auth);

  const numActive = (_listCartItem: TypeCartOderItem[]): number => {
    let No = 0;
    _listCartItem.forEach((x) => {
      if (x.chon === true) {
        No++;
      }
    });
    return No;
  };

  const sumPriceCart = (_listCartItem: TypeCartOderItem[]) => {
    let sum = 0;
    _listCartItem.forEach((x) => {
      if (x.chon === true) {
        sum = sum + x.unitPrice * x.soLuong;
      }
    });
    return sum;
  };
  const Call = () => {
    if (token) {
      ApiRequest.getPhoneActive(token).then((res) => {
        if (res.code === ResultStatusCode.success) {
          const arrPhone = res.result as string[];
          if (arrPhone.length > 0) {
            callNumber(arrPhone[0]);
          } else {
            Alert.alert("Tổng đài viên đang bận liên hệ sau");
          }
        } else {
          Alert.alert("Tổng đài viên đang bận liên hệ sau");
        }
      });
    }
  };
  const updateCart = () => {
    CartOderCrud.Update(token, {
      id: id,
      idKhachHang: idKhachHang,
      listCart: listCartItem,
    }).then((res) => {
      if (res.code === ResultStatusCode.success) {
        Call();
      }
    });
  };
  const onPayment = () => {
    navigation.navigate('Payment')
  }

  return (
    <View style={{ width: Layout.window.width, height: Layout.window.height }}>
      <TitleCompenents1
        onGoBack={() => {
          goBackNav(navigation);
        }}
        title={"Giỏ hàng"}
      />
      <ScrollView>
        {listCartItem &&
          listCartItem.map((item, index) => (
            <Item item={item} key={`itemCart_${index}`} />
          ))}
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 20,
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
          onPress={updateCart}
        >
          <Text
            style={{ color: "#fff", fontWeight: "500", textAlign: "center" }}
          >
            Mua Hàng {`(${numActive(listCartItem)})`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
