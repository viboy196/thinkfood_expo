import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { color1, color2 } from "../../../utils/helper/Color";
import Layout from "../../../constants/Layout";
import { Modal, Portal, Provider } from "react-native-paper";
import { TypeGoiTieuDung } from "../../../utils/helper/GoiTieuDungHelper";
import { useAppSelector } from "../../../redux/store/hooks";
import GoiTieuDungCrud from "../../../utils/api/GoiTieuDungCrud";
import { ResultStatusCode } from "../../../utils/api/apiTypes";
import ApiRequest from "../../../utils/api/Main/ApiRequest";
import {
  RootStackParamList,
  RootStackScreenProps,
} from "../../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { currencyFormat } from "../../../utils/helper/HelperFunc";

export default function Recharge({
  navigation,
}: RootStackScreenProps<"Recharge">) {
  const [listGoiTieuDung, setListGoiTieuDung] = useState<TypeGoiTieuDung[]>();
  const { token } = useAppSelector((s) => s.auth);

  const [visible, setVisible] = React.useState<boolean>(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [selectItem, setselectItem] = useState<TypeGoiTieuDung>();
  useEffect(() => {
    GoiTieuDungCrud.getAllPublish().then((res) => {
      if (res.code === ResultStatusCode.success) {
        setListGoiTieuDung(res.result);
      } else {
        Alert.alert("lỗi", res.errorMessage);
      }
    });
  }, []);
  const onPressBuy = () => {
    if (token && selectItem)
      ApiRequest.AleyPayBuyGoiTieuDung(token, selectItem.id).then((res) => {
        console.log("AleyPayBuyGoiTieuDung", res.result);

        if (res.code === ResultStatusCode.success) {
          navigation.navigate("WebView", {
            title: "Thanh toán",
            url: res.result.checkoutUrl,
          });
        }
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: color1, padding: 10 }}>
        <Text
          style={{
            color: "#fff",
            paddingVertical: 10,
            paddingHorizontal: 5,
            fontSize: 16,
            textAlign: "center",
          }}
        >
          GÓI TIÊU DÙNG
        </Text>
        <FlatList
          data={listGoiTieuDung}
          numColumns={3}
          renderItem={({ item, index }) => (
            <ItemGoiTieuDung
              item={item}
              showModal={showModal}
              key={index}
              idSelect={selectItem?.id}
              setselectItem={setselectItem}
            />
          )}
        />
      </View>
      <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
        {selectItem && (
          <>
            <Text
              style={{
                textAlign: "center",
                color: color1,
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              {"GÓI"} {selectItem?.name.toUpperCase()}
            </Text>

            <Text style={{ marginBottom: 5, textAlign: "center" }}>
              {selectItem?.info}
            </Text>
            <Text
              style={{
                marginTop: 20,
                marginBottom: 10,
                fontSize: 32,
                color: color1,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {currencyFormat(selectItem?.price)} đ
            </Text>

            <View style={{ flex: 1 }} />
            <TouchableOpacity
              onPress={onPressBuy}
              style={{ padding: 10, backgroundColor: color2, borderRadius: 8 }}
            >
              <Text style={{ textAlign: "center", color: "#fff" }}>
                Mua Gói
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      {selectItem && visible === true && (
        <ModalCredit
          visible={visible}
          hideModal={hideModal}
          data={selectItem}
          navigation={navigation}
        />
      )}
    </View>
  );
}

const ItemGoiTieuDung = (props: {
  item: TypeGoiTieuDung;
  idSelect?: string;
  showModal: () => void;
  setselectItem: React.Dispatch<React.SetStateAction<TypeGoiTieuDung>>;
}) => {
  return (
    <View
      style={{
        width: (Layout.window.width - 20) / 3,
        height: 100,
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          margin: 5,
          padding: 10,
          borderRadius: 8,
          borderWidth: 2,
          borderColor: "#fff",
          backgroundColor: props.idSelect === props.item.id ? "#fff" : color1,
        }}
        onPress={() => {
          console.log("click");
          // props.showModal();
          props.setselectItem(props.item);
        }}
      >
        <Text
          style={{
            color: props.idSelect === props.item.id ? color1 : "#fff",
            textAlign: "center",
          }}
        >
          {props.item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ModalCredit = (props: {
  visible: boolean;
  hideModal: () => void;
  data: TypeGoiTieuDung;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "Recharge",
    undefined
  >;
}) => {
  const containerStyle = { backgroundColor: "white", padding: 20 };
  const { token } = useAppSelector((s) => s.auth);
  const onPressBuy = () => {
    if (token)
      ApiRequest.AleyPayBuyGoiTieuDung(token, props.data.id).then((res) => {
        console.log("AleyPayBuyGoiTieuDung", res.result);

        if (res.code === ResultStatusCode.success) {
          props.navigation.navigate("WebView", {
            title: "Thanh toán",
            url: res.result.checkoutUrl,
          });

          props.hideModal();
        }
      });
  };
  return (
    <Provider>
      <Portal>
        <Modal
          visible={props.visible}
          onDismiss={props.hideModal}
          contentContainerStyle={containerStyle}
        >
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "600",
                color: color2,
              }}
            >
              {props.data?.name}
            </Text>
          </View>

          <View style={{ flexDirection: "row", padding: 10 }}>
            <Text>Giá : {currencyFormat(props.data?.price)} đ</Text>
          </View>

          <TouchableOpacity
            onPress={onPressBuy}
            style={{ padding: 10, backgroundColor: color2, borderRadius: 8 }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>
              Thanh Toán
            </Text>
          </TouchableOpacity>
        </Modal>
      </Portal>
    </Provider>
  );
};
