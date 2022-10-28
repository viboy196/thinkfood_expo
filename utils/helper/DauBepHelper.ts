const tag ='Đầu bếp';
export type TypeDauBep = {
    id: string,
    name:string,
    address?: string,
    phone?:Array<string>,
    info?: string,
    avartarUri?: string,
  }

export type TypeDauBepCreate = {
    name:string,
    address?: string,
    phone?:Array<string>,
    info?: string,
    avartarImageFile?: File,
}

export type TypeDauBepDetail = TypeDauBep & {
    avartarImageFile?: File,
}

export const DauBepTitle ={
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

                editbtnavartarUri :'Cập nhật',
                button:'Cập nhật',
                listMediaUri:'Media',
                addBtnMediaUri:'Thêm'

            }
        }
    
       
    
}