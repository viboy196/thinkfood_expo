import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { color1 } from "../../utils/helper/Color";
import { TypeAddressDetail } from "../../utils/helper/AddressHelper";

import { Switch } from "react-native-paper";
import { RootStackScreenProps } from "../../navigation/types";
import AddressCrud from "../../utils/api/AddressCrud";
import { useAppSelector } from "../../redux/store/hooks";
import { ResultStatusCode } from "../../utils/api/apiTypes";
import Spinner from "react-native-loading-spinner-overlay/lib";

export default function UpdateAddress({
  navigation,
  route,
}: RootStackScreenProps<"UpdateAddress">) {
  const [input, setInput] = useState<TypeAddressDetail>(route.params.data);
  console.log("data", route.params.data);

  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useAppSelector((s) => s.auth);
  const onUpdateAddress = () => {
    if (token) {
      setLoading(true);
      AddressCrud.Update(token, input)
        .then((res) => {
          setLoading(false);
          if (res.code === ResultStatusCode.success) {
            Alert.alert("Thành Công", "Cập nhật địa chỉ thành công", [
              {
                text: "OK",
                onPress: () => {
                  if (navigation.canGoBack()) {
                    navigation.goBack();
                  }
                },
              },
            ]);
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <Spinner visible={loading} textStyle={{ color: "#fff" }} />
      <View>
        <Text style={{ padding: 10 }}>Liên hệ</Text>
        <TextInput
          value={input.receiverName}
          onChangeText={(text) => {
            setInput((old) => {
              return { ...old, receiverName: text };
            });
          }}
          placeholder="Họ Và Tên"
          style={{ marginBottom: 2, backgroundColor: "#fff", padding: 10 }}
        />
        <TextInput
          placeholder="Số điện thoại"
          keyboardType="phone-pad"
          value={input.phone}
          onChangeText={(text) => {
            setInput((old) => {
              return { ...old, phone: text };
            });
          }}
          style={{ marginBottom: 2, backgroundColor: "#fff", padding: 10 }}
        />
      </View>
      <View>
        <Text style={{ padding: 10 }}>Địa chỉ</Text>
        <TextInput
          placeholder="Tỉnh/Thành phố"
          value={input.province}
          onChangeText={(text) => {
            setInput((old) => {
              return { ...old, province: text };
            });
          }}
          style={{ marginBottom: 2, backgroundColor: "#fff", padding: 10 }}
        />

        <TextInput
          placeholder="Quận/Huyện "
          style={{ marginBottom: 2, backgroundColor: "#fff", padding: 10 }}
          value={input.district}
          onChangeText={(text) => {
            setInput((old) => {
              return { ...old, district: text };
            });
          }}
        />
        <TextInput
          placeholder="Phường/Xã"
          style={{ marginBottom: 2, backgroundColor: "#fff", padding: 10 }}
          value={input.ward}
          onChangeText={(text) => {
            setInput((old) => {
              return { ...old, ward: text };
            });
          }}
        />

        <TextInput
          placeholder="Tên đường , Tòa nhà , Số nhà"
          style={{ marginBottom: 2, backgroundColor: "#fff", padding: 10 }}
          value={input.address}
          onChangeText={(text) => {
            setInput((old) => {
              return { ...old, address: text };
            });
          }}
        />
      </View>
      <View>
        <Text style={{ padding: 10 }}>Cài đặt</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 2,
            backgroundColor: "#fff",
            padding: 10,
          }}
        >
          <Text style={{ padding: 10 }}>Loại địa chỉ</Text>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: input.type === "Văn Phòng" ? 1 : 0,
              backgroundColor: input.type === "Văn Phòng" ? "#fff" : "#f5f5f5",
              borderColor: color1,
              marginHorizontal: 10,
              borderRadius: 3,
            }}
            onPress={() => {
              setInput((old) => {
                return { ...old, type: "Văn Phòng" };
              });
            }}
          >
            <Text
              style={{ color: input.type === "Văn Phòng" ? color1 : "#000" }}
            >
              Văn Phòng
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
              borderColor: color1,
              backgroundColor: input.type === "Nhà Riêng" ? "#fff" : "#f5f5f5",
              borderWidth: input.type === "Nhà Riêng" ? 1 : 0,
              marginHorizontal: 10,
              borderRadius: 3,
            }}
            onPress={() => {
              setInput((old) => {
                return { ...old, type: "Nhà Riêng" };
              });
            }}
          >
            <Text
              style={{ color: input.type === "Nhà Riêng" ? color1 : "#000" }}
            >
              Nhà Riêng
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 2,
            backgroundColor: "#fff",
            padding: 10,
          }}
        >
          <Text style={{ padding: 10 }}>Đặt địa chỉ làm mặc định</Text>
          <View style={{ flex: 1 }} />
          <Switch
            value={input.isDefault}
            color={color1}
            onValueChange={() => {
              setInput((old) => {
                return { ...old, isDefault: !old.isDefault };
              });
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          margin: 10,
          backgroundColor: color1,
        }}
        onPress={onUpdateAddress}
      >
        <Text style={{ color: "#fff" }}>CẬP NHẬT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
