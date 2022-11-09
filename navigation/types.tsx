/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TypeDonGiaView } from "../redux/features/SanPhamViewSlices";
import { TypeAddressDetail } from "../utils/helper/AddressHelper";
import { TypeDauBep } from "../utils/helper/DauBepHelper";
import { TypeDonGia } from "../utils/helper/DonGiaHelper";
import { TypeLoaiGiaoDich } from "../utils/helper/LoaiGiaoDichHelper";
import { TypeMonAn } from "../utils/helper/MonAnHelper";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Main: NavigatorScreenParams<RootTabParamList> | undefined;
  Login: undefined;
  LoaiGiaoDich: { data: TypeLoaiGiaoDich };
  ListDonGia: { listIdDonGia?: Array<string> };
  FoodDeTail: TypeDonGiaView;
  FoodView: TypeMonAn;
  Cart: undefined;

  SearchDonGia: undefined;
  //info user
  PaymentHistory: undefined;

  Payment: undefined;

  PersoInfo: undefined;
  ServicePack: undefined;
  introduce: undefined;

  Address: undefined;

  AddAddress: undefined;
  UpdateAddress: { data: TypeAddressDetail };
  cheft: { data: TypeDauBep };

  // Recharge
  Recharge: undefined;
  WebView: { title: string; url: string };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TabHome: undefined;
  TabNetwork: undefined;
  TabPlus: undefined;
  TabShare: undefined;
  TabInfo: undefined;
  TabPay: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
