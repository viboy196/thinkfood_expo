const tag ='Loại giao dịch';
export type TypeLoaiGiaoDich = {
    id: string,
    name:string,
    info?: string,
    avartarUri?: string,
    listMediaUri?: Array<string>,

  }

export type TypeLoaiGiaoDichCreate = {
    name?:string,
    info?: string,
    avartarImageFile?: File,
    listMediaFile?: Array<File>,
}

export type TypeLoaiGiaoDichDetail = TypeLoaiGiaoDich & {
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export const LoaiGiaoDichTitle ={
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