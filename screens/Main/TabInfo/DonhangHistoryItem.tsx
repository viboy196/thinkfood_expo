import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { TypeOder } from "../../../utils/helper/OderHelper";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { UrlHelper } from "../../../utils/helper/UrlHelper";

import {
  TypeDonHang,
  TypeDonHangItem,
} from "../../../utils/helper/DonHangHelper";
import { TypeDiemAmThuc } from "../../../utils/helper/DiemAmThucHelper";
import { TypeAddress } from "../../../utils/helper/AddressHelper";

import { codeRole, useAuth } from "../../../utils/helper/role";
import AddressCrud from "../../../utils/api/AddressCrud";
import { ResultStatusCode } from "../../../utils/api/apiTypes";
import {
  currencyFormat,
  getDiscountDonHang,
  getStatusByStatusCode,
  getSumDonHang,
  getTimeByString,
  getValueDonHang,
} from "../../../utils/helper/HelperFunc";

export default function DonhangHistoryItem(props: {
  item: TypeDonHang;
  goToDetail: (item: TypeDonHang) => void;
  goToRefund: (item: TypeDonHang) => void;
}) {
  const { listDiemAmThuc } = useAppSelector((s) => s.DiemAmThuc);
  const { accountDetail } = useAppSelector((s) => s.auth);
  const [visible, setVisible] = React.useState<boolean>(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const dispatch = useAppDispatch();
  const roleBusiness = useAuth({ roleRequired: codeRole.businessAdmin });

  const [diemAmThuc, setDiemAmThuc] = useState<TypeDiemAmThuc>();
  useEffect(() => {
    if (listDiemAmThuc && props.item.idDiemAmThuc) {
      const dat = listDiemAmThuc.find((x) => x.id === props.item.idDiemAmThuc);
      if (dat) {
        setDiemAmThuc(dat);
      }
    }
  }, [listDiemAmThuc, props.item.idDiemAmThuc]);

  const [address, setAddress] = useState<TypeAddress>();
  useEffect(() => {
    if (props.item.idAddress) {
      AddressCrud.getDetailPublish(props.item.idAddress).then((res) => {
        if (res.code === ResultStatusCode.success) {
          setAddress(res.result);
        }
      });
    }
  }, [props.item.idAddress]);

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

      <View style={{ flexDirection: "row", paddingTop: 10 }}>
        <Text>Tổng :</Text>
        <View style={{ flex: 1, paddingLeft: 10 }}></View>
        <Text>{currencyFormat(getSumDonHang(props.item))} vnđ</Text>
      </View>
      {accountDetail?.accountType && (
        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          <Text>Tài khoản {accountDetail?.accountType?.name}</Text>
          <View style={{ flex: 1, paddingLeft: 10 }}>
            <Text>{accountDetail?.accountType?.distCount} %</Text>
          </View>
          <Text>
            -
            {currencyFormat(
              getDiscountDonHang(
                props.item,
                accountDetail?.accountType?.distCount
              )
            )}{" "}
            vnđ
          </Text>
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
          <Text>-{currencyFormat(Number(props.item?.khuyenMai))} vnđ</Text>
        </View>
      )}
      {props.item?.shipPrice !== undefined && (
        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          <Text>Phí ship</Text>
          <View style={{ flex: 1 }} />
          <Text>{currencyFormat(Number(props.item?.shipPrice))} vnđ</Text>
        </View>
      )}
      <View style={{ flexDirection: "row", paddingTop: 10 }}>
        <Text>Tiền thành toán</Text>
        <View style={{ flex: 1, paddingLeft: 10 }}></View>
        <Text>
          {currencyFormat(
            getValueDonHang(props.item, accountDetail?.accountType?.distCount)
          )}{" "}
          vnđ
        </Text>
      </View>

      <View
        style={{
          padding: 5,
          borderBottomWidth: 1,
          borderColor: "#aeaeae",
        }}
      >
        <Text>Thông tin khách hàng : </Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text>Khách Hàng : </Text>
          <View style={{ flex: 1 }} />
          <Text>{accountDetail?.fullName}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          padding: 5,
          borderBottomWidth: 1,
          borderColor: "#aeaeae",
        }}
      >
        <Text>Thời gian đặt : </Text>
        <View style={{ flex: 1 }} />
        <Text>{getTimeByString(props.item?.createdAt)}</Text>
      </View>
      {props.item?.receivingTime && (
        <View
          style={{
            flexDirection: "row",
            padding: 5,
            borderBottomWidth: 1,
            borderColor: "#aeaeae",
          }}
        >
          <Text>Thời gian muốn nhận hàng : </Text>
          <View style={{ flex: 1 }} />
          <Text>{getTimeByString(props.item?.receivingTime)}</Text>
        </View>
      )}
      {props.item?.note && (
        <View
          style={{
            flexDirection: "row",
            padding: 5,
            borderBottomWidth: 1,
            borderColor: "#aeaeae",
          }}
        >
          <Text>Ghi chú : </Text>
          <View style={{ flex: 1 }} />
          <Text>{props.item?.note}</Text>
        </View>
      )}
      {/* <View
        style={{ padding: 10, borderBottomWidth: 1, borderColor: "#aeaeae" }}
      >
        <Text>Địa chỉ nhận hàng : </Text>
        <View style={{ flexDirection: "row" }}>
          <Text>Người nhận : </Text>
          <View style={{ flex: 1 }} />
          <Text>{address?.receiverName}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>SĐT : </Text>
          <View style={{ flex: 1 }} />
          <Text>{address?.phone}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>Địa chỉ : </Text>
          <View style={{ flex: 1 }} />
          <Text>{address?.address}</Text>
        </View>
      </View> */}
    </View>
  );
}

const ItemDonHangItem = (props: { item: TypeDonHangItem }) => {
  const { listSanPhamView } = useAppSelector((s) => s.sanPhamView);
  const sanPhamView = listSanPhamView
    ? listSanPhamView.find((x) => x.id === props.item?.idDonGia)
    : undefined;
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
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: 10,
          paddingLeft: 5,
        }}
      >
        <Text style={{ flex: 1 }}>{sanPhamView?.name}</Text>

        <View style={{ flexDirection: "row", paddingLeft: 5 }}>
          <View>
            <Text>{currencyFormat(props.item?.unitPrice)} vnđ</Text>
            <Text style={{ textAlign: "right" }}>x{props.item?.soLuong}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
