import { TypeLoaiMonAnCreate } from './../helper/LoaiMonAnHelper';
import { AxiosRequestConfig } from "axios";
import { TypeLoaiMonAnDetail } from "../helper/LoaiMonAnHelper";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const LoaiMonAnTag = 'LoaiMonAn';

export default class LoaiMonAnCrud {

   static GetAllPublish = async (): Promise<ExcuteResult> => {
        const tag = `GetAllPublish ${LoaiMonAnTag}`;
        const url = '/api/LoaiMatHang/allTypeFoodPublish?v=1.0';
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
    static getAllPublishBylistId = async (listId :Array<string>): Promise<ExcuteResult> => {
      const tag = `GetAll ${LoaiMonAnTag}`;
      const url = '/api/LoaiMatHang/getAllPublishBylistId?v=1.0';
      console.log(`${tag} url :` , url);
  
      const config: AxiosRequestConfig = {
        headers: {
          accept: 'text/plain',
        },
      };
  
      const res = await axios.post(url , listId, config);
      console.log(`${tag} status :`, (res.data as ExcuteResult).code);
      
      return res.data as ExcuteResult ;
    };
    
   static getDetailPublish = async (id:string): Promise<ExcuteResult> => {
        const tag = `getDetailPublish ${LoaiMonAnTag}`;
        const url = `/api/LoaiMatHang/detailPublish?id=${id}&v=1.0`
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

  static GetAll = async (token :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${LoaiMonAnTag}`;
    const url = '/api/LoaiMatHang/allTypeFood?v=1.0';
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
    input : TypeLoaiMonAnCreate): Promise<ExcuteResult> => {
    const tag = `Add ${LoaiMonAnTag}`;
    const url = '/api/LoaiMatHang/add?v=1.0';
     console.log(`${tag} url :`, url);

    let formData = new FormData();

    if(input.name)
    {
        formData.append('Name' , input.name);
    }

    formData.append('Type' , "MonAn");


    if(input.info){
        formData.append('info' , input.info);
    }

    if(input.avartarImageFile){
      formData.append('avartarImageFile' , input.avartarImageFile);
    }

    if(input.isPublish){
      formData.append('isPublish' , `${input.isPublish}`);
    }

    if(input.oderPublish){
      formData.append('oderPublish' , input.oderPublish);
    }

    if(input.listMediaFile){
        input.listMediaFile.forEach( item => {
            formData.append('listMediaFile' , item);
        })
    }

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
        "Content-Type" : "multipart/form-data"
      },
    };
    const res = await axios.post(url , formData , config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    
    return res.data as ExcuteResult;
  };
  static Update = async (token :string , input : TypeLoaiMonAnDetail): Promise<ExcuteResult> => {
    const tag = `Update ${LoaiMonAnTag}`;
    const url = '/api/LoaiMatHang/update?v=1.0';
     console.log(`${tag} url :`, url);

    let formData = new FormData();


    formData.append('Id' , input.id);

    formData.append('Name' , input.name);
    
    formData.append('Code' , input.code);

    formData.append('Type' , "MonAn");

    if(input.oderPublish){
        formData.append('oderPublish' , input.oderPublish);
    }
    if(input.isPublish){
        formData.append('isPublish' ,`${input.isPublish}`);
    }
    if(input.info){
        formData.append('info' , input.info);
    }
    
    if(input.avartarUri){
        formData.append('avartarUri' , input.avartarUri);
    }
    
    if(input.listMediaUri){
        input.listMediaUri.forEach(it => {

            formData.append('listMediaUri' , it);
        })
    }
    if(input.avartarImageFile){
      formData.append('avartarImageFile' , input.avartarImageFile);
    }
    if(input.listMediaFile){
        input.listMediaFile.forEach( item => {
            formData.append('listMediaFile' , item);
        })
    }

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
        "Content-Type" : "multipart/form-data"
      },
    };
    const res = await axios.post(url , formData , config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    
    return res.data as ExcuteResult;
  };

  static Delete = async (input :{token :string , id: string} ): Promise<ExcuteResult> => {
    const tag = `Delete ${LoaiMonAnTag}`;
    const url = `/api/LoaiMatHang/delete?id=${input.id}&v=1.0`
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