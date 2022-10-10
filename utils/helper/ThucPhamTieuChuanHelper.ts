const tag ='Thực phẩm tiêu chuẩn';
export type TypeThucPhamTieuChuan = {
    id: string,
    idNguyenLieu:string,
    name:string,
    info?: string,
    avartarUri?: string,
    listMediaUri?:Array<string>,

  }

export type TypeThucPhamTieuChuanCreate = {
    name?:string,
    idNguyenLieu?:string,
    info?: string,
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export type TypeThucPhamTieuChuanDetail = TypeThucPhamTieuChuan & {
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export const ThucPhamTieuChuanTitle ={
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
                NguyenLieu:'Nguyên Liệu',
                info :`Thông tin ${tag}`,
                avartarUri :'Ảnh đại diện',
                addBtnMediaUri:'Thêm',
                button:'Tạo Mới',
                listMediaUri :'Danh sách media'
            }
        }
    ,
    modalDetail: {
            tag :`Chi tiết ${tag}`,
            input : {
                Name :`Tên ${tag}`,
                info :`Thông tin  ${tag}` ,
                NguyenLieu:'Nguyên Liệu',
                avartarUri :'Ảnh đại diện',
                editbtnavartarUri :'Cập nhật',
                listMediaUri :'Danh sách media',
                addBtnMediaUri:'thêm',
                button:'Cập nhật'
            }
        }
    
       
    
}