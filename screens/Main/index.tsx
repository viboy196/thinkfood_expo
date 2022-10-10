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
import FontAwesome from "@expo/vector-icons/build/FontAwesome";
import IonsIcon from "@expo/vector-icons/build/Ionicons";

import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { logOut, setStateAuth } from "../../redux/features/auth/authSlices";
import TabNotification from "./TabNotification";
import ApiRequest from "../../utils/api/Main/ApiRequest";
import { ResultStatusCode } from "../../utils/api/apiTypes";
import { TypeAccount } from "../../utils/helper/AccountHelper";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function MainScreen() {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((s) => s.auth);
  useEffect(() => {
    if (token)
      ApiRequest.GetDetailUser(token)
        .then((res) => {
          if (res.code === ResultStatusCode.success) {
            const dt = res.result as TypeAccount;
            console.log(dt);
            dispatch(
              setStateAuth({
                input: { loading: "succeeded", accountDetail: res.result },
              })
            );
          }
        })
        .catch(() => {
          dispatch(logOut());
        });
  }, []);
  return (
    <BottomTab.Navigator
      initialRouteName="TabHome"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: {
          height: 75,
        },
      }}
    >
      <BottomTab.Screen
        name="TabHome"
        component={TabHome}
        options={{
          title: "Trang chủ",
          headerShown: false,
          tabBarShowLabel: false,
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
        name="TabNetwork"
        component={TabNetwork}
        options={{
          title: "Tìm kiếm",
          headerShown: true,
          header: () => <HeaderShow name="Bảng tin" />,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="search"
              color={color}
              imageSource={require("../../assets/images/thinkfood/menu/play-button-arrowhead.png")}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabPlus"
        component={TabNetwork}
        options={{
          title: "Tiện ích",
          headerShown: true,
          tabBarShowLabel: false,
          header: () => <HeaderShow name="Đăng bài" />,

          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="elementor"
              imageSource={require("../../assets/images/thinkfood/menu/plus.png")}
              color={color}
              size={54}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabNotification"
        component={TabNotification}
        options={{
          title: "Tiện ích",
          header: () => <HeaderShow name="Thông báo" />,
          tabBarShowLabel: false,

          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="elementor"
              imageSource={require("../../assets/images/thinkfood/menu/notification.png")}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabInfo"
        component={TabNetwork}
        options={{
          title: "Thông tin người dùng",
          headerShown: true,
          header: () => (
            <HeaderShow
              name="Cá nhân"
              logout={() => {
                dispatch(logOut());
              }}
            />
          ),
          tabBarShowLabel: false,

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
          width: props.size ? props.size : 30,
          height: props.size ? props.size : 30,
          tintColor: props.color,
        }}
      />
    );
  }
  // @ts-ignore
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

export function HeaderShow(props: { name: string; logout?: () => void }) {
  return (
    <View style={styles.header}>
      <Text
        style={{
          marginLeft: 30,
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
    height: 90,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
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
