import { TypeOderCreate } from './../helper/OderHelper';
import { AxiosRequestConfig } from "axios";
import { TypeOderDetail } from "../helper/OderHelper";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const OderTag = 'Oder';

export default class OderCrud {


  static GetAll = async (token :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${OderTag}`;
    const url = '/api/Oder/all?v=1.0';
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
  
  static OderListByAuth = async (token :string): Promise<ExcuteResult> => {
    const tag = `OderListByAuth ${OderTag}`;
    const url = '/api/Oder/OderListByAuth?v=1.0';
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
    const tag = `GetAllPublish ${OderTag}`;
    const url = '/api/Oder/all?v=1.0';
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
    const tag = `getDetailPublish ${OderTag}`;
    const url = `/api/Oder/detail?id=${id}&v=1.0`;
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
  
  static complete = async (id :string , token :string): Promise<ExcuteResult> => {
    const tag = `complete ${OderTag}`;
    const url = `/api/Oder/complete?id=${id}&v=1.0`;
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
    input : TypeOderCreate): Promise<ExcuteResult> => {
    const tag = `Add ${OderTag}`;
    const url = '/api/Oder/add?v=1.0';
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
  static Update = async (token :string , input : TypeOderDetail): Promise<ExcuteResult> => {
    const tag = `Update ${OderTag}`;
    const url = '/api/Oder/update?v=1.0';
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
    const tag = `Delete ${OderTag}`;
    const url = `/api/Oder/delete?id=${input.id}&v=1.0`
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