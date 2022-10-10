import { TypeKhachHangGoiTieuDungCreate } from './../helper/KhachHangGoiTieuDungHelper';
import { AxiosRequestConfig } from "axios";
import { TypeKhachHangGoiTieuDungDetail } from "../helper/KhachHangGoiTieuDungHelper";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const KhachHangGoiTieuDungTag = 'KhachHangGoiTieuDung';

export default class KhachHangGoiTieuDungCrud {



  

  static getDetailPublish = async (id :string): Promise<ExcuteResult> => {
    const tag = `getDetailPublish ${KhachHangGoiTieuDungTag}`;
    const url = `/api/KhachHangGoiTieuDung/getDetailPublish?id=${id}&v=1.0`;
     console.log(`${tag} url :`, url);

    const config: AxiosRequestConfig = {
      headers: {
        accept: 'text/plain',
      },
    };

    const res = await axios.get(url , config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    
    return res.data as ExcuteResult;
  };
  
  static getAllByIdKhachHang = async (id :string , token:string): Promise<ExcuteResult> => {
    const tag = `getAllByIdKhachHang ${KhachHangGoiTieuDungTag}`;
    const url = `/api/KhachHangGoiTieuDung/getAllByIdKhachHang?id=${id}&v=1.0`;
     console.log(`${tag} url :`, url);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
      },
    };

    const res = await axios.get(url , config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    
    return res.data as ExcuteResult;
  };
  static GetAll = async (token:string): Promise<ExcuteResult> => {
    const tag = `all ${KhachHangGoiTieuDungTag}`;
    const url = `/api/KhachHangGoiTieuDung/all?v=1.0`;
     console.log(`${tag} url :`, url);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
      },
    };

    const res = await axios.get(url , config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    
    return res.data as ExcuteResult;
  };

  
  static detail = async (id :string , token : string): Promise<ExcuteResult> => {
    const tag = `detail ${KhachHangGoiTieuDungTag}`;
    const url = `/api/KhachHangGoiTieuDung/detail?id=${id}&v=1.0`;
     console.log(`${tag} url :`, url);

    const config: AxiosRequestConfig = {
      headers: {

        Authorization: `bearer ${token}`,
        accept: 'text/plain',
      },
    };

    const res = await axios.get(url , config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    
    return res.data as ExcuteResult;
  };

  static Add = async (
    token :string , 
    input : TypeKhachHangGoiTieuDungCreate): Promise<ExcuteResult> => {
    const tag = `Add ${KhachHangGoiTieuDungTag}`;
    const url = '/api/KhachHangGoiTieuDung/add?v=1.0';
    console.log(`url ${tag}`, url);

   


    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
        "Content-Type" : "application/json"
      },
    };
    const res = await axios.post(url , input , config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    
    return res.data as ExcuteResult;
  };
  static Update = async (token :string , input : TypeKhachHangGoiTieuDungDetail): Promise<ExcuteResult> => {
    const tag = `Update ${KhachHangGoiTieuDungTag}`;
    const url = '/api/KhachHangGoiTieuDung/update?v=1.0';
     console.log(`${tag} url :`, url);

    

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
        "Content-Type" : "application/json"
      },
    };
    const res = await axios.post(url , input , config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    
    return res.data as ExcuteResult;
  };

  static Delete = async (input :{token :string , id: string} ): Promise<ExcuteResult> => {
    const tag = `Delete ${KhachHangGoiTieuDungTag}`;
    const url = `/api/KhachHangGoiTieuDung/delete?id=${input.id}&v=1.0`
     console.log(`${tag} url :`, url);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${input.token}`,
        accept: 'text/plain',
      },
    };

    const res = await axios.get(url , config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    
    return res.data as ExcuteResult;
  };

  

}