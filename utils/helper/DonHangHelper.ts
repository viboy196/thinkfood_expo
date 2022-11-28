const tag ='Đơn Hàng';

export type TypeDonHangItem = {
    idDonGia?:string;
    unitPrice?:number;
    soLuong?:number;
    note?:string;
}
export type StatusOnTime = {
    status?:string;
    time?:string;
}

export type TypeDonHang = {
    id: string,
    idKhachHang:string,
    idAddress?:string;
    hinhThucGiaoHang?:number;
    idDiemAmThuc?:string,
    shipPrice?:number,
    khuyenMai?:number,
    textKhuyenMai?:string
    listDonHangItem?: Array<TypeDonHangItem>,
    complete?:boolean,
    listStatus?:StatusOnTime[],
    createdAt?:string,
    updatedAt?:string,
    createdBy?:string,
    updatedBy?:string
  }

export type TypeDonHangCreate = {
    idKhachHang?:string,
    idAddress?:string,
    hinhThucGiaoHang?:number,
    idDiemAmThuc?:string,
    shipPrice?:number,
    khuyenMai?:number,
    textKhuyenMai?:string
    listDonHangItem?: Array<TypeDonHangItem>,
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