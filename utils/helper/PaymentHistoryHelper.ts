const tag ='lịch sử giao dịch';
export type TypePaymentHistory = {
    id?: string,
    idKhachHang:string,
    info?:string,
    price?:number,
    type?:string,
    action?:string,
    data?:string,
    createdAt?:string,
  }
export enum actionPayment  {
    pay = "pay",
    buyPackage = "buyPackage"
}