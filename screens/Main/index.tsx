import {
  View,
  Text,
  ImageSourcePropType,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../../navigation/types";
import useColorScheme from "../../hooks/useColorScheme";
import Colors, { tintColorLight } from "../../constants/Colors";
import TabHome from "./TabHome";
import TabNetwork from "./TabNetwork";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import IonsIcon from "@expo/vector-icons/build/Ionicons";

import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { logOut, setStateAuth } from "../../redux/features/auth/authSlices";
import TabShare from "./TabShare";
import ApiRequest from "../../utils/api/Main/ApiRequest";
import { ResultStatusCode } from "../../utils/api/apiTypes";
import { TypeAccount } from "../../utils/helper/AccountHelper";
import CartOderCrud from "../../utils/api/CartOderCrud";
import { setCartOderState } from "../../redux/features/CartOderSlices";
import DonGiaCrud from "../../utils/api/DonGiaCrud";
import { setDonGiaState } from "../../redux/features/DonGiaOderSlices";
import DoAnCrud from "../../utils/api/DoAnCrud";
import { setDoAnState } from "../../redux/features/DoAnSlices";
import ThucPhamTieuChuanCrud from "../../utils/api/ThucPhamTieuChuanCrud";
import { setThucPhamTieuChuanState } from "../../redux/features/ThucPhamTieuChuanSlices";
import DonViDoCrud from "../../utils/api/DonViDoCrud";
import { setDonViDoState } from "../../redux/features/DonViDoSlices";
import {
  setSanPhamViewState,
  TypeDonGiaView,
} from "../../redux/features/SanPhamViewSlices";
import TabInfo from "./TabInfo";
import Relationship from "./Relationship";
import TabPay from "./Pay";
import { getMaginTopByDevice } from "../../utils/helper/HelperFunc";
import DiemAmThucCrud from "../../utils/api/DiemAmThucCrud";
import { setDiemAmThucState } from "../../redux/features/DiemAmThucSlices";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function MainScreen() {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const { token, accountDetail } = useAppSelector((s) => s.auth);
  const { listDonGia } = useAppSelector((s) => s.donGia);

  const { listDoAn } = useAppSelector((s) => s.doAn);

  const { listThucPhamTieuChuan } = useAppSelector((s) => s.thucPhamTieuChuan);

  const { listDonViDo } = useAppSelector((s) => s.donViDo);

  const { listDiemAmThuc } = useAppSelector((s) => s.DiemAmThuc);

  useEffect(() => {
    if (token) {
      ApiRequest.GetDetailUser(token)
        .then((res) => {
          if (res.code === ResultStatusCode.success) {
            const dt = res.result as TypeAccount;
            console.log(dt);
            dispatch(
              setStateAuth({
                input: {
                  loading: "succeeded",
                  accountDetail: res.result,
                  token: token,
                },
              })
            );
          }
        })
        .catch(() => {
          dispatch(logOut());
        });
    }
  }, [token]);
  useEffect(() => {
    if (token && accountDetail?.id) {
      CartOderCrud.detailByIdKhachHang(accountDetail?.id, token).then((res) => {
        if (res.code === ResultStatusCode.success)
          dispatch(
            setCartOderState({
              id: res.result.id,
              listCartItem: res.result.listCart,
              idKhachHang: res.result.idKhachHang,
            })
          );
      });
    }
  }, [token, accountDetail?.id]);
  useEffect(() => {
    if (token) {
      DonGiaCrud.GetAll(token).then((res) => {
        if (res.code === ResultStatusCode.success) {
          dispatch(setDonGiaState({ listDonGia: res.result }));
        }
      });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      DoAnCrud.GetAll(token).then((res) => {
        if (res.code === ResultStatusCode.success) {
          dispatch(setDoAnState({ listDoAn: res.result }));
        }
      });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      DiemAmThucCrud.GetAll(token).then((res) => {
        if (res.code === ResultStatusCode.success) {
          dispatch(setDiemAmThucState({ listDiemAmThuc: res.result }));
        }
      });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      ThucPhamTieuChuanCrud.GetAll(token).then((res) => {
        if (res.code === ResultStatusCode.success) {
          dispatch(
            setThucPhamTieuChuanState({ listThucPhamTieuChuan: res.result })
          );
        }
      });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      DonViDoCrud.GetAll(token).then((res) => {
        if (res.code === ResultStatusCode.success) {
          dispatch(setDonViDoState({ listDonViDo: res.result }));
        }
      });
    }
  }, [token]);

  useEffect(() => {
    if (
      listDonGia &&
      listDoAn &&
      listThucPhamTieuChuan &&
      listDonViDo &&
      listDiemAmThuc
    ) {
      let listSanPhamViewItem: TypeDonGiaView[] = [];
      listDonGia.forEach((dongiaItem) => {
        let sanPhamViewItem: TypeDonGiaView = { ...dongiaItem };
        if (sanPhamViewItem.idDoAn) {
          let _doAn = listDoAn.find((x) => x.id === sanPhamViewItem.idDoAn);
          if (_doAn) {
            sanPhamViewItem.avartarUri = _doAn.avartarUri;
            sanPhamViewItem.listMediaUri = _doAn.listMediaUri;
            sanPhamViewItem.name = _doAn.name;
            sanPhamViewItem.info = _doAn.info;
            sanPhamViewItem.idDauBep = _doAn.idDauBep;
            sanPhamViewItem.isBook = _doAn.isBook;
            sanPhamViewItem.timeBook = _doAn.timeBook;
            sanPhamViewItem.status = _doAn.status;
            sanPhamViewItem.activeTime = _doAn.activeTime;
          }
        }
        if (sanPhamViewItem.idThucPhamTieuChuan) {
          let _thucPhamTieuChuan = listThucPhamTieuChuan.find(
            (x) => x.id === sanPhamViewItem.idThucPhamTieuChuan
          );
          if (_thucPhamTieuChuan) {
            sanPhamViewItem.avartarUri = _thucPhamTieuChuan.avartarUri;
            sanPhamViewItem.listMediaUri = _thucPhamTieuChuan.listMediaUri;
            sanPhamViewItem.name = _thucPhamTieuChuan.name;
            sanPhamViewItem.info = _thucPhamTieuChuan.info;
          }
        }

        if (sanPhamViewItem.idDonViDo) {
          let _donViDo = listDonViDo.find(
            (x) => x.id === sanPhamViewItem.idDonViDo
          );
          if (_donViDo) {
            sanPhamViewItem.nameDonViDo = _donViDo.name;
          }
        }

        if (sanPhamViewItem.idDiemAmThuc) {
          let _diemAmThuc = listDiemAmThuc.find(
            (x) => x.id === sanPhamViewItem.idDiemAmThuc
          );
          if (_diemAmThuc) {
            sanPhamViewItem.nameDiemAmThuc = _diemAmThuc.name;
          }
        }

        listSanPhamViewItem.push(sanPhamViewItem);
      });
      if (listSanPhamViewItem.length > 0) {
        dispatch(setSanPhamViewState({ listSanPhamView: listSanPhamViewItem }));
      }
    }
  }, [listDonGia, listDoAn, listThucPhamTieuChuan, listDonViDo]);
  return (
    <BottomTab.Navigator
      initialRouteName="TabHome"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="TabHome"
        component={TabHome}
        options={{
          title: "Trang chủ",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="home"
              color={color}
              imageSource={require("../../assets/images/thinkfood/menu/homepage.png")}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="TabPay"
        component={TabPay}
        options={{
          title: "Ví",
          headerShown: false,

          tabBarIcon: ({ color }) => <TabBarIcon name="wallet" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabShare"
        component={TabShare}
        options={{
          title: "Giới Thiệu",
          headerShown: true,
          header: () => <HeaderShow name={"Giới thiêu ThinkFood với bạn bè"} />,

          tabBarIcon: ({ color }) => <TabBarIcon name="people" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabInfo"
        component={TabInfo}
        options={{
          title: "Người dùng",
          headerShown: true,
          header: () => (
            <HeaderShow
              name={
                accountDetail?.fullName ? accountDetail.fullName : "Cá nhân"
              }
              logout={() => {
                dispatch(logOut());
              }}
            />
          ),

          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="elementor"
              imageSource={require("../../assets/images/thinkfood/menu/user.png")}
              color={color}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: string;
  color: string;
  imageSource?: ImageSourcePropType;
  size?: number;
}) {
  if (props.imageSource) {
    return (
      <Image
        source={props.imageSource}
        resizeMode="cover"
        style={{
          width: props.size ? props.size : 24,
          height: props.size ? props.size : 24,
          tintColor: props.color,
        }}
      />
    );
  }
  // @ts-ignore
  return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />;
}

export function HeaderShow(props: {
  name: string;
  logout?: () => void;
  goBack?: () => void;
}) {
  return (
    <View style={styles.header}>
      {props.goBack && (
        <TouchableOpacity
          onPress={props.goBack}
          style={{ paddingHorizontal: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color={"#fff"} />
        </TouchableOpacity>
      )}
      <Text
        style={{
          marginLeft: props.goBack !== undefined ? 10 : 30,
          fontSize: 22,
          fontWeight: "700",
          color: "#fff",
        }}
      >
        {props.name}
      </Text>
      <View style={{ flex: 1 }} />
      {props.logout && (
        <TouchableOpacity style={{ marginRight: 20 }} onPress={props.logout}>
          <IonsIcon color="#fff" name="log-out-outline" size={30} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarIconView: {
    width: 30,
    height: 30,
  },
  itemImage: {
    width: 30,
    height: 30,
  },
  header: {
    backgroundColor: tintColorLight,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10 + getMaginTopByDevice(),
    paddingBottom: 20,
  },
  icon: { marginBottom: -3 },
  notificationNumView: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 15,
    height: 15,
    backgroundColor: "red",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationNumText: { fontSize: 10, fontWeight: "bold", color: "#fff" },
});
