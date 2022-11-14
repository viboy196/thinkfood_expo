import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { UrlHelper } from "../../utils/helper/UrlHelper";
import Layout from "../../constants/Layout";
import { RootTabScreenProps } from "../../navigation/types";
import { TypeDonGiaView } from "../../redux/features/SanPhamViewSlices";
import { currencyFormat } from "../../utils/helper/HelperFunc";
import { TypeSetDoAn } from "../../utils/helper/SetDoAnHelper";
import SetDoAnCrud from "../../utils/api/SetDoAnCrud";
import { ResultStatusCode } from "../../utils/api/apiTypes";

export default function SetDoAnItem({
  idSetDoAn,
  color,
  size,
  sizeText,
  width,
  colorText,
  nav,
}: {
  idSetDoAn: string;
  color?: string;
  nav: RootTabScreenProps<"TabHome">;

  colorText?: string;

  size?: string | number;
  sizeText?: number;
  width?: number;
}) {
  const [setDoAn, setSetDoAn] = useState<TypeSetDoAn>();
  useEffect(() => {
    SetDoAnCrud.getDetailPublish(idSetDoAn).then((res) => {
      if (res.code === ResultStatusCode.success) {
        setSetDoAn(res.result);
      }
    });
  }, []);
  return (
    <>
      {setDoAn && (
        <TouchableOpacity
          onPress={() => {
            nav.navigation.navigate("SetDoAnDetail", setDoAn);
          }}
          style={{ width: (Layout.window.width - 20) / 3 }}
        >
          <View
            style={{
              width: width ? width : 75,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View>
                <Image
                  source={{ uri: UrlHelper.urlFile + setDoAn.avartarUri }}
                  resizeMode="cover"
                  style={{
                    width: width ? width : 100,
                    height: width ? width * 0.75 : 75,
                    tintColor: color ? color : undefined,
                    borderRadius: 8,
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    backgroundColor: "#fff",
                    borderRadius: 8,
                    padding: 4,
                  }}
                >
                  <Text
                    style={{
                      color: "red",
                      fontSize: 8,
                    }}
                  >
                    Đặt cỗ tại gia
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text
                style={{ fontSize: 10, color: "tomato", textAlign: "center" }}
              >
                {setDoAn.unitPrice ? currencyFormat(setDoAn.unitPrice) : ""}
                {" vnđ/"}
                {"người"}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  color: colorText ? colorText : undefined,
                  fontSize: sizeText ? sizeText : 12,
                }}
              >
                {setDoAn?.name ? setDoAn.name : "Chưa nhập"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
}
