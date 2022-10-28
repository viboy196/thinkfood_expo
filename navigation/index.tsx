/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "./types";
import LinkingConfiguration from "./LinkingConfiguration";
import MainScreen, { HeaderShow } from "../screens/Main";
import LoginScreen from "../screens/Login/LoginScreen";

import { useAppSelector } from "../redux/store/hooks";
import FoodType from "../screens/FoodType";
import ListFood from "../screens/ListFood";
import FoodDetail from "../screens/FoodDetail";
import FoodView from "../screens/FoodView";
import CartView from "../screens/Cart";
import SearchFoodView from "../screens/SearchFood";
import PaymentHistory from "../screens/Main/TabInfo/OderHistory";
import PersoInfo from "../screens/Main/TabInfo/PersoInfo";
import ServicePack from "../screens/Main/TabInfo/ServicePack";
import TabInfo from "../screens/Main/TabInfo";
import TabNotification from "../screens/Main/TabNotification";
import Recharge from "../screens/Main/Pay/Recharge";
import WebViewScreen from "../screens/WebView";
import PaymentScreen from "../screens/Payment";
import AddressScreen from "../screens/Address";
import AddAddressScreen from "../screens/Address/addAddress";
import CheftScreen from "../screens/Cheft/index";

import { color1 } from "../utils/helper/Color";
import UpdateAddress from "../screens/Address/UpdateAddress";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const auth = useAppSelector((state) => state.auth);
  console.log("auth", auth);

  if (auth.token)
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="LoaiGiaoDich"
          component={FoodType}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ListDonGia"
          component={ListFood}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="FoodDeTail"
          component={FoodDetail}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="FoodView"
          component={FoodView}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Cart"
          component={CartView}
          options={{
            headerShown: true,
            header: (props) => (
              <HeaderShow
                goBack={() => {
                  if (props.navigation.canGoBack()) {
                    props.navigation.goBack();
                  }
                }}
                name={"Giỏ hàng"}
              />
            ),
          }}
        />

        <Stack.Screen
          name="SearchDonGia"
          component={SearchFoodView}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PaymentHistory"
          component={PaymentHistory}
          options={{
            headerShown: true,
            header: (props) => (
              <HeaderShow
                goBack={() => {
                  if (props.navigation.canGoBack()) {
                    props.navigation.goBack();
                  }
                }}
                name={
                  auth.accountDetail?.fullName
                    ? auth.accountDetail.fullName
                    : "Lịch sử  thanh toán"
                }
              />
            ),
          }}
        />

        <Stack.Screen
          name="PersoInfo"
          component={PersoInfo}
          options={{
            headerShown: true,
            header: (props) => (
              <HeaderShow
                goBack={() => {
                  if (props.navigation.canGoBack()) {
                    props.navigation.goBack();
                  }
                }}
                name={
                  auth.accountDetail?.fullName
                    ? auth.accountDetail.fullName
                    : "Thông tin cá nhân"
                }
              />
            ),
          }}
        />

        <Stack.Screen
          name="ServicePack"
          component={ServicePack}
          options={{
            headerShown: true,
            header: (props) => (
              <HeaderShow
                goBack={() => {
                  if (props.navigation.canGoBack()) {
                    props.navigation.goBack();
                  }
                }}
                name={
                  auth.accountDetail?.fullName
                    ? auth.accountDetail.fullName
                    : "Gói dịch vụ"
                }
              />
            ),
          }}
        />

        <Stack.Screen
          name="introduce"
          component={TabNotification}
          options={{
            headerShown: true,
            header: (props) => (
              <HeaderShow
                goBack={() => {
                  if (props.navigation.canGoBack()) {
                    props.navigation.goBack();
                  }
                }}
                name={"Giới thiệu"}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Recharge"
          component={Recharge}
          options={{
            headerShown: true,
            header: (props) => (
              <HeaderShow
                goBack={() => {
                  if (props.navigation.canGoBack()) {
                    props.navigation.goBack();
                  }
                }}
                name={"Mua Gói Tiêu dùng"}
              />
            ),
          }}
        />
        <Stack.Screen
          name="WebView"
          component={WebViewScreen}
          options={({ route }) => ({
            title: `${route.params.title}`,
            headerStyle: { backgroundColor: color1 },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          })}
        />

        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={({ route }) => ({
            headerShown: true,
            header: (props) => (
              <HeaderShow
                goBack={() => {
                  if (props.navigation.canGoBack()) {
                    props.navigation.goBack();
                  }
                }}
                name={"Thanh Toán"}
              />
            ),
          })}
        />

        <Stack.Screen
          name="Address"
          component={AddressScreen}
          options={({ route }) => ({
            headerShown: true,
            header: (props) => (
              <HeaderShow
                goBack={() => {
                  if (props.navigation.canGoBack()) {
                    props.navigation.goBack();
                  }
                }}
                name={"Chọn địa chỉ nhận hàng"}
              />
            ),
          })}
        />

        <Stack.Screen
          name="AddAddress"
          component={AddAddressScreen}
          options={({ route }) => ({
            headerShown: true,
            header: (props) => (
              <HeaderShow
                goBack={() => {
                  if (props.navigation.canGoBack()) {
                    props.navigation.goBack();
                  }
                }}
                name={"Thêm Mới địa chỉ"}
              />
            ),
          })}
        />

        <Stack.Screen
          name="UpdateAddress"
          component={UpdateAddress}
          options={({ route }) => ({
            headerShown: true,
            header: (props) => (
              <HeaderShow
                goBack={() => {
                  if (props.navigation.canGoBack()) {
                    props.navigation.goBack();
                  }
                }}
                name={"Cập nhật địa chỉ"}
              />
            ),
          })}
        />

        <Stack.Screen
          name="cheft"
          component={CheftScreen}
          options={({ route }) => ({
            headerShown: false,
          })}
        />
      </Stack.Navigator>
    );
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
