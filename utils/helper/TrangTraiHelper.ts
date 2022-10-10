const tag ='Trang Trại';
export type TypeTrangTrai = {
    id: string,
    name:string,
    idLoaiTrangTrai?: string,
    listIdThucPhamTieuChuan?:Array<string>,
    info?: string,
    avartarUri?: string,
    listMediaUri?: Array<string>,
  }

export type TypeTrangTraiCreate = {
    name?:string,
    info?: string,
    idLoaiTrangTrai?: string,
    listIdThucPhamTieuChuan?:Array<string>,
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export type TypeTrangTraiDetail = TypeTrangTrai & {
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export const TrangTraiTitle ={
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
                loaiTrangTrai : "Loại trang trại",
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

                loaiTrangTrai : "Loại trang trại",
                editbtnavartarUri :'Cập nhật',
                button:'Cập nhật',
                listMediaUri:'Media',
                addBtnMediaUri:'Thêm'

            }
        }
    
       
    
}