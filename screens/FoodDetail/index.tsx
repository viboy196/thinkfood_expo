import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Layout from "../../constants/Layout";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { tintColorLight } from "../../constants/Colors";
import { RootStackScreenProps } from "../../navigation/types";
import DoAnCrud from "../../utils/api/DoAnCrud";
import { ResultStatusCode } from "../../utils/api/apiTypes";
import ThucPhamTieuChuanCrud from "../../utils/api/ThucPhamTieuChuanCrud";
import DonViDoCrud from "../../utils/api/DonViDoCrud";
import { UrlHelper } from "../../utils/helper/UrlHelper";
import { callNumber, currencyFormat } from "../../utils/helper/HelperFunc";
import ImageSlider from "../../components/items/ImageSwiper";
import { useAppSelector } from "../../redux/store/hooks";
import ApiRequest from "../../utils/api/Main/ApiRequest";

export default function FoodDetail({
  navigation,
  route,
}: RootStackScreenProps<"FoodDeTail">) {
  const item = route.params;
  const [numCount, setNumCount] = useState<number>(1);

  const { token } = useAppSelector((s) => s.auth);
  const [listOnCall, setListOnCall] = useState<string[]>();

  const [state, setState] = useState<{
    name?: string;
    link?: string;
    avatarUri?: string;
    nameDonViDo?: string;
    listMediaUri?: string[];
    info?: string;
  }>();
  useEffect(() => {
    if (item.idDoAn) {
      DoAnCrud.getDetailPublish(item.idDoAn).then((res) => {
        if (res.code === ResultStatusCode.success) {
          // @ts-ignore
          setState((old) => {
            return {
              ...old,
              avatarUri: res.result.avartarUri,
              listMediaUri: res.result.listMediaUri,
              name: res.result.name,
              info: res.result.info,
              link: `/action/DoAn/${res.result.id}`,
            };
          });
        }
      });
    }
    if (item.idThucPhamTieuChuan) {
      ThucPhamTieuChuanCrud.getDetailPublish(item.idThucPhamTieuChuan).then(
        (res) => {
          if (res.code === ResultStatusCode.success) {
            // @ts-ignore
            setState((old) => {
              return {
                ...old,
                avatarUri: res.result.avartarUri,
                listMediaUri: res.result.listMediaUri,
                name: res.result.name,
                link: `/action/ThucPhamTieuChuan/${res.result.id}`,
              };
            });
          }
        }
      );
    }
    if (item.idDonViDo) {
      DonViDoCrud.getDetailPublish(item.idDonViDo).then((res) => {
        if (res.code === ResultStatusCode.success) {
          // @ts-ignore
          setState((old) => {
            return {
              ...old,
              nameDonViDo: res.result.name,
            };
          });
        }
      });
    }
  }, [item.idDoAn, item.idDonViDo, item.idThucPhamTieuChuan]);

  useEffect(() => {
    if (token) {
      ApiRequest.getPhoneActive(token).then((res) => {
        if (res.code === ResultStatusCode.success) {
          setListOnCall(res.result);
        }
      });
    }
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {/* <Image
        source={
          state?.avatarUri
            ? {
                uri: UrlHelper.urlFile + state?.avatarUri,
              }
            : require("../../assets/images/logo/thinkfoodbg.png")
        }
        resizeMode="cover"
        style={{
          width: Layout.window.width,
          height: 180,
        }}
      /> */}
      {state?.listMediaUri && state.avatarUri && (
        <ImageSlider ImageArrayUri={[...state?.listMediaUri]} />
      )}
      <TouchableOpacity
        style={{
          width: 64,
          height: 64,
          position: "absolute",
          top: 10,
          left: 5,
        }}
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        }}
      >
        <Ionicons name="arrow-back" size={32} color={tintColorLight} />
      </TouchableOpacity>
      {/* thông tin tên giá , giá khuyến mãi */}
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        <View style={{ flex: 1, paddingRight: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {state?.name ? state?.name : ""}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="pricetag" size={12} color={tintColorLight} />
            <Text style={{ paddingLeft: 5 }}>Giảm {30}%</Text>
          </View>
        </View>
        <View style={{ marginRight: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {item.unitPrice ? currencyFormat(item.unitPrice) : ""}
            {" vnđ/"}
            {state?.nameDonViDo}
          </Text>
          <Text
            style={{
              textDecorationLine: "line-through",
              color: "#bebebe",
              textAlign: "right",
            }}
          >
            {item.unitPrice ? currencyFormat(item.unitPrice * 1.425) : "0"}
            {" vnđ/"}
            {state?.nameDonViDo}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Giới thiệu</Text>
        <Text>{state?.info}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            borderWidth: 2,
            borderColor: "#bebebe",
            padding: 10,
            borderRadius: 100,
            margin: 10,
          }}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              if (numCount > 1) setNumCount((old) => old - 1);
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 28, fontWeight: "bold" }}
            >
              -
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text
              style={{ textAlign: "center", fontSize: 28, fontWeight: "bold" }}
            >
              {numCount}
            </Text>
          </View>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              setNumCount((old) => old + 1);
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 28, fontWeight: "bold" }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            height: 110,
            justifyContent: "flex-end",
            marginRight: 5,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (listOnCall) callNumber(listOnCall[0]);
              else {
                Alert.alert("các số máy trực đang tạm nghỉ");
              }
            }}
          >
            <View
              style={{
                backgroundColor: "#00b454",
                padding: 10,
                marginTop: 5,
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 5,
                height: 50,
              }}
            >
              <View>
                <Ionicons name="call" color={"#fff"} size={24} />
              </View>
              <Text
                style={{
                  padding: 4,
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                Mua Ngay
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "#00b454",
                padding: 10,
                marginTop: 5,
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 5,
                height: 50,
              }}
            >
              <View>
                <Ionicons name="add-circle" color={"#fff"} size={24} />
              </View>
              <Text
                style={{
                  padding: 4,
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                Thêm giỏ hàng
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
