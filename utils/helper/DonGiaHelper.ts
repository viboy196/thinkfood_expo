const tag ='Đơn giá';
export type TypeDonGia = {
    id: string,
    idBangGia:string,
    type?:number,
    idThucPhamTieuChuan?:string,
    idDoAn?:string,
    unitPrice? :number,
    idDonViDo?:string,
    isPublish?: boolean,
    oderPublish?:number,
    info?: string,
    avartarUri?: string,
    listMediaUri?:Array<string>,
  }

export type TypeDonGiaCreate = {
    idBangGia?:string,
    type?:number,
    idThucPhamTieuChuan?:string,
    idDoAn?:string,
    unitPrice? :number,
    idDonViDo?:string,
    isPublish?: boolean,
    oderPublish?:number,
    info?: string,
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export type TypeDonGiaDetail = TypeDonGia & {
    avartarImageFile?: File,
    listMediaFile?:Array<File>,
}

export enum DonGiaEnum {
    ThucPhamTieuChuan = 1,
    DoAn = 2
}

export const DonGiaTitle ={
    tag,
    board :{
        oder:'#',
        name : `Tên mặt hàng`,
        unitPrice:"Giá",
        DonViTinh :"Đơn vị tính",
        info :`Thông tin ${tag}`,
        avartarUri :'Ảnh đại diện',
        func :'Thao Tác'
    }
   ,
    modalCreate: {
            tag :`Thêm ${tag}`,
            input : {
                BangGia:'Bảng Giá',
                DoAn: 'Đồ ăn',
                
                ThucPhamTieuChuan: 'Thực Phẩm',
                DonViDo:'Đơn vị đo',
                unitPrice:'Đơn giá',

                type:'Loại',
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
                BangGia:'Bảng Giá',
                DoAn: 'Đồ ăn',
                
                ThucPhamTieuChuan: 'Thực Phẩm',
                DonViDo:'Đơn vị đo',
                unitPrice:'Đơn giá',

                type:'Loại',
                Name :`Tên ${tag}`,
                NguyenLieu:'Nguyên Liệu',
                info :`Thông tin ${tag}`,
                avartarUri :'Ảnh đại diện',
                addBtnMediaUri:'Thêm',
                button:'Tạo Mới',
                listMediaUri :'Danh sách media',
                editbtnavartarUri:'Chọn avatar'
            }
        }
    
       
    
}