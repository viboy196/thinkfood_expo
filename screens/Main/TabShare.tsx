import { View, Text, Button, Alert, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Input from "../../components/items/InputForm";
import { tintColorLight } from "../../constants/Colors";
import { color1, color2 } from "../../utils/helper/Color";
import ApiRequest from "../../utils/api/Main/ApiRequest";
import { useAppSelector } from "../../redux/store/hooks";
import { validateName, validatePhoneNumber } from "../../utils/validate";
import { ResultStatusCode } from "../../utils/api/apiTypes";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { TypeTheGoiTieuDung } from "../../utils/helper/TheGoiTieuDungHelper";
import TheGoiTieuDungCrud from "../../utils/api/TheGoiTieuDungCrud";
import { RootTabScreenProps } from "../../navigation/types";
import { Modal, Portal, Provider, RadioButton } from "react-native-paper";

export default function TabShare({
  navigation,
}: RootTabScreenProps<"TabShare">) {
  const [fullName, setFullName] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const [info, setInfo] = useState<string>();
  const [listGoiTang, setListGoiTang] = useState<TypeTheGoiTieuDung[]>();
  const [goiTang, setGoiTang] = useState<TypeTheGoiTieuDung>();

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
        idTheGoiTieuDung: goiTang.id,
      }).then((res) => {
        setLoading(false);
        if (res.code === ResultStatusCode.success) {
          Alert.alert(
            "Thông  báo",
            `Thêm tài Khoản thành công \nCảm ơn đã giới thiệu bạn bè đến với ThinkFood`
          );
          fetchDataGoiTang();
          setGoiTang(undefined);
        } else {
          if (res.errorMessage === "Object was exist")
            Alert.alert(
              "Thông báo",
              "Tài khoản đã tồn tại  \nCảm ơn đã giới thiệu bạn bè đến với ThinkFood"
            );
        }
      });
    }
  };
  const fetchDataGoiTang = () => {
    if (token) {
      TheGoiTieuDungCrud.getAllByUser(token).then((res) => {
        if (res.code === ResultStatusCode.success) {
          setListGoiTang(res.result);
        }
      });
    }
  };
  useEffect(() => {
    fetchDataGoiTang();
    const willFocusSubscription = navigation.addListener("focus", () => {
      fetchDataGoiTang();
    });

    return willFocusSubscription;
  }, []);
  useEffect(() => {
    if (listGoiTang) {
      setGoiTang(listGoiTang[0]);
    }
  }, [listGoiTang]);

  return (
    <View style={{ flex: 1, marginTop: 10 }}>
      <Spinner visible={loading} textStyle={{ color: "#fff" }} />
      {/* <Text style={{ padding: 10, fontSize: 20, color: color1 }}>
        Giới thiêu ThinkFood với bạn bè
      </Text> */}

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
      <TouchableOpacity
        onPress={() => {
          if (listGoiTang && listGoiTang.length > 0) {
            setVisible(true);
          } else {
            Alert.alert("Thông Báo", "Bạn đã hết gói tặng");
          }
        }}
      >
        <Input
          disable={true}
          title={"Chọn gói tặng"}
          value={goiTang?.nameGoiTieuDung}
          keyboardType={"default"}
          onChangeInput={setPhoneNum}
          icon="gift"
          color={tintColorLight}
        />
      </TouchableOpacity>
      <View style={{ margin: 10 }}>
        <Button title="Giới thiệu " color={color1} onPress={addKhachHang} />
      </View>
      {visible && (
        <ModalSelectGoiTang
          visible={visible}
          listGoiTang={listGoiTang}
          hideModal={() => {
            setVisible(false);
          }}
          goiTang={goiTang}
          setGoiTang={setGoiTang}
        />
      )}
    </View>
  );
}

export const ModalSelectGoiTang = (props: {
  visible: boolean;
  hideModal: () => void;
  goiTang: TypeTheGoiTieuDung;
  listGoiTang: TypeTheGoiTieuDung[];
  setGoiTang: React.Dispatch<React.SetStateAction<TypeTheGoiTieuDung>>;
}) => {
  const containerStyle = { backgroundColor: "white", padding: 20 };
  return (
    <Provider>
      <Portal>
        <Modal
          visible={props.visible}
          onDismiss={props.hideModal}
          contentContainerStyle={containerStyle}
        >
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "600",
                color: color2,
              }}
            >
              Chọn Phương Thức Thanh toán
            </Text>
          </View>
          {props.listGoiTang.map((item, index) => (
            <View
              key={`listGoiTang${item.id}`}
              style={{
                flexDirection: "row",
                marginVertical: 5,
                backgroundColor: "#fff",
                paddingVertical: 10,
              }}
            >
              <View
                style={{
                  flex: 2,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <RadioButton
                  value="first"
                  color={color1}
                  onPress={() => {
                    props.setGoiTang(item);
                    props.hideModal();
                  }}
                />
              </View>
              <View
                style={{
                  flex: 6,
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <Text>
                  {item.nameGoiTieuDung} {`: ${item.soLuong}`}
                </Text>
              </View>
            </View>
          ))}
        </Modal>
      </Portal>
    </Provider>
  );
};
