import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { TypeOder } from "../../../utils/helper/OderHelper";
import { useAppSelector } from "../../../redux/store/hooks";
import { UrlHelper } from "../../../utils/helper/UrlHelper";
import {
  currencyFormat,
  getDiscountDonHang,
  getStatusByStatusCode,
  getSumDonHang,
  getValueDonHang,
} from "../../../utils/helper/HelperFunc";
import {
  TypeDonHang,
  TypeDonHangItem,
} from "../../../utils/helper/DonHangHelper";
import { TypeDiemAmThuc } from "../../../utils/helper/DiemAmThucHelper";

export default function DonhangHistoryItem(props: { item: TypeDonHang }) {
  const { listDiemAmThuc } = useAppSelector((s) => s.DiemAmThuc);

  const { accountDetail } = useAppSelector((s) => s.auth);

  const [diemAmThuc, setDiemAmThuc] = useState<TypeDiemAmThuc>();
  useEffect(() => {
    if (listDiemAmThuc && props.item.idDiemAmThuc) {
      const dat = listDiemAmThuc.find((x) => x.id === props.item.idDiemAmThuc);
      if (dat) {
        setDiemAmThuc(dat);
      }
    }
  }, [listDiemAmThuc, props.item.idDiemAmThuc]);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 10,
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
      }}
    >
      <View style={{ flexDirection: "row", paddingVertical: 10 }}>
        <Text>{diemAmThuc && diemAmThuc?.name}</Text>
        <View style={{ flex: 1 }} />
        <Text>{props.item?.complete && "Hoàn Thành"}</Text>
        {!props.item?.complete && props.item?.listStatus && (
          <Text>
            {getStatusByStatusCode(
              props.item?.listStatus[props.item?.listStatus.length - 1]?.status
            )}
          </Text>
        )}
      </View>
      {props.item?.listDonHangItem &&
        props.item?.listDonHangItem.map((item) => (
          <ItemDonHangItem
            item={item}
            key={"ItemDonHangItem" + item.idDonGia}
          />
        ))}
      {props.item?.shipPrice !== undefined && (
        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          <Text>Phí ship</Text>
          <View style={{ flex: 1 }} />
          <Text>vnđ {currencyFormat(Number(props.item?.shipPrice))}</Text>
        </View>
      )}
      {props.item?.khuyenMai !== undefined && props.item?.khuyenMai !== 0 && (
        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          <Text>Khuyễn mãi</Text>
          <View style={{ flex: 1, paddingLeft: 10 }}>
            <Text>
              {props.item?.textKhuyenMai && props.item?.textKhuyenMai}
            </Text>
          </View>
          <Text>vnđ -{currencyFormat(Number(props.item?.khuyenMai))}</Text>
        </View>
      )}
      <View style={{ flexDirection: "row", paddingTop: 10 }}>
        <Text>Tổng tiền</Text>
        <View style={{ flex: 1, paddingLeft: 10 }}></View>
        <Text>vnđ {currencyFormat(getSumDonHang(props.item))}</Text>
      </View>
      <View style={{ flexDirection: "row", paddingTop: 10 }}>
        <Text>Tài khoản {accountDetail?.accountType?.name}</Text>
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text>{accountDetail?.accountType?.distCount} %</Text>
        </View>
        <Text>
          vnđ -
          {currencyFormat(
            getDiscountDonHang(
              props.item,
              accountDetail?.accountType?.distCount
            )
          )}
        </Text>
      </View>
      <View style={{ flexDirection: "row", paddingTop: 10 }}>
        <Text>Tiền thành toán</Text>
        <View style={{ flex: 1, paddingLeft: 10 }}></View>
        <Text>
          vnđ
          {currencyFormat(
            getValueDonHang(props.item, accountDetail?.accountType?.distCount)
          )}
        </Text>
      </View>
      {/* <View style={{ flexDirection: "row", paddingTop: 10 }}>
        <Text>{props.item?.} sản phẩm</Text>
        <View style={{ flex: 1 }} />
        <Text>Thành tiền : vnđ {currencyFormat(priceSum)}</Text>
      </View> */}
    </View>
  );
}

const ItemDonHangItem = (props: { item: TypeDonHangItem }) => {
  const { listSanPhamView } = useAppSelector((s) => s.sanPhamView);
  const sanPhamView = listSanPhamView.find(
    (x) => x.id === props.item?.idDonGia
  );
  return (
    <View
      style={{
        flexDirection: "row",
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#aeaeae",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={
            sanPhamView?.avartarUri
              ? { uri: UrlHelper.urlFile + sanPhamView?.avartarUri }
              : require("../../../assets/images/logo/thinkfoodlogo.png")
          }
          style={{ width: 64, height: 40, borderRadius: 8 }}
        />
      </View>

      <View
        style={{
          flex: 4,
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: 10,
        }}
      >
        <Text style={{}}>{sanPhamView?.name}</Text>
        <View style={{ flex: 1 }} />
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text>vnđ {currencyFormat(props.item?.unitPrice)}</Text>
            <Text style={{ textAlign: "right" }}>x{props.item?.soLuong}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
