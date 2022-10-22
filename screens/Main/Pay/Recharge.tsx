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
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: color1, padding: 10 }}>
        <Text
          style={{ color: "#fff", paddingVertical: 10, paddingHorizontal: 5 }}
        >
          {" "}
          chọn gói mua
        </Text>
        <FlatList
          data={listGoiTieuDung}
          numColumns={3}
          renderItem={({ item, index }) => (
            <ItemGoiTieuDung
              item={item}
              showModal={showModal}
              key={index}
              setselectItem={setselectItem}
            />
          )}
        />
      </View>

      <ModalCredit
        visible={visible}
        hideModal={hideModal}
        data={selectItem}
        navigation={navigation}
      />
    </View>
  );
}

const ItemGoiTieuDung = (props: {
  item: TypeGoiTieuDung;
  showModal: () => void;
  setselectItem: React.Dispatch<React.SetStateAction<TypeGoiTieuDung>>;
}) => {
  return (
    <View
      style={{
        width: (Layout.window.width - 20) / 3,
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
        }}
        onPress={() => {
          console.log("click");
          props.showModal();
          props.setselectItem(props.item);
        }}
      >
        <Text style={{ color: "#fff" }}>{props.item.name}</Text>
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
      ApiRequest.OnePayBuyGoiTieuDung(token, props.data.id).then((res) => {
        if (res.code === ResultStatusCode.success) {
          props.navigation.navigate("WebView", {
            title: "Thanh Toán",
            url: res.result,
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
              Thanh Toán
            </Text>
          </View>
          <View style={{ flexDirection: "row", padding: 10 }}>
            <Text>Gói : {props.data?.name}</Text>
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
