const tag ='Đơn Hàng';

export type TypeDonHangItem = {
    idDonGia?:string;
    shipPrice?:number;
    unitPrice?:number;
    soLuong?:number;
    note?:string;
    pttt?:number;
    idKhachHangGoiTieuDung?:string;
}
export type TypeDonHang = {
    id: string,
    hinhThucGiaoHang?:number;
    idAddress?:number;
    idKhachHang:string,
    listDonHangItem?: Array<TypeDonHangItem>,
    active?: boolean,
    status?:string,

  }

export type TypeDonHangCreate = {
    hinhThucGiaoHang?:number;
    idAddress?:string;
    idKhachHang?:string,
    listDonHangItem?: Array<TypeDonHangItem>,
    active?: boolean,
    status?:string,
}

export type TypeDonHangDetail = TypeDonHang & {
   
}

export const DonHangTitle ={
    tag,
    board :{
        oder:'#',
        name : `tên ${tag}`,
        info :`Thông tin ${tag}`,
        avartarUri :'Ảnh đại diện',
        detail:'Chi tiết',
        isPublish : 'Hiểm thị trên web',
        oderPublish : 'Stt hiển thị',
        func :'Thao Tác'
    }
   ,
    modalCreate: {
            tag :`Thêm ${tag}`,
            input : {
                Name :`Tên ${tag}`,
                info :`Thông tin ${tag}`,
                
                infoHtml :`Thông tin HTML ${tag}`,

                isPublish : 'Hiểm thị trên web',
                
                oderPublish : 'Stt hiển thị',

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
                isPublish : 'Hiểm thị trên web',
                oderPublish : 'Stt hiển thị',
                listMediaUri:'Media',
                addBtnMediaUri:'Thêm',
                button:'Cập nhật'
            }
        }
    
       
    
}