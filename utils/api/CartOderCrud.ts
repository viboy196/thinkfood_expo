import { TypeCartOderCreate } from './../helper/CartOderHelper';
import { AxiosRequestConfig } from "axios";
import { TypeCartOderDetail } from "../helper/CartOderHelper";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const CartOderTag = 'CartOder';

export default class CartOderCrud {


  static GetAll = async (token :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${CartOderTag}`;
    const url = '/api/CartOder/all?v=1.0';
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
  
  static GetAllPublish = async (): Promise<ExcuteResult> => {
    const tag = `GetAllPublish ${CartOderTag}`;
    const url = '/api/CartOder/all?v=1.0';
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

  static getDetailPublish = async (id :string ): Promise<ExcuteResult> => {
    const tag = `getDetailPublish ${CartOderTag}`;
    const url = `/api/CartOder/detail?id=${id}&v=1.0`;
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
  
  static detailByIdKhachHang = async (
    id:string,
    token :string , ): Promise<ExcuteResult> => {
    const tag = `detailByIdKhachHang ${CartOderTag}`;
    const url = `/api/CartOder/detailByIdKhachHang?id=${id}&v=1.0`;
    console.log(`url ${tag}`, url);

    


    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
        "Content-Type" : "application/json"
      },
    };
    const res = await axios.get(url  , config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    
    return res.data as ExcuteResult;
  };

  static Update = async (token :string , input : TypeCartOderDetail): Promise<ExcuteResult> => {
    const tag = `Update ${CartOderTag}`;
    const url = '/api/CartOder/update?v=1.0';
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
    const tag = `Delete ${CartOderTag}`;
    const url = `/api/CartOder/delete?id=${input.id}&v=1.0`
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