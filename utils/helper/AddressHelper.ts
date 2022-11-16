import { Region } from "react-native-maps";

const tag ='Địa chỉ';



export type TypeAddress = {
    id: string,
    receiverName?:string,
    address?:string,
    province?: string,
    isDefault?:boolean,
    district?: string,
    ward?: string,
    type?: string,
    idConnect?: string,
    phone?: string,
    region?:Region
  }

export type TypeAddressCreate = {
    receiverName?:string,
    address?:string,
    province?: string,
    isDefault?:boolean,
    district?: string,
    ward?: string,
    type?: string,
    idConnect?: string,
    phone?: string,
    region?:Region
}

export type TypeAddressDetail = TypeAddress & {
   
}

export const AddressTitle ={
    tag,
    board :{
        oder:'#',
        name : `tên ${tag}`,
        info :`Thông tin ${tag}`,
        avartarUri :'Ảnh đại diện',
        func :'Thao Tác'
    }
   ,
    modalCreate: {
            tag :`Thêm ${tag}`,
            input : {
                Name :`Tên ${tag}`,
                info :`Thông tin ${tag}`,
                avartarUri :'Ảnh đại diện',
                listMediaUri:'Media',
                addBtnMediaUri:'Thêm',
                button:'Tạo Mới'
            }
        }
    ,
    modalDetail: {
            tag :`Chi tiết ${tag}`,
            input : {
                Name :`Tên ${tag}`,
                info :`Thông tin  ${tag}` ,
                avartarUri :'Ảnh đại diện',
                editbtnavartarUri :'Cập nhật',
                listMediaUri:'Media',
                addBtnMediaUri:'Thêm',
                button:'Cập nhật'
            }
        }
    
       
    
}