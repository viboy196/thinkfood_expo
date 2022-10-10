import { MonAnTitle } from './MonAnHelper';

const tag ='Loại điểm ẩm thực';
export type TypeLoaiDiemAmThuc = {
    id: string,
    name:string,
    code:string,
    isPublish?: boolean,
    oderPublish?:number,
    info?: string,
    avartarUri?: string,
    listMediaUri?:Array<string>,
}

export type TypeLoaiDiemAmThucCreate = {
    name?:string,
    info?: string,
    isPublish?: boolean,   
    oderPublish:number,
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export type TypeLoaiDiemAmThucDetail = TypeLoaiDiemAmThuc & {
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export const LoaiDiemAmThucTitle ={
    tag,
    board :{
        oder:'#',
        name : `tên ${tag}`,
        
        Food : `${MonAnTitle.tag}`,
        
        oderPublish : `thứ tự hiển thị`,


        info :`Thông tin ${tag}`,
        avartarUri :'Ảnh đại diện',
        func :'Thao Tác'
    },
   
    modalCreate: {
            tag :`Thêm ${tag}`,
            input : {
                Name :`Tên ${tag}`,
                Food : `${MonAnTitle.tag}`,

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
                Food : `${MonAnTitle.tag}`,
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