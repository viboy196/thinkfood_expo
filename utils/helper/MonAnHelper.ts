import { LoaiMonAnTitle } from './LoaiMonAnHelper';
const tag ='Món Ăn';
export type TypeMonAn = {
    id: string,
    name:string,
    info?: string,
    avartarUri?: string,
    listIdLoaiMonAn?:Array<string>,
    listIdThucPhamTieuChuan?:Array<string>,
    listMediaUri?:Array<string>,
    isPublishHome?:boolean,
    isPublishPage?:boolean,
    oderPublish:number,
}

export type TypeMonAnCreate = {
    name?:string,
    info?: string,
    listIdLoaiMonAn?:Array<string>,
    listIdThucPhamTieuChuan?:Array<string>,
    isPublishHome?:boolean,
    isPublishPage?:boolean,
    oderPublish:number,
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export type TypeMonAnDetail = TypeMonAn & {
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export const MonAnTitle ={
    tag,
    board :{
        oder:'#',
        name : `tên ${tag}`,
        
        typeFood : `${LoaiMonAnTitle.tag}`,
        
        oderPublish : `thứ tự hiển thị`,


        info :`Thông tin ${tag}`,
        avartarUri :'Ảnh đại diện',
        func :'Thao Tác'
    },
   
    modalCreate: {
            tag :`Thêm ${tag}`,
            input : {
                Name :`Tên ${tag}`,
                FoodType :`${LoaiMonAnTitle.tag}`,
                NguyenLieuChinh :`Nguyên Liệu Chính`,
                info :'Thông tin',
                avartarUri :'Ảnh đại diện',
                listMediaUri : 'Danh sách Media',
                addBtnMediaUri:'Thêm',
                button:'Tạo Mới',
                isPublishHome :'Hiểm thị ngoài trang chủ',
                
                isPublishPage :'Hiểm thị trên Page',

            }
        }
    ,
    modalDetail: {
            tag :`Chi tiết ${tag}`,
            input : {
                Name :`Tên ${tag}`,
                FoodType :`${LoaiMonAnTitle.tag}`,
                

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