import { color2 } from './Color';
import { ItemDonGiaLive } from './NhomSanPhamHelper';

import { Linking, Alert, Platform } from 'react-native';
import { TypeCartOderItem } from './CartOderHelper';
import { TypeAddress } from './AddressHelper';
import * as Device from 'expo-device';
import { TypeDonHang } from './DonHangHelper';

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

export const getSumDonHang = (donHang : TypeDonHang) => {
  let sum = 0;

  if(donHang.listDonHangItem){
      donHang.listDonHangItem.forEach(x => {
          let unitPrice = x.unitPrice ? x.unitPrice : 0;
          
          let soLuong = x.soLuong ? x.soLuong : 0;

          sum = sum  + unitPrice*soLuong;
      })
  
  }
  return sum
}

export const getDiscountDonHang = (donHang : TypeDonHang , percent?:number) => {
  const _percent = percent ? percent : 0; 
  
  var sum = getSumDonHang(donHang);
  return sum*_percent/100;
} 
export const getValueDonHang = (donHang : TypeDonHang , percent?:number) => {
  const _percent = percent ? percent : 0; 

  let shipPrice = donHang.shipPrice ? donHang.shipPrice : 0;
  
  let khuyenMai = donHang.khuyenMai ? donHang.khuyenMai : 0;
  var sum = getSumDonHang(donHang);
  var discount = sum - sum*_percent/100 -Math.abs(khuyenMai) + Math.abs(shipPrice);
  return discount;
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

export const getStatusDoAn = (statusCode :string ,  activeTime?:string):{text:string , color:string ,backgroundColor:string} =>{

  if(statusCode  === '01'){
    if(activeTime){
      let arr :number[]= [];
      let num = 0;
      for (var i = 0; i < activeTime.length; i++) {
        var _num = Number(activeTime[i]);
        if(!isNaN(_num)){
          num = 10*num + _num;
          
        }else{
          arr.push(num);
          num = 0;
        }
      }
      
      arr.push(num);
      
      var timeStart = arr[0]*60 + arr[1];
      
      var timeEnd = arr[2]*60 + arr[3];
      var timeNow = (new Date().getHours())*60 + (new Date().getMinutes());

      if(timeNow >= timeStart && timeNow <= timeEnd){

        return {text: 'Có sẵn' , color:'#fff' , backgroundColor:color2}
      }
      else{
      return {text: 'Bán từ ' + activeTime ,color:'red' , backgroundColor:'#fff'}
      }
    }
    return {text: 'Có sẵn' , color:'#fff' , backgroundColor:color2}
  }
  if(statusCode  === '02'){
    return {text: 'Sắp ra mắt' , color:'red' , backgroundColor:'#fff'}
  }
  if(statusCode  === '03'){
    return {text: 'Đã hết hàng' , color:'red' , backgroundColor:'#fff'}
  }
  if(statusCode  === '04'){
    return {text: 'Đặt trước' , color:'#fff' , backgroundColor:color2  }
  }
  return {text:  'Sắp  ra mắt' , color:'red' , backgroundColor:'#fff'}
  
}

export const getMaginTopByDevice = ():number =>{
  console.log(Device.osName);
  
  var modelName = Device.osName;

  if(modelName === 'iOS'){
    return 30;
  }

  return 0;

}

export const getStatusByStatusCode = (statusCode? :string) => {
  let status = '';
  switch(statusCode){
      case "00":
          status = "Tạo đơn Hàng";
          break;
      case "01" : 
          status = "Đang  chế biến";
          break;
      case "02" : 
          status =  "Đang  vận chuyển";
          break;
      case "10":
          status = "Hoàn thành đơn hàng";
          break; 
      default:
          status = "";
  }
  return  status;
}

export function getTimeByString(str? :string){
  if(str === undefined) return '';
  

  if(str === '0001-01-01T00:00:00Z') return '';
  try {
      const date = new Date(str);
      return ` ${date.getHours()}:${date.getMinutes()} -` + ` ${date.getDate()}/${date.getMonth() +1}`;
  } catch (e) {
      return ''
  }
} 
