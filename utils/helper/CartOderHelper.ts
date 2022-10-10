const tag ='Đơn đặt';


export type TypeCartOderItem = {
    chon?:boolean;
    idDonGia?:string;
    unitPrice?:number;
    soLuong?:number;
}

export type TypeCartOder = {
    id: string,
    idKhachHang?:string,
    listCart?:TypeCartOderItem[];

  }
export type TypeCartOderCreate = {
    idKhachHang?:string,
    listCart?:TypeCartOderItem[];
}

export type TypeCartOderDetail = TypeCartOder & {
}

export const CartOderTitle ={
    tag,
    board :{
        cartOder:'#',
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