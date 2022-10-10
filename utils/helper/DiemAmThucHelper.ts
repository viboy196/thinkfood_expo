
const tag ='Điểm ẩm thực';

export type TypeDiemAmThuc = {
    id: string,
    name:string,
    address?:string,
    idLoaiDiemAmThuc?:string,
    isPublish?: boolean,
    oderPublish?:number,
    info?: string,
    avartarUri?: string,
    listMediaUri?:Array<string>,
}

export type TypeDiemAmThucCreate = {
    name?:string,
    address?:string,
    idLoaiDiemAmThuc?:string,
    info?: string,
    isPublish?: boolean,   
    oderPublish:number,
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export type TypeDiemAmThucDetail = TypeDiemAmThuc & {
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export const DiemAmThucTitle ={
    tag,
    board :{
        oder:'#',
        name : `tên ${tag}`,
        address : `địa chỉ`,
        oderPublish : `STT hiển thị`,


        info :`Thông tin ${tag}`,
        avartarUri :'Ảnh đại diện',
        func :'Thao Tác'
    },
   
    modalCreate: {
            tag :`Thêm ${tag}`,
            input : {
                Name :`Tên ${tag}`,
                address : `địa chỉ`,
                LoaiDiemAmThuc :'Loại điểm ẩm thực',
                info :'Thông tin',
                avartarUri :'Ảnh đại diện',
                listMediaUri : 'Danh sách Media',
                addBtnMediaUri:'Thêm',
                button:'Tạo Mới',
                
                isPublish :'Hiểm thị trên Page',

            }
        }
    ,
    modalDetail: {
            tag :`Chi tiết ${tag}`,
            input : {
                Name :`Tên ${tag}`,
                address : `địa chỉ`,
                isPublish :'Hiểm thị trên Page',

                info :'Thông tin',
                avartarUri :'Ảnh đại diện',
                editbtnavartarUri :'Cập nhật',
                listMediaUri : 'Danh sách Media',
                addBtnMediaUri:'Thêm ảnh',
                button:'Cập nhật',
                oderPublish:'Số thứ tự hiển thị'
            }
        }
    
       
    
}