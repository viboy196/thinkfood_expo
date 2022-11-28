import { View, Text } from "../../components/Themed";
import React, { useState, useEffect } from "react";
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { tintColorLight } from "../../constants/Colors";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
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
import SearchHome from "../../components/Search/SearchHome";
import { setStateTextSearch } from "../../redux/features/TextSearchSlides";
import ApiRequest from "../../utils/api/Main/ApiRequest";
import {
  currencyFormat,
  getMaginTopByDevice,
} from "../../utils/helper/HelperFunc";
import { color2 } from "../../utils/helper/Color";

export default function TabOneScreen(nav: RootTabScreenProps<"TabHome">) {
  const { navigation } = nav;
  const { token } = useAppSelector((s) => s.auth);
  const [loading, setLoading] = useState<boolean>(true);
  const { searchHome } = useAppSelector((s) => s.textSearch);
  const distpatch = useAppDispatch();

  const [balance, setBalance] = useState<number>(0);

  const { accountDetail } = useAppSelector((s) => s.auth);

  const { listCartItem } = useAppSelector((s) => s.cart);

  const [listLoaiGiaoDich, setListLoaiGiaoDich] =
    useState<TypeLoaiGiaoDich[]>();
  useEffect(() => {
    LoaiGiaoDichCrud.GetAllPublish()
      .then((res) => {
        setLoading(false);
        if (res.code === ResultStatusCode.success) {
          setListLoaiGiaoDich(res.result);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
  //     console.log("hien key");

  //     setFocusTextSearch(true);
  //   });

  //   return () => {
  //     showSubscription.remove();
  //   };
  // }, []);

  const fetchBalance = () => {
    if (token) {
      ApiRequest.getBalance(token).then((res) => {
        if (res.code === ResultStatusCode.success) {
          setBalance(res.result);
        }
      });
    }
  };
  useEffect(() => {
    fetchBalance();
    const willFocusSubscription = navigation.addListener("focus", () => {
      fetchBalance();
    });

    return willFocusSubscription;
  }, []);
  console.log(
    "accountDetail?.accountTypeaccountDetail?.accountType",
    accountDetail?.accountType
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        {loading && (
          <Spinner visible={true} textStyle={{ color: "#fff", fontSize: 20 }} />
        )}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              if (accountDetail?.accountType?.name)
                Alert.alert("Loại tài khoản", accountDetail?.accountType?.name);
            }}
            style={styles.avatarView}
          >
            {accountDetail?.accountType?.code === "StaffCustomer" && (
              <Image
                source={require("../../assets/images/thinkfood/press-pass.png")}
                resizeMode="cover"
                style={styles.avatarImage}
              />
            )}
            {(accountDetail?.accountType?.code === "NonmalUser" ||
              accountDetail?.accountType == null) && (
              <Image
                source={require("../../assets/images/logo/thinkfoodlogo.png")}
                resizeMode="cover"
                style={{ ...styles.avatarImage, width: 50, height: 50 }}
              />
            )}
            {accountDetail?.accountType?.code === "LoyalCustomer" && (
              <Image
                source={require("../../assets/images/thinkfood/customer-loyalty.png")}
                resizeMode="cover"
                style={styles.avatarImage}
              />
            )}
            {accountDetail?.accountType?.code === "VIPCustomerss" && (
              <Image
                source={require("../../assets/images/thinkfood/vip-card.png")}
                resizeMode="cover"
                style={styles.avatarImage}
              />
            )}

            {accountDetail?.accountType?.code === "FamilyCustomer" && (
              <Image
                source={require("../../assets/images/thinkfood/family.png")}
                resizeMode="cover"
                style={styles.avatarImage}
              />
            )}

            {accountDetail?.accountType?.code === "KOL" && (
              <Image
                source={require("../../assets/images/thinkfood/kol.png")}
                resizeMode="cover"
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.navigate("TabInfo")}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#6a6968",
              }}
            >
              Xin chào , {accountDetail?.fullName}
            </Text>
            {accountDetail?.accountType && (
              <Text
                style={{
                  color: "#6a6968",
                }}
              >
                {"Thành viên : "}
                {accountDetail?.accountType?.name}
              </Text>
            )}

            <Text
              style={{
                color: tintColorLight,
              }}
            >
              Số dư : {currencyFormat(balance)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, alignItems: "flex-end", marginRight: 20 }}
            onPress={() => {
              navigation.navigate("Cart");
            }}
          >
            <Image
              source={require("../../assets/images/logo/shopping-cart-icon.png")}
              resizeMode="cover"
              style={{
                width: 35,
                height: 28,
                tintColor: "#6a6968",
              }}
            />
            {listCartItem && listCartItem.length > 0 && (
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: "rgba(0,0,0,0.1)",
                  backgroundColor: "red",
                  position: "absolute",
                  top: -5,
                  right: -5,
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: 10,
                    textAlign: "center",
                  }}
                >
                  {listCartItem.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        {/* Search MonAn */}
        <View
          style={{
            width: "100%",
            height: 50,
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
            value={searchHome}
            onChangeText={(text) => {
              distpatch(setStateTextSearch({ search: { searchHome: text } }));
            }}
            selectionColor={"#a6a5a5"}
            style={{
              paddingLeft: 10,
              width: "100%",
              height: "100%",
              backgroundColor: "#f5f5f5",
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}
            onFocus={() => {
              navigation.navigate("SearchDonGia");
            }}
            // onSubmitEditing={() => {
            //   setFocusTextSearch(false);
            //   navigation.navigate("SearchDonGia");
            // }}
          />
        </View>
        {/* {!focusTextSearch ? ( */}
        <>
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
          {/* <View style={{ width: "100%" }}>
            <FlatList
              data={listLoaiGiaoDich}
              numColumns={3}
              renderItem={({ item, index }) => (
                <ButtonText
                  imageSource={{ uri: UrlHelper.urlFile + item.avartarUri }}
                  text={item.name}
                  colorText={"#424141"}
                  size={48}
                  sizeText={14}
                  width={120}
                  height={150}
                  onPress={() => {
                    navigation.navigate("LoaiGiaoDich", { data: item });
                  }}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View> */}

          <CartNhomSanPhamIsLive nav={nav} key="CartNhomSanPhamIsLive" />
        </>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "#fff" },
  header: {
    backgroundColor: "#fff",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: getMaginTopByDevice(),
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
    width: 30,
    height: 30,
    resizeMode: "cover",
    overflow: "hidden",
  },
});
