import { ItemDonGiaLive } from './NhomSanPhamHelper';

import { Linking, Alert, Platform } from 'react-native';
import { TypeCartOderItem } from './CartOderHelper';
import { TypeAddress } from './AddressHelper';

export  const genListIdDonGia = (listItem: ItemDonGiaLive[]): string[] => {
    let arr: string[] = [];
    listItem.forEach((x) => {
      if (x.id) {
        arr.push(x.id);
      }
    });
    return arr;
  };

  export const  currencyFormat = (num:number) :string => {
    if( typeof num === 'number' )
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return '';
 }


export const callNumber = (phone:string) => {
  console.log('callNumber ----> ', phone);
  let phoneNumber = phone;
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
  }
  else  {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
  .then(supported => {
    if (!supported) {
      Alert.alert('Phone number is not available');
    } else {
      return Linking.openURL(phoneNumber);
    }
  })
  .catch(err => console.log(err));
};

export const sumPriceCart = (_listCartItem: TypeCartOderItem[]) => {
  let sum = 0;
  _listCartItem.forEach((x) => {
    if (x.chon === true) {
      sum = sum + x.unitPrice * x.soLuong;
    }
  });
  return sum;
};

export const numActive = (_listCartItem: TypeCartOderItem[]): number => {
  let No = 0;
  _listCartItem.forEach((x) => {
    if (x.chon === true) {
      No++;
    }
  });
  return No;
};

export const getStringAddress = (address:TypeAddress):string =>{
  let s = '';
  if(address.receiverName ){
    s = s + address.receiverName + ' | ';
  }
  
  if(address.phone  ){
    s = s + address.phone + ' , ';
  }
  
  if(address.address  ){
    s = s + address.address + ' , ';
  }
  
  if(address.ward  ){
    s = s + address.ward + ' , ';
  }
  
  if(address.district  ){
    s = s + address.district + ' , ';
  }
  
  if(address.province  ){
    s = s + address.province + ' . ';
  }
  return  s;
}