import { MonAnTitle } from './MonAnHelper';

// public bool? isBook { get; set; }
// public string? timeBook { get; set; }

const tag ='Đồ ăn';
export type TypeDoAn = {
    id: string,
    name:string,
    info?: string,
    idMonAn?: string,
    listIdThucPhamTieuChuan?:Array<string>,
    idDauBep?:string,
    isPublish?: boolean,
    oderPublish?:number,
    avartarUri?: string,
    listMediaUri?:Array<string>,
    isBook?:boolean,
    timeBook?:string
}

export type TypeDoAnCreate = {
    name?:string,    
    idMonAn?:string,
    listIdThucPhamTieuChuan?:Array<string>,
    isPublish?: boolean,
    idDauBep?:string,
    oderPublish:number,
    info?: string,
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
    isBook?:boolean,
    timeBook?:string
}

export type TypeDoAnDetail = TypeDoAn & {
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export const DoAnTitle ={
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
                NguyenLieuChinh:" Nguyên Liệu Chính",

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