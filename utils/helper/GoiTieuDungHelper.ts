const tag ='Gói tiêu dùng';
export type TypeGoiTieuDung = {
    id: string,
    name:string,
    info?: string,
    infoHtml?: string,
    isPublish?:boolean,
    price?:number,
    oderPublish?:number,
    avartarUri?: string,
    listMediaUri?: Array<string>,

  }

export type TypeGoiTieuDungCreate = {
    name?:string,
    info?: string,
    infoHtml?: string,
    isPublish?:boolean,
    price?:number,
    oderPublish?:number,
    avartarImageFile?: File,
    listMediaFile?: Array<File>,
}

export type TypeGoiTieuDungDetail = TypeGoiTieuDung & {
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export const GoiTieuDungTitle ={
    tag,
    board :{
        oder:'#',
        name : `tên ${tag}`,
        info :`Thông tin ${tag}`,
        avartarUri :'Ảnh đại diện',
        isPublish : 'Hiểm thị trên web',
        oderPublish : 'Stt hiển thị',
        func :'Thao Tác'
    }
   ,
    modalCreate: {
            tag :`Thêm ${tag}`,
            input : {
                Name :`Tên ${tag}`,
                info :`Thông tin ${tag}`,
                price : `Giá ${tag}`,
                
                infoHtml :`Thông tin HTML ${tag}`,

                isPublish : 'Hiểm thị trên web',
                
                oderPublish : 'Stt hiển thị',

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
                isPublish : 'Hiểm thị trên web',
                oderPublish : 'Stt hiển thị',
                listMediaUri:'Media',
                addBtnMediaUri:'Thêm',
                button:'Cập nhật'
            }
        }
    
       
    
}