const tag ='Nguyên Liệu';
export type TypeNguyenLieu = {
    id: string,
    idLoaiNguyenLieu:string,
    name:string,
    info?: string,
    avartarUri?: string,
    listMediaUri?:Array<string>,

  }

export type TypeNguyenLieuCreate = {
    name?:string,
    idLoaiNguyenLieu?:string,
    info?: string,
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export type TypeNguyenLieuDetail = TypeNguyenLieu & {
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export const NguyenLieuTitle ={
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
                LoaiNguyenLieu:'Loại Nguyên Liệu',
                info :`Thông tin ${tag}`,
                avartarUri :'Ảnh đại diện',
                addBtnMediaUri:'Thêm',
                button:'Tạo Mới',
                listMediaUri :'Danh sách media'
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
                listMediaUri :'Danh sách media',
                addBtnMediaUri:'thêm',
                button:'Cập nhật'
            }
        }
    
       
    
}