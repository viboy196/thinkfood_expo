const tag ='Loại Nguyên Liệu';
export type TypeLoaiNguyenLieu = {
    id: string,
    name:string,
    info?: string,
    avartarUri?: string,
    listMediaUri?: Array<string>,

  }

export type TypeLoaiNguyenLieuCreate = {
    name?:string,
    info?: string,
    avartarImageFile?: File,
    listMediaFile?: Array<File>,
}

export type TypeLoaiNguyenLieuDetail = TypeLoaiNguyenLieu & {
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export const LoaiNguyenLieuTitle ={
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