const tag ='Gói tiêu dùng cho Khách Hàng';
export type TypeKhachHangGoiTieuDung = {
    id?: string,
    idKhachHang:string,
    idGoiTieuDung?: string,
    active?: boolean,
    status?:string,

  }

export type TypeKhachHangGoiTieuDungCreate = {
    idKhachHang?:string,
    idGoiTieuDung?: string,
    active?: boolean,
    status?:string,
}

export type TypeKhachHangGoiTieuDungDetail = TypeKhachHangGoiTieuDung & {
}

export const KhachHangGoiTieuDungTitle ={
    tag,
    board :{
        oder:'#',
        name : `tên Khách hàng`,
        info :`Thông tin gói tiêu dùng ${tag}`,
        avartarUri :'Ảnh đại diện',
        isPublish : 'Hiểm thị trên web',
        phone:'Số điện thoại',
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