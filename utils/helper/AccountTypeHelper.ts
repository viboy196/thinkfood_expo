const tag ='Loại tài khoản';

export type StatusOnTime = {
    status?:string;
    time?:string;
}
export type TypeAccountType = {
    id: string,
    name?:string,
    distCount?: number,
    code?: string,
    note?:string
  }
