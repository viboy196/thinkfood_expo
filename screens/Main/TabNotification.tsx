import { View, Text, Button, Alert } from "react-native";
import React, { useState } from "react";
import Input from "../../components/items/InputForm";
import { tintColorLight } from "../../constants/Colors";
import { color1, color2 } from "../../utils/helper/Color";
import ApiRequest from "../../utils/api/Main/ApiRequest";
import { useAppSelector } from "../../redux/store/hooks";
import { validateName, validatePhoneNumber } from "../../utils/validate";
import { ResultStatusCode } from "../../utils/api/apiTypes";
import Spinner from "react-native-loading-spinner-overlay/lib";

export default function TabNotification() {
  const [fullName, setFullName] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const [info, setInfo] = useState<string>();

  const [phoneNum, setPhoneNum] = useState<string>();
  const { token } = useAppSelector((s) => s.auth);
  const addKhachHang = () => {
    if (
      token &&
      fullName &&
      validateName(fullName) &&
      phoneNum &&
      validatePhoneNumber(phoneNum)
    ) {
      setLoading(true);
      ApiRequest.AddKhachHang(token, {
        fullName: fullName,
        phone: phoneNum,
      }).then((res) => {
        setLoading(false);
        if (res.code === ResultStatusCode.success) {
          Alert.alert("Thành công", `Thêm tài Khoản thành công`);
        } else {
          if (res.errorMessage === "Object was exist")
            Alert.alert("Thất bại", "Tài khoản đã tôn tại");
        }
      });
    }
  };

  return (
    <View>
      <Spinner visible={loading} textStyle={{ color: "#fff" }} />
      <Text style={{ padding: 10, fontSize: 24, color: color1 }}>
        Thêm tài khoản
      </Text>
      <Input
        title={"Lý do thêm"}
        value={info}
        keyboardType={"default"}
        onChangeInput={setInfo}
        icon="question"
        color={tintColorLight}
      />
      <Input
        title={"Họ và tên"}
        value={fullName}
        keyboardType={"default"}
        onChangeInput={setFullName}
        icon="user-alt"
        color={tintColorLight}
        errorMessages={
          validateName(fullName) ? undefined : "Tên nhập không hợp lệ"
        }
      />
      <Input
        title={"Số điện thoại"}
        value={phoneNum}
        keyboardType={"numeric"}
        onChangeInput={setPhoneNum}
        icon="phone"
        color={tintColorLight}
        errorMessages={
          validatePhoneNumber(phoneNum)
            ? undefined
            : "Số điện thoại nhập không hợp lệ"
        }
      />
      <View style={{ margin: 10 }}>
        <Button title="Thêm tài khoản" color={color1} onPress={addKhachHang} />
      </View>
    </View>
  );
}
