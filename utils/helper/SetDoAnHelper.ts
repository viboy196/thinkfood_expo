const tag ='Set Đồ Ăn ';

export type TypeSetDoAnItem = {
    idDoAn?:string;
    type?:boolean;
    isSelect?:boolean;
}
export type TypeSetDoAn = {
    id: string,
    name?:string,
    unitPrice?:number,
    listSetDoAnItem?: Array<TypeSetDoAnItem>,
    countFood:number,
    isPublish?: boolean,
    info?:string,
    infoHtml?:string
    avartarUri?: string,
    listMediaUri?:Array<string>,

  }

export type TypeSetDoAnCreate = {
    name?:string;
    unitPrice?:number;
    listSetDoAnItem?: Array<TypeSetDoAnItem>,
    isPublish?: boolean,
    countFood?:number,
    infoHtml?:string
    info?:string,
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export type TypeSetDoAnDetail = TypeSetDoAn & {
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export const SetDoAnTitle ={
    tag,
    board :{
        oder:'#',
        name : `tên ${tag}`,
        info :`Thông tin ${tag}`,
        avartarUri :'Ảnh đại diện',
        detail:'Chi tiết',
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