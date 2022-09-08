import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { Checkbox, TextInput } from "react-native-paper";
import Button from "../../components/items/Button";
import Input from "../../components/items/InputForm";
import { View, Text } from "../../components/Themed";
import { tintColorLight } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { RootStackScreenProps } from "../../navigation/types";
import {
  loginAsync,
  logOut,
  setStateAuthRemember,
} from "../../redux/features/auth/authSlices";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import ApiRequest from "../../utils/api/Main/ApiRequest";
import { validatePassword, validatePhoneNumber } from "../../utils/validate";

export default function Login({}: RootStackScreenProps<"Login">) {
  const { loading, errorMessage, checkedAuth, userName, password } =
    useAppSelector((state) => state.auth);
  console.log(errorMessage);

  const dispatch = useAppDispatch();
  const [textPhone, setTextPhone] = useState<string>();
  const [textPassword, setTextPassword] = useState<string>();
  const [checklogin, setCheckLogin] = useState<number>(0);
  console.log(checklogin);

  const [checked, setChecked] = React.useState(false);
  useEffect(() => {
    if (checkedAuth && userName && password) {
      setTextPhone(userName);
      setTextPassword(password);
      setChecked(checkedAuth);
    }
  }, [checkedAuth, password, userName]);

  if (errorMessage && loading !== "idle") {
    Alert.alert("lỗi", errorMessage);
    dispatch(logOut());
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Spinner
          visible={loading === "pending" && checklogin > 0}
          textContent={"Đăng Nhập ..."}
          textStyle={styles.spinnerTextStyle}
        />
        <ImageBackground
          source={require("../../assets/images/logo/thinkfoodbg.png")}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <View style={styles.header}>
            <View style={{ flex: 1 }} />
            <Image
              source={require("../../assets/images/logo/thinkfoodlogo.png")}
              resizeMode="cover"
              style={styles.logoImage}
            />
            <Text style={styles.logoText}>
              {" "}
              Gặp lại hương vị cũ - Tìm về kỷ niệm xưa.{" "}
            </Text>
          </View>
          <View style={styles.body}>
            <View style={styles.fromInput}>
              <Input
                title={"Số điện thoại"}
                value={textPhone}
                keyboardType={"numeric"}
                onChangeInput={(text: string) => {
                  console.log(text);
                  setTextPhone(text);
                }}
                icon="phone"
                color={tintColorLight}
                errorMessages={
                  validatePhoneNumber(textPhone)
                    ? undefined
                    : "Số điện thoại không hợp lệ"
                }
              />
              <Input
                title={"Mật khẩu"}
                value={textPassword}
                secureTextEntry={true}
                onChangeInput={(text: string) => {
                  console.log(text);
                  setTextPassword(text);
                }}
                icon="key"
                color={tintColorLight}
                errorMessages={
                  validatePassword(textPassword)
                    ? undefined
                    : "Mật khẩu phải nhiều hơn 6 kí tự"
                }
              />
            </View>
            <View style={styles.viewInfo}>
              <View style={styles.viewTextInfo}>
                <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                  color={tintColorLight}
                  uncheckedColor={tintColorLight}
                />
                <Text style={styles.textInfoCheckBox}>Nhớ thông tin</Text>
              </View>
              <View style={styles.empty} />
            </View>
            <View style={styles.btnLoginViewBorder}>
              <TouchableOpacity
                style={styles.btnLoginView}
                onPress={() => {
                  console.log("vao day");
                  setCheckLogin((old) => {
                    return old++;
                  });
                  if (
                    textPhone &&
                    textPassword &&
                    validatePhoneNumber(textPhone) &&
                    validatePassword(textPassword)
                  ) {
                    dispatch(
                      setStateAuthRemember({
                        input: {
                          loading: "idle",
                          checkedAuth: checked,
                          userName: textPhone,
                          password: textPassword,
                        },
                      })
                    );

                    dispatch(
                      loginAsync({ phone: textPhone, password: textPassword })
                    );
                  } else {
                    Alert.alert("thông tin sai");
                  }
                }}
              >
                <Text style={styles.btnLoginText}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: "center", padding: 15 }}>
              <Button
                iconName="facebook"
                BackgroundColor="rgba(0, 132, 255,0.8)"
                onPress={() => {
                  Linking.openURL("https://www.facebook.com/thinkfood.vn");
                }}
              />
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <Text style={{ color: tintColorLight }}>© Thinkfood 2022 </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: Layout.window.width,

    height: Layout.window.height,
    backgroundColor: "#fff",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  backgroundImage: {
    width: Layout.window.width,

    height: Layout.window.height,
    alignItems: "center",
    backgroundColor: "red",
  },
  empty: { flex: 1 },
  header: {
    flex: 2.5,
    width: "100%",
    alignItems: "center",
  },
  logoImage: { width: 150, height: 150 },
  logoText: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    textShadowColor: "#3e3e3e",
  },
  body: {
    flex: 5,
    width: "100%",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  fromInput: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  viewInfo: {
    flexDirection: "row",
    marginLeft: 12,
    marginBottom: 10,
  },
  textInfo: {
    color: tintColorLight,
    fontWeight: "700",
  },
  textInfoCheckBox: {
    color: tintColorLight,
  },
  btnLoginViewBorder: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 5,
  },
  btnLoginView: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: tintColorLight,
    width: "80%",
    height: 50,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  btnLoginText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  viewTextInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
  },
  viewButtonInfo: {
    flexDirection: "row",
    width: "100%",
    height: 120,
  },
  viewButtonItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewButtonItemText: {
    marginTop: 5,
    height: 30,
    alignItems: "center",
  },
});
