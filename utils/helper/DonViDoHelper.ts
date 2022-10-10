const tag ='Đơn vị đo';
export type TypeDonViDo = {
    id: string,
    idLoaiDonViDo:string,
    name:string,
    info?: string,
    avartarUri?: string,
    listMediaUri?:Array<string>,

  }

export type TypeDonViDoCreate = {
    name?:string,
    idLoaiDonViDo?:string,
    info?: string,
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export type TypeDonViDoDetail = TypeDonViDo & {
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export const DonViDoTitle ={
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
                LoaiDonViDo:'Loại Nguyên Liệu',
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