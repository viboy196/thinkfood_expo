const tag ='Nhóm Sản Phẩm';




export type ItemDonGiaLive =  {
    isLive?:boolean;
    id?:string;
}
export type TypeNhomSanPham = {
    id: string,
    name:string,
    idLoaiGiaoDich?: string,
    listItemDonGia?:ItemDonGiaLive[],
    listIdSetDoAn?:string[],
    oderPublish?:number,
    isLive:boolean,
    info?: string,
    avartarUri?: string,
    listMediaUri?: Array<string>,
  }

export type TypeNhomSanPhamCreate = {
    name?:string,
    info?: string,
    idLoaiGiaoDich?: string,
    listIdSetDoAn?:string[],
    listItemDonGia?:ItemDonGiaLive[],
    oderPublish?:number,
    isLive?:boolean,
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export type TypeNhomSanPhamDetail = TypeNhomSanPham & {
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export const NhomSanPhamTitle ={
    tag,
    board :{
        oder:'#',
        name : `tên ${tag}`,
        nameSanPham:'Tên Sản Phẩm',
        info :`Thông tin ${tag}`,
        avartarUri :'Ảnh đại diện',
        func :'Thao Tác'
    }
   ,
    modalCreate: {
            tag :`Thêm ${tag}`,
            input : {
                Name :`Tên ${tag}`,
                LoaiGiaoDich:'Loại giao dịch',
                NguyenLieuChinh:"Thực phẩm cung cấp",
                info :`Thông tin ${tag}`,
                loaiNhomSanPham : "Loại trang trại",
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

                loaiNhomSanPham : "Loại trang trại",
                editbtnavartarUri :'Cập nhật',
                button:'Cập nhật',
                listMediaUri:'Media',
                addBtnMediaUri:'Thêm'

            }
        }
    
       
    
}