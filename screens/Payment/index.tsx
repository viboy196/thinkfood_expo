import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import Address from "../../components/Address";
import {
  callNumber,
  currencyFormat,
  numActive,
  sumPriceCart,
} from "../../utils/helper/HelperFunc";
import Layout from "../../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import PaymentItem from "./PaymentItem";
import { RootStackScreenProps } from "../../navigation/types";
import {
  TypeDonHang,
  TypeDonHangCreate,
  TypeDonHangItem,
} from "../../utils/helper/DonHangHelper";
import { ModalSelectPttt } from "./ModalSelectPttt";
import { TypeAddress } from "../../utils/helper/AddressHelper";
import AddressCrud from "../../utils/api/AddressCrud";
import { ResultStatusCode } from "../../utils/api/apiTypes";
import { logOut } from "../../redux/features/auth/authSlices";
import DonHangCrud from "../../utils/api/DonHangCrud";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { setCartOderState } from "../../redux/features/CartOderSlices";
import CartOderCrud from "../../utils/api/CartOderCrud";
import ApiRequest from "../../utils/api/Main/ApiRequest";

export default function Payment(nav: RootStackScreenProps<"Payment">) {
  const { listCartItem, id, idKhachHang } = useAppSelector((s) => s.cart);

  const { token, accountDetail } = useAppSelector((s) => s.auth);
  const [input, setInput] = useState<TypeDonHangCreate>({
    hinhThucGiaoHang: 1,
  });
  const [selectPttt, setSelectPttt] = useState<number>(1);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [address, setAddress] = useState<TypeAddress>();

  const dispatch = useAppDispatch();
  const fetchData = () => {
    if (token) {
      AddressCrud.getAddressDefault(token)
        .then((res) => {
          if (res.code === ResultStatusCode.success) {
            setAddress(res.result);
          }
        })
        .catch((error) => {
          dispatch(logOut());
        });
    }
  };
  useEffect(() => {
    fetchData();
    const willFocusSubscription = nav.navigation.addListener("focus", () => {
      fetchData();
    });

    return willFocusSubscription;
  }, []);
  useEffect(() => {
    let listDonHangItem: TypeDonHangItem[] = [];
    listCartItem
      .filter((x) => x.chon === true)
      .forEach((x) => {
        listDonHangItem.push({
          idDonGia: x.idDonGia,
          pttt: selectPttt,
          soLuong: x.soLuong,
          unitPrice: x.unitPrice,
        });
      });

    let typeDonHang: TypeDonHangCreate = {
      active: true,
      idAddress: address?.id,
      hinhThucGiaoHang: 1,
      status: input.status,
      idKhachHang: accountDetail.id,
      listDonHangItem: listDonHangItem,
    };
    setInput(typeDonHang);
  }, [address, accountDetail.id, listCartItem]);
  const removeItemCart = (idDonGia: string) => {
    if (token && accountDetail?.id)
      CartOderCrud.removeItem(accountDetail?.id, idDonGia, token).then(
        (res) => {
          if (res.code === ResultStatusCode.success) {
            dispatch(
              setCartOderState({
                id: res.result.id,
                listCartItem: res.result.listCart,
                idKhachHang: accountDetail?.id,
              })
            );
          } else {
            console.log(res);
          }
        }
      );
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
  const addDonHang = () => {
    if (token) {
      setLoading(true);

      DonHangCrud.Add(token, input)
        .then((res) => {
          setLoading(false);
          if (res.code === ResultStatusCode.success) {
            listCartItem.forEach((x) => {
              removeItemCart(x.idDonGia);
            });
            Alert.alert("Thông báo", "Tạo đơn hàng thành công");
            nav.navigation.goBack();
            // Call();
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <View style={{ flex: 1 }}>
      <Spinner visible={loading} textStyle={{ color: "#fff" }} />
      <ScrollView style={{ flex: 1 }}>
        <Address address={address} nav={nav} />

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
              value={input.status}
              onChangeText={(text) => {
                setInput((old) => {
                  return { ...old, status: text };
                });
              }}
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

          <TouchableOpacity
            style={{
              flex: 3,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={showModal}
          >
            <Text style={{ textAlign: "right", flex: 1 }}>
              {selectPttt === 0 && "Thanh Toán khi nhận hàng"}

              {selectPttt === 1 && "Thanh Toán bằng tài khoản"}
            </Text>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="chevron-forward" />
            </View>
          </TouchableOpacity>
        </View>
        <ModalSelectPttt
          hideModal={hideModal}
          selectPttt={selectPttt}
          setSelectPttt={setSelectPttt}
          visible={visible}
        />
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
          onPress={addDonHang}
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
