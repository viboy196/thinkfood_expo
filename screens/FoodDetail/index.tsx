import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
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
import {
  callNumber,
  currencyFormat,
  getMaginTopByDevice,
  getStatusDoAn,
} from "../../utils/helper/HelperFunc";
import ImageSlider from "../../components/items/ImageSwiper";
import { useAppSelector } from "../../redux/store/hooks";
import ApiRequest from "../../utils/api/Main/ApiRequest";
import CartOderCrud from "../../utils/api/CartOderCrud";
import { useDispatch } from "react-redux";
import { setCartOderState } from "../../redux/features/CartOderSlices";
import { TypeDauBep } from "../../utils/helper/DauBepHelper";
import DauBepCrud from "../../utils/api/DauBepCrud";
import { color2 } from "../../utils/helper/Color";

export default function FoodDetail({
  navigation,
  route,
}: RootStackScreenProps<"FoodDeTail">) {
  const item = route.params;
  console.log("itemdetail", item);

  const [numCount, setNumCount] = useState<number>(1);
  const [cheft, setCheft] = useState<TypeDauBep>();

  const { token, accountDetail } = useAppSelector((s) => s.auth);
  const distpatch = useDispatch();

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
  const addCart = () => {
    if (accountDetail?.id && token)
      CartOderCrud.addItem(accountDetail?.id, token, {
        chon: true,
        idDonGia: item.id,
        soLuong: numCount,
        unitPrice: item.unitPrice,
      }).then((res) => {
        if (res.code === ResultStatusCode.success) {
          Alert.alert("thêm vào giỏ hàng thành công");
          distpatch(
            setCartOderState({
              id: res.result.id,
              listCartItem: res.result.listCart,
              idKhachHang: res.result.idKhachHang,
            })
          );
        }
      });
  };
  useEffect(() => {
    // if (item.idDauBep) {
    //   console.log("idDauBep", item.idDauBep);
    // }
    if (item.idDauBep && token) {
      DauBepCrud.getDetail(item.idDauBep, token).then((res) => {
        if (res.code === ResultStatusCode.success) {
          setCheft(res.result);
        }
      });
    }
  }, [item.idDauBep]);
  return (
    <View style={{ flex: 1 }}>
      {item?.listMediaUri && (
        <ImageSlider
          dauBep={cheft}
          onClickDauBep={() => {
            if (cheft) {
              navigation.navigate("cheft", { data: cheft });
            }
          }}
          onClickCart={() => {
            navigation.navigate("Cart");
          }}
          ImageArrayUri={[...item?.listMediaUri, item.avartarUri]}
          isBook={item.isBook}
          timeBook={item.timeBook}
          status={item.status}
          activeTime={item.activeTime}
        />
      )}
      <TouchableOpacity
        style={{
          width: 64,
          height: 64,
          position: "absolute",
          top: 10 + getMaginTopByDevice(),
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
          flexDirection: "column",
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        <View style={{ paddingRight: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {item?.name ? item?.name : ""}
          </Text>
        </View>
        <View style={{ marginRight: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {item.unitPrice ? currencyFormat(item.unitPrice) : ""}
            {" vnđ/"}
            {item?.nameDonViDo}
          </Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Giới thiệu</Text>
          <Text>{item?.info}</Text>
        </View>
      </ScrollView>
      {getStatusDoAn(item.status, item.activeTime).backgroundColor ===
        color2 && (
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
                style={{
                  textAlign: "center",
                  fontSize: 28,
                  fontWeight: "bold",
                }}
              >
                -
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 28,
                  fontWeight: "bold",
                }}
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
                style={{
                  textAlign: "center",
                  fontSize: 28,
                  fontWeight: "bold",
                }}
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
            <TouchableOpacity onPress={Call}>
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
            <TouchableOpacity onPress={addCart}>
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
      )}
    </View>
  );
}
