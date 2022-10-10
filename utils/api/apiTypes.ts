export interface ExcuteResult {
  code?: string;
  errorMessage?: string;
  result?: any | string;
}

export type InputRegister = {
  userName: string;
  passwordHash: string;
  fullName: string;
};

export type InfoResult = {
  id?: string;
  name?: string;
  dsNhanVienModel?: [];
};



export enum ResultStatusCode {
  success = '00'
}