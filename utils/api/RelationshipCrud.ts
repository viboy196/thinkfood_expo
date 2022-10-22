
import { AxiosRequestConfig } from "axios";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const RelationshipTag = 'Relationship';

export default class RelationshipCrud {



  

  static getDetailPublish = async (id :string): Promise<ExcuteResult> => {
    const tag = `getDetailPublish ${RelationshipTag}`;
    const url = `/api/Relationship/getDetailPublish?id=${id}&v=1.0`;
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
    const tag = `getAllByIdKhachHang ${RelationshipTag}`;
    const url = `/api/Relationship/getAllByIdKhachHang?id=${id}&v=1.0`;
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
    const tag = `all ${RelationshipTag}`;
    const url = `/api/Relationship/all?v=1.0`;
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
  
  static getListAccountFriend = async (token:string , id:string): Promise<ExcuteResult> => {
    const tag = `getListAccountFriend ${RelationshipTag}`;
    const url = `/api/Relationship/getListAccountFriend?id=${id}&v=1.0`;
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
    const tag = `detail ${RelationshipTag}`;
    const url = `/api/Relationship/detail?id=${id}&v=1.0`;
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