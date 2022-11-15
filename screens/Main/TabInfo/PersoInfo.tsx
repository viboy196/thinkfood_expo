import { View, Text, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { TypeAccount } from "../../../utils/helper/AccountHelper";
import PersoInfoItem from "./PersoInfoItem";
import ApiRequest from "../../../utils/api/Main/ApiRequest";
import { ResultStatusCode } from "../../../utils/api/apiTypes";
import { setStateAuth } from "../../../redux/features/auth/authSlices";
import Input from "../../../components/items/InputForm";
import { tintColorLight } from "../../../constants/Colors";
import {
  validatePassword,
  validatePasswordReDo,
} from "../../../utils/validate";
import { color2 } from "../../../utils/helper/Color";

export default function PersoInfo() {
  const { accountDetail, token } = useAppSelector((s) => s.auth);
  const [account, setAccount] = useState<TypeAccount>(accountDetail);
  const [inputPass, setInputPass] = useState<{
    id: string;
    oldPassword?: string;
    newPassword?: string;
    newPasswordRedo?: string;
  }>({ id: accountDetail.id });
  const dispatch = useAppDispatch();
  const ChangeFullName = (fullName: string) => {
    if (token && accountDetail.id) {
      ApiRequest.ChangeFullName(token, { id: accountDetail.id, fullName }).then(
        (res) => {
          if (res.code === ResultStatusCode.success) {
            Alert.alert("Thông Báo ", "Cập nhật thành công");
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
        }
      );
    }
  };

  const ChangePassWord = () => {
    if (
      token &&
      inputPass.id &&
      inputPass.oldPassword &&
      validatePassword(inputPass.oldPassword) &&
      inputPass.newPassword &&
      validatePassword(inputPass.newPassword) &&
      validatePasswordReDo(inputPass.newPassword, inputPass.newPasswordRedo)
    ) {
      ApiRequest.ChangePassword(token, inputPass).then((res) => {
        if (res.code === ResultStatusCode.success) {
          Alert.alert("Thông Báo ", "Cập nhật thành công");
        } else if (res.code === "01") {
          Alert.alert("Thông Báo ", "Mật khẩu hiện tại không khớp");
        }
      });
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <PersoInfoItem
        isPressEdit={true}
        value={account.fullName}
        title="Họ và tên"
        onPress={(text: string) => {
          ChangeFullName(text);
        }}
      />

      <PersoInfoItem
        isPressEdit={false}
        value={account.phone}
        title="Số điện thoại"
      />
      <View>
        <Text style={{ marginBottom: 5 }}>Đổi mật khẩu</Text>

        <Input
          title={"Mật khẩu hiện tại"}
          value={inputPass.oldPassword}
          secureTextEntry={true}
          onChangeInput={(text: string) => {
            console.log(text);
            setInputPass((old) => {
              return { ...old, oldPassword: text };
            });
          }}
          icon="key"
          color={tintColorLight}
          errorMessages={
            validatePassword(inputPass.oldPassword)
              ? undefined
              : "Mật khẩu phải nhiều hơn 6 kí tự"
          }
        />
        <Input
          title={"Mật khẩu mới"}
          value={inputPass.newPassword}
          secureTextEntry={true}
          onChangeInput={(text: string) => {
            console.log(text);
            setInputPass((old) => {
              return { ...old, newPassword: text };
            });
          }}
          icon="key"
          color={tintColorLight}
          errorMessages={
            validatePassword(inputPass.newPassword)
              ? undefined
              : "Mật khẩu phải nhiều hơn 6 kí tự"
          }
        />
        <Input
          title={"Nhập lại mật khẩu mới"}
          value={inputPass.newPasswordRedo}
          secureTextEntry={true}
          onChangeInput={(text: string) => {
            console.log(text);
            setInputPass((old) => {
              return { ...old, newPasswordRedo: text };
            });
          }}
          icon="key"
          color={tintColorLight}
          errorMessages={
            validatePasswordReDo(
              inputPass.newPassword,
              inputPass.newPasswordRedo
            )
              ? undefined
              : "Mật khẩu không trùng Khớp"
          }
        />

        <View style={{ marginTop: 10 }}>
          <Button
            color={color2}
            title="Thay đổi mật khẩu"
            onPress={() => {
              ChangePassWord();
            }}
          />
        </View>
      </View>
    </View>
  );
}
