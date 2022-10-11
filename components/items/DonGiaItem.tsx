import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TypeDonGia } from "../../utils/helper/DonGiaHelper";
import DoAnCrud from "../../utils/api/DoAnCrud";
import { ResultStatusCode } from "../../utils/api/apiTypes";
import ThucPhamTieuChuanCrud from "../../utils/api/ThucPhamTieuChuanCrud";
import DonViDoCrud from "../../utils/api/DonViDoCrud";
import { UrlHelper } from "../../utils/helper/UrlHelper";

export default function DonGiaItem({
  item,
  onPress,
  color,
  size,
  sizeText,
  width,
  height,
  colorText,
}: {
  item: TypeDonGia;
  onPress?: () => void;
  color?: string;

  colorText?: string;

  size?: string | number;
  sizeText?: number;
  width?: string | number | undefined;
  height?: string | number | undefined;
}) {
  const [state, setState] = useState<{
    name?: string;
    link?: string;
    avatarUri?: string;
    nameDonViDo?: string;
  }>();
  useEffect(() => {
    if (item.idDoAn) {
      DoAnCrud.getDetailPublish(item.idDoAn).then((res) => {
        if (res.code === ResultStatusCode.success) {
          // @ts-ignore
          setState((old) => {
            return {
              ...old,
              avatarUri: res.result.avartarUri,
              name: res.result.name,
              link: `/action/DoAn/${res.result.id}`,
            };
          });
        }
      });
    }
    if (item.idThucPhamTieuChuan) {
      ThucPhamTieuChuanCrud.getDetailPublish(item.idThucPhamTieuChuan).then(
        (res) => {
          if (res.code === ResultStatusCode.success) {
            // @ts-ignore
            setState((old) => {
              return {
                ...old,
                avatarUri: res.result.avartarUri,
                name: res.result.name,
                link: `/action/ThucPhamTieuChuan/${res.result.id}`,
              };
            });
          }
        }
      );
    }
    if (item.idDonViDo) {
      DonViDoCrud.getDetailPublish(item.idDonViDo).then((res) => {
        if (res.code === ResultStatusCode.success) {
          // @ts-ignore
          setState((old) => {
            return {
              ...old,
              nameDonViDo: res.result.name,
            };
          });
        }
      });
    }
  }, [item.idDoAn, item.idDonViDo, item.idThucPhamTieuChuan]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: width ? width : 75,
          height: height ? height : 100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            height: "60%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: UrlHelper.urlFile + state?.avatarUri }}
            resizeMode="cover"
            style={{
              width: size ? size : 48,
              height: size ? size : 48,
              tintColor: color ? color : undefined,
            }}
          />
        </View>
        <View style={{ height: "40%" }}>
          <Text
            style={{
              textAlign: "center",
              color: colorText ? colorText : undefined,
              fontSize: sizeText ? sizeText : undefined,
            }}
          >
            {state?.name ? state.name : "Chưa nhập"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
