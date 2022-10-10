const tag ='Loại Nguyên Liệu';
export type TypeChungLoaiNguyenLieu = {
    id: string,
    name:string,
    info?: string,
    avartarUri?: string,
  }

export type TypeChungLoaiNguyenLieuCreate = {
    name?:string,
    info?: string,
    avartarImageFile?: File,
}

export type TypeChungLoaiNguyenLieuDetail = TypeChungLoaiNguyenLieu & {
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export const ChungLoaiNguyenLieuTitle ={
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