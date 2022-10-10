const tag ='Bài Viết';
export type TypeBaiViet = {
    id: string,
    name:string,
    idDiemAmThuc?:string,
    idLoaiBaiViet?:string,
    updateAt?:string,
    createAt?:string,
    info?: string,
    infoHtml?: string,
    isPublish?:boolean,
    oderPublish?:number,
    avartarUri?: string,
    listMediaUri?: Array<string>,

  }

export type TypeBaiVietCreate = {
    name?:string,
    info?: string,
    idDiemAmThuc?:string,
    idLoaiBaiViet?:string,
    infoHtml?: string,
    isPublish?:boolean,
    oderPublish?:number,
    avartarImageFile?: File,
    listMediaFile?: Array<File>,
}

export type TypeBaiVietDetail = TypeBaiViet & {
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export const BaiVietTitle ={
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
                
                infoHtml :`Thông tin HTML ${tag}`,

                isPublish : 'Hiểm thị trên web',
                
                oderPublish : 'Stt hiển thị',

                avartarUri :'Ảnh đại diện',
                listMediaUri:'Media',
                addBtnMediaUri:'Thêm',
                button:'Tạo Mới',
                diemAmThuc:'Điểm ẩm thực',
                loaiBaiViet:'Loại Bài viết',
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