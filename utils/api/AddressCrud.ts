import { TypeAddressCreate } from './../helper/AddressHelper';
import { AxiosRequestConfig } from "axios";
import { TypeAddressDetail } from "../helper/AddressHelper";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const AddressTag = 'Address';

export default class AddressCrud {


  static GetAll = async (token :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${AddressTag}`;
    const url = '/api/Address/all?v=1.0';
     console.log(`${tag} url :`, url);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get(url , config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    
    return res.data as ExcuteResult;
  };
  
  static GetAllPublish = async (): Promise<ExcuteResult> => {
    const tag = `GetAllPublish ${AddressTag}`;
    const url = '/api/Address/all?v=1.0';
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
  
  static getListByIdConnect = async (id:string , token:string): Promise<ExcuteResult> => {
    const tag = `getListByIdConnect ${AddressTag}`;
    const url = `/api/Address/getListByIdConnect?id=${id}&v=1.0`;
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


  static getDetailPublish = async (id :string): Promise<ExcuteResult> => {
    const tag = `getDetailPublish ${AddressTag}`;
    const url = `/api/Address/detail?id=${id}&v=1.0`;
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
  static Add = async (
    token :string , 
    input : TypeAddressCreate): Promise<ExcuteResult> => {
    const tag = `Add ${AddressTag}`;
    const url = '/api/Address/add?v=1.0';
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
  static Update = async (token :string , input : TypeAddressDetail): Promise<ExcuteResult> => {
    const tag = `Update ${AddressTag}`;
    const url = '/api/Address/update?v=1.0';
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
    const tag = `Delete ${AddressTag}`;
    const url = `/api/Address/delete?id=${input.id}&v=1.0`
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