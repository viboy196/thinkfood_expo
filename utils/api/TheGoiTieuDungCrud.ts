import { AxiosRequestConfig } from "axios";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const TheGoiTieuDungTag = 'TheGoiTieuDung';

export default class TheGoiTieuDungCrud {



  
  static getAllPublish = async (): Promise<ExcuteResult> => {
    const tag = `getAllPublish ${TheGoiTieuDungTag}`;
    const url = '/api/TheGoiTieuDung/getAllPublish?v=1.0';
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
  static getAllByUser = async (token:string): Promise<ExcuteResult> => {
    const tag = `getAllByUser ${TheGoiTieuDungTag}`;
    const url = '/api/TheGoiTieuDung/allByUser?v=1.0';
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
    const tag = `detail ${TheGoiTieuDungTag}`;
    const url = `/api/TheGoiTieuDung/detail?id=${id}&v=1.0`;
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
}