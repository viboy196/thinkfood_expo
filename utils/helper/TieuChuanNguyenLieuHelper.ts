const tag ='Loại Nguyên Liệu';
export type TypeTieuChuanNguyenLieu = {
    id: string,
    name:string,
    info?: string,
    avartarUri?: string,
  }

export type TypeTieuChuanNguyenLieuCreate = {
    name?:string,
    info?: string,
    avartarImageFile?: File,
}

export type TypeTieuChuanNguyenLieuDetail = TypeTieuChuanNguyenLieu & {
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export const TieuChuanNguyenLieuTitle ={
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
                button:'Cập nhật'
            }
        }
    
       
    
}