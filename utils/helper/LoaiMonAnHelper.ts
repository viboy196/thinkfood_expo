const tag ='Loại Món Ăn';
export type TypeLoaiMonAn = {
    id: string,
    name:string,
    code: string,
    type?: string,
    info?: string,
    avartarUri?: string,
    numProd?:number,
    listMediaUri?:Array<string>,
    isPublish?:boolean,
    oderPublish?:string
}

export type TypeLoaiMonAnCreate = {
    name?:string,
    info?: string,
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
    isPublish?:boolean,
    oderPublish?:string
}

export type TypeLoaiMonAnDetail = TypeLoaiMonAn & {
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export const LoaiMonAnTitle ={
    tag,
   
    modalCreate: {
            tag :"Thêm Loại Món Ăn",
            input : {
                Name :'Tên loại món ăn',
                info :'Thông tin',
                avartarUri :'Ảnh đại diện',
                isPublish : 'Xuất hiện ngoài trang chủ',
                listMediaUri : 'Danh sách Media',
                addBtnMediaUri:'Thêm',
                button:'Tạo Mới'
            }
        }
    ,
    modalDetail: {
            tag :"Chi tiết Loại Món Ăn",
            input : {
                Name :'Tên loại món ăn',
                
                Code :'Mã loại món ăn',

                info :'Thông tin',
                oderPublish : 'Thức tự publish',
                avartarUri :'Ảnh đại diện',
                editbtnavartarUri :'Cập nhật',
                isPublish : 'Xuất hiện ngoài trang chủ',
                listMediaUri : 'Danh sách Media',
                addBtnMediaUri:'Thêm ảnh',
                button:'Cập nhật'
            }
        }
    
       
    
}