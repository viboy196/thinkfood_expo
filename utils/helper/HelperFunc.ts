import { ItemDonGiaLive } from './NhomSanPhamHelper';

import { Linking, Alert, Platform } from 'react-native';

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