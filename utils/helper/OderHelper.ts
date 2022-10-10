const tag ='Đơn đặt';

export type StatusOnTime = {
    status?:string;
    time?:string;
}
export type TypeOder = {
    id: string,
    idKhachHang?:string,
    idDonHang?: string,
    idDonGia?: string,
    soLuong?:number,
    shipPrice?:number,
    unitPrice?:number,
    pttt?:number,
    idKhachHangGoiTieuDung?:string,
    complete?:boolean,
    listStatus?:Array<StatusOnTime>

  }
export type TypeOderCreate = {
    idKhachHang?:string,
    idDonHang?: string,
    idDonGia?: string,
    soLuong?:number,
    unitPrice?:number,
    shipPrice?:number,
}

export type TypeOderDetail = TypeOder & {
}

export const OderTitle ={
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
                info :`Thông tin ${tag}`,
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
                listMediaUri:'Media',
                addBtnMediaUri:'Thêm',
                button:'Cập nhật'
            }
        }
    
       
    
}