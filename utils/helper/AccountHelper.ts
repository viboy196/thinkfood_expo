import { TypeAccountType } from "./AccountTypeHelper";

const tag ='Tài Khoản';


export type TypeAccount = {
    id: string,
    phone?:string,
    code?:string,
    fullName?: string,
    name?: string,
    accountType?:TypeAccountType,
    birthOfDate?: string,
    email?: string,
    linkImageAvatar?: string,
  }
