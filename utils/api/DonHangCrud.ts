import { TypeDonHangCreate } from './../helper/DonHangHelper';
import { AxiosRequestConfig } from "axios";
import { TypeDonHangDetail } from "../helper/DonHangHelper";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const DonHangTag = 'DonHang';

export default class DonHangCrud {


  static GetAll = async (token :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${DonHangTag}`;
    const url = '/api/DonHang/all?v=1.0';
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
  
  static getAllByIdKhachHang = async (id:string , token :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${DonHangTag}`;
    const url = `/api/DonHang/getAllByIdKhachHang?id=${id}&v=1.0`;
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
    const tag = `detail ${DonHangTag}`;
    const url = `/api/DonHang/detail?id=${id}&v=1.0`;
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
    input : TypeDonHangCreate): Promise<ExcuteResult> => {
    const tag = `Add ${DonHangTag}`;
    const url = '/api/DonHang/add?v=1.0';
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
  static Update = async (token :string , input : TypeDonHangDetail): Promise<ExcuteResult> => {
    const tag = `Update ${DonHangTag}`;
    const url = '/api/DonHang/update?v=1.0';
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
    const tag = `Delete ${DonHangTag}`;
    const url = `/api/DonHang/delete?id=${input.id}&v=1.0`
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