const tag ='Bảng giá';
export type TypeBangGia = {
    id: string,
    name:string,
    idLoaiBangGia?: string,
    idDiemAmThuc?:string,
    info?: string,
    avartarUri?: string,
    listMediaUri?: Array<string>,
  }

export type TypeBangGiaCreate = {
    name?:string,
    info?: string,
    idLoaiBangGia?: string,
    idDiemAmThuc?:string,
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export type TypeBangGiaDetail = TypeBangGia & {
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export const BangGiaTitle ={
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
                NguyenLieuChinh:"Thực phẩm cung cấp",
                info :`Thông tin ${tag}`,
                loaiBangGia : `Loại ${tag}`,
                diemAmThuc :`Điểm ẩm thực`,
                avartarUri :'Ảnh đại diện',
                addBtnMediaUri:'Thêm',
                button:'Tạo Mới',
                listMediaUri:'Media',
            }
        }
    ,
    modalDetail: {
            tag :`Chi tiết ${tag}`,
            input : {
                Name :`Tên ${tag}`,
                info :`Thông tin  ${tag}` ,
                avartarUri :'Ảnh đại diện',

                loaiBangGia : "Loại trang trại",
                editbtnavartarUri :'Cập nhật',
                button:'Cập nhật',
                listMediaUri:'Media',
                addBtnMediaUri:'Thêm'

            }
        }
    
       
    
}