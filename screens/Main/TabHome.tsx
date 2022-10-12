import { View, Text } from "../../components/Themed";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { tintColorLight } from "../../constants/Colors";
import { useAppSelector } from "../../redux/store/hooks";
import { RootTabScreenProps } from "../../navigation/types";
import Spinner from "react-native-loading-spinner-overlay/lib";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import ButtonText from "../../components/items/ButtonText";
import ButtonImageShow from "../../components/items/ButtonImageShow";

import LoaiGiaoDichCrud from "../../utils/api/LoaiGiaoDichCrud";
import { TypeLoaiGiaoDich } from "../../utils/helper/LoaiGiaoDichHelper";
import { ResultStatusCode } from "../../utils/api/apiTypes";
import { UrlHelper } from "../../utils/helper/UrlHelper";
import CartNhomSanPhamIsLive from "../../components/CartNhomSanPhamIsLive";
import CartLoaiMonAn from "../../components/CartLoaiMonAn";

export default function TabOneScreen(nav: RootTabScreenProps<"TabHome">) {
  const { navigation } = nav;
  const [loading, setLoading] = useState<boolean>(true);
  const { accountDetail } = useAppSelector((s) => s.auth);

  const [listLoaiGiaoDich, setListLoaiGiaoDich] =
    useState<TypeLoaiGiaoDich[]>();
  useEffect(() => {
    LoaiGiaoDichCrud.GetAllPublish().then((res) => {
      setLoading(false);
      if (res.code === ResultStatusCode.success) {
        setListLoaiGiaoDich(res.result);
      }
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {loading && (
          <Spinner
            visible={true}
            textContent={"Loading ..."}
            textStyle={{ color: "#fff", fontSize: 20 }}
          />
        )}
        <View style={styles.header}>
          <View style={styles.avatarView}>
            <Image
              source={require("../../assets/images/thinkfood/vip-card.png")}
              resizeMode="cover"
              style={styles.avatarImage}
            />
          </View>
          <View style={{ paddingLeft: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#6a6968",
              }}
            >
              Xin chào , {accountDetail?.fullName}
            </Text>
            <Text
              style={{
                color: tintColorLight,
              }}
            >
              gold member
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end", paddingRight: 10 }}>
            <Image
              source={require("../../assets/images/thinkfood/scanner.png")}
              resizeMode="cover"
              style={styles.avatarImage}
            />
          </View>
        </View>

        <View
          style={{
            width: "100%",
            height: 60,
            flexDirection: "row",
            alignItems: "center",
            margin: 10,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: 60,
              backgroundColor: "#f5f5f5",
              borderBottomLeftRadius: 10,
              borderTopLeftRadius: 10,
            }}
          >
            <Ionicons name="search" size={32} color={"#707070"} />
          </View>
          <TextInput
            placeholder={"Bạn muốn ăn gì ?"}
            selectionColor={"#a6a5a5"}
            style={{
              paddingLeft: 10,
              width: "100%",
              height: "100%",
              backgroundColor: "#f5f5f5",
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}
          />
        </View>
        <ImageBackground
          source={require("../../assets/images//thinkfood/tf1.jpg")}
          resizeMode="cover"
          style={{ width: "100%", height: 120, alignItems: "center" }}
        >
          <Image
            source={require("../../assets/images/logo/thinkfoodlogo.png")}
            resizeMode="cover"
            style={styles.logoImage}
          />
          <Text style={styles.logoText}>
            {" "}
            Gặp lại hương vị cũ - Tìm về kỷ niệm xưa.{" "}
          </Text>
        </ImageBackground>
        <View style={{ width: "100%" }}>
          <FlatList
            data={listLoaiGiaoDich}
            numColumns={3}
            renderItem={({ item, index }) => (
              <ButtonText
                imageSource={{ uri: UrlHelper.urlFile + item.avartarUri }}
                text={item.name}
                colorText={"#424141"}
                size={48}
                sizeText={16}
                width={120}
                height={150}
                onPress={() => {
                  navigation.navigate("LoaiGiaoDich", { data: item });
                }}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
        <CartNhomSanPhamIsLive nav={nav} key="CartNhomSanPhamIsLive" />

        <View style={{ width: "100%" }}>
          <View style={{ paddingLeft: 10 }}>
            <Text
              style={{
                color: tintColorLight,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Món ăn{" "}
            </Text>
            <View style={{ width: "100%" }}>
              <View style={{ alignItems: "flex-end", paddingRight: 10 }}>
                <Text>Xem thêm</Text>
              </View>
              <CartLoaiMonAn nav={nav} />
              {/* 
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <ButtonImageShow
                    imageSource={require("../../assets/images/thinkfood/item/im1.jpg")}
                    text={"Bánh mì đen"}
                    colorText={"#424141"}
                    sizeText={16}
                    width={100}
                    height={120}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <ButtonImageShow
                    imageSource={require("../../assets/images/thinkfood/item/im2.jpg")}
                    text={"Trứng cá hôi"}
                    colorText={"#424141"}
                    sizeText={16}
                    width={100}
                    height={120}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <ButtonImageShow
                    imageSource={require("../../assets/images/thinkfood/item/im3.jpg")}
                    text={"THỊT NƯỚNG KIỂU NGA"}
                    colorText={"#424141"}
                    sizeText={16}
                    width={100}
                    height={140}
                  />
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <ButtonImageShow
                    imageSource={require("../../assets/images/thinkfood/item/im4.jpg")}
                    text={"Gà Quay"}
                    colorText={"#424141"}
                    sizeText={16}
                    width={100}
                    height={120}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <ButtonImageShow
                    imageSource={require("../../assets/images/thinkfood/item/im5.jpg")}
                    text={"Bánh mì"}
                    colorText={"#424141"}
                    sizeText={16}
                    width={100}
                    height={120}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <ButtonImageShow
                    imageSource={require("../../assets/images/thinkfood/item/im6.jpg")}
                    text={"Bò sốt vang"}
                    colorText={"#424141"}
                    sizeText={16}
                    width={100}
                    height={140}
                  />
                </View>
              </View> */}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "#fff" },
  header: {
    backgroundColor: "#fff",
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
  logoImage: { width: 75, height: 75 },
  logoText: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    textShadowColor: "#3e3e3e",
  },
  avatarView: {
    margin: 5,
    width: 60,
    height: 60,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fcece4",
    position: "relative",
  },
  avatarImage: {
    width: 40,
    height: 40,
    overflow: "hidden",
  },
});
