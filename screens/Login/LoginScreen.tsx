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
  setStateAuth,
  setStateAuthRemember,
} from "../../redux/features/auth/authSlices";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { ResultStatusCode } from "../../utils/api/apiTypes";
import ApiRequest from "../../utils/api/Main/ApiRequest";
import { color1 } from "../../utils/helper/Color";
import { callNumber } from "../../utils/helper/HelperFunc";
import {
  validateOTP,
  validatePassword,
  validatePasswordReDo,
  validatePhoneNumber,
} from "../../utils/validate";

export default function Login({}: RootStackScreenProps<"Login">) {
  const { checkedAuth, userName, password } = useAppSelector(
    (state) => state.auth
  );
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const [textPhone, setTextPhone] = useState<string>();
  const [textPassword, setTextPassword] = useState<string>();

  const [textPasswordRedo, setTextPasswordRedo] = useState<string>();

  const [idAccount, setIdAccount] = useState<string>();

  const [fullName, setFullName] = useState<string>();

  const [checked, setChecked] = useState(true);
  const [action, setAction] = useState<number>(1);
  useEffect(() => {
    if (checkedAuth && userName && password) {
      setTextPhone(userName);
      setTextPassword(password);
      setChecked(checkedAuth);
    }
  }, [checkedAuth, password, userName]);

  const OnPressLogin = () => {
    if (
      textPhone &&
      textPassword &&
      validatePhoneNumber(textPhone) &&
      validatePassword(textPassword)
    ) {
      setLoading(true);
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
      ApiRequest.LoginApi({ phone: textPhone, password: textPassword })
        .then((res) => {
          if (res.code === ResultStatusCode.success) {
            setLoading(false);

            dispatch(
              setStateAuth({
                input: { loading: "succeeded", token: res.result },
              })
            );
          } else {
            Alert.alert("Loi", res.errorMessage);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          Alert.alert("Loi", error);
        });
    } else {
      Alert.alert("thông tin sai");
    }
  };
  const getAccountByPhone = () => {
    if (textPhone && validatePhoneNumber(textPhone)) {
      setLoading(true);
      ApiRequest.getAccountByPhone({ phone: textPhone })
        .then((res) => {
          if (res.code === ResultStatusCode.success) {
            setLoading(false);
            setAction(2);
            setFullName(res.result.fullName);
          }
          if (res.code === ResultStatusCode.create) {
            setLoading(false);
            setAction(4);
            setIdAccount(res.result.id);
            setFullName(res.result.fullName);
            // ApiRequest.SendOtp({ phone: fullName });
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  const createPassWord = () => {
    if (
      idAccount &&
      textPassword &&
      textPasswordRedo &&
      validatePassword(textPassword) &&
      validatePasswordReDo(textPassword, textPasswordRedo)
    ) {
      setLoading(true);
      ApiRequest.createNewPasswordTemporary({
        id: idAccount,
        newPassword: textPassword,
      }).then((res) => {
        setLoading(false);
        if (res.code === ResultStatusCode.success) {
          Alert.alert("Thành công", "Tạo mật khẩu thành công");
          setAction(2);
        }
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
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
              Gặp lại hương vị cũ - Tìm về kỷ niệm xưa
            </Text>
          </View>
          <View style={styles.body}>
            <View style={styles.empty} />
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  color: color1,
                  marginTop: 30,
                  textShadowOffset: { width: 2, height: 2 },
                  textShadowRadius: 5,
                  fontSize: 24,
                  textAlign: "center",
                }}
              >
                {action === 1 && "Đăng Nhập"}

                {action === 2 && `Xin chào\n${fullName}`}

                {action === 4 && `Xin chào\n${fullName}`}
              </Text>
            </View>
            {action === 1 && (
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
              </View>
            )}
            {action === 2 && (
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
            )}

            {action === 4 && (
              <>
                <Input
                  title={"Mật khẩu mới"}
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

                <Input
                  title={"Nhập lại mật khẩu"}
                  value={textPasswordRedo}
                  secureTextEntry={true}
                  onChangeInput={(text: string) => {
                    console.log(text);
                    setTextPasswordRedo(text);
                  }}
                  icon="key"
                  color={tintColorLight}
                  errorMessages={
                    validatePasswordReDo(textPasswordRedo, textPassword)
                      ? undefined
                      : "Mật khẩu không trùng khớp"
                  }
                />
              </>
            )}

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
              <View style={{ flex: 1 }} />
              <TouchableOpacity
                style={{ marginRight: 28 }}
                onPress={() => {
                  Alert.alert(
                    "Quên mật khẩu",
                    "Liên hệ sđt 0982571428 để được cấp lại mật khẩu",
                    [
                      {
                        text: "Gọi ngay",
                        onPress: () => {
                          callNumber("0982571428");
                        },
                      },
                      {
                        text: "Ok",
                      },
                    ]
                  );
                }}
              >
                <Text style={styles.textInfoCheckBox}>Quên Mật khẩu</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnLoginViewBorder}>
              <TouchableOpacity
                style={styles.btnLoginView}
                onPress={() => {
                  if (action === 1) {
                    getAccountByPhone();
                  }
                  if (action === 2) {
                    OnPressLogin();
                  }
                  if (action === 4) {
                    createPassWord();
                  }
                }}
              >
                <Text style={styles.btnLoginText}>
                  {action === 1 && "Tiếp Theo"}
                  {action === 2 && "Đăng Nhập"}
                  {action === 4 && "Tạo mật Khẩu"}
                </Text>
              </TouchableOpacity>
              <Text
                style={{ color: "red", marginTop: 15, textAlign: "center" }}
              >
                Bản thử nghiệm {"\n"} (chạy thử 01/11/2022 - 30/11/2022)
              </Text>
            </View>
            <View style={styles.empty}></View>
            <View style={{ alignItems: "center" }}>
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
                marginBottom: 15,
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
  container: { flex: 1, backgroundColor: "#fff" },
  spinnerTextStyle: {
    color: "#FFF",
  },
  backgroundImage: {
    width: Layout.window.width,

    height: Layout.window.height - 20,
    alignItems: "center",
  },
  empty: { flex: 1 },
  header: {
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
  },
  logoImage: { width: 150, height: 150 },
  logoText: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "600",
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
    alignItems: "center",
    justifyContent: "center",
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
