import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { color1 } from "../../utils/helper/Color";
import { TypeAddressCreate } from "../../utils/helper/AddressHelper";

import { Switch } from "react-native-paper";
import { RootStackScreenProps } from "../../navigation/types";
import { useAppSelector } from "../../redux/store/hooks";
import AddressCrud from "../../utils/api/AddressCrud";
import { ResultStatusCode } from "../../utils/api/apiTypes";
import Spinner from "react-native-loading-spinner-overlay/lib";
import SelectGPS from "../../components/SelectGPS";
import MapView, { Marker, Region } from "react-native-maps";
import Layout from "../../constants/Layout";

export default function AddAddress({
  navigation,
}: RootStackScreenProps<"AddAddress">) {
  const { accountDetail } = useAppSelector((s) => s.auth);
  const [input, setInput] = useState<TypeAddressCreate>({
    type: "Văn Phòng",
    isDefault: false,
    idConnect: accountDetail.id,
  });

  const [region, setRegion] = useState<Region>();
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useAppSelector((s) => s.auth);
  const onAddAddress = () => {
    if (token) {
      setLoading(true);
      AddressCrud.Add(token, input)
        .then((res) => {
          setLoading(false);
          if (res.code === ResultStatusCode.success) {
            Alert.alert("Thông  báo", "Thêm mới địa chỉ thành công", [
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

  useEffect(() => {
    if (region) {
      setInput((old) => {
        return { ...old, region };
      });
    }
  }, [region]);
  const [openScreenGPS, setOpenScreenGPS] = useState<Boolean>(false);
  if (openScreenGPS) {
    return (
      <SelectGPS
        name={"anh dan"}
        region={region}
        setRegion={setRegion}
        onPressDone={() => {
          Alert.alert("Xác Nhận", "Xác nhận vị trí được chọn", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                setOpenScreenGPS(false);
              },
            },
          ]);
        }}
        onPressClose={() => {
          setOpenScreenGPS(false);
        }}
        gps={undefined}
      />
    );
  }
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
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <View style={{ flex: 1 }} />
          <Button
            title="Chọn vị trí"
            onPress={() => {
              setOpenScreenGPS(true);
            }}
          />
        </View>
        {region && (
          <MapView
            style={{ width: Layout.window.width, height: 100 }}
            initialRegion={{
              ...input.region,
            }}
            showsScale={true}
            pitchEnabled={false}
            rotateEnabled={false}
            scrollEnabled={false}
          >
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              pinColor="black"
            ></Marker>
          </MapView>
        )}
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
        onPress={onAddAddress}
      >
        <Text style={{ color: "#fff" }}>THÊM MỚI</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
