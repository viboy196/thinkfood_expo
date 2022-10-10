import { TypeGoiTieuDungCreate } from './../helper/GoiTieuDungHelper';
import { AxiosRequestConfig } from "axios";
import { TypeGoiTieuDungDetail } from "../helper/GoiTieuDungHelper";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const GoiTieuDungTag = 'GoiTieuDung';

export default class GoiTieuDungCrud {


  static GetAll = async (token :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${GoiTieuDungTag}`;
    const url = '/api/GoiTieuDung/all?v=1.0';
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
  
  static getAllPublish = async (): Promise<ExcuteResult> => {
    const tag = `getAllPublish ${GoiTieuDungTag}`;
    const url = '/api/GoiTieuDung/getAllPublish?v=1.0';
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

  static getDetailPublish = async (id :string): Promise<ExcuteResult> => {
    const tag = `getDetailPublish ${GoiTieuDungTag}`;
    const url = `/api/GoiTieuDung/getDetailPublish?id=${id}&v=1.0`;
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
  
  static detail = async (id :string , token : string): Promise<ExcuteResult> => {
    const tag = `detail ${GoiTieuDungTag}`;
    const url = `/api/GoiTieuDung/detail?id=${id}&v=1.0`;
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
    input : TypeGoiTieuDungCreate): Promise<ExcuteResult> => {
    const tag = `Add ${GoiTieuDungTag}`;
    const url = '/api/GoiTieuDung/add?v=1.0';
    console.log(`url ${tag}`, url);

    let formData = new FormData();

    if(input.name)
    {
        formData.append('Name' , input.name);
    }

    if(input.isPublish){
        formData.append('isPublish' , `${input.isPublish}`);
    }
      
    if(input.price){
      formData.append('price' ,`${input.price}`);
    }

    if(input.oderPublish){
        formData.append('oderPublish' , `${input.oderPublish}`);
    }
    if(input.info){
        formData.append('info' , input.info);
    }
    
    if(input.infoHtml){
        formData.append('infoHtml' , input.infoHtml);
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
  static Update = async (token :string , input : TypeGoiTieuDungDetail): Promise<ExcuteResult> => {
    const tag = `Update ${GoiTieuDungTag}`;
    const url = '/api/GoiTieuDung/update?v=1.0';
     console.log(`${tag} url :`, url);

    let formData = new FormData();


    formData.append('Id' , input.id);

    formData.append('Name' , input.name);

    if(input.isPublish){
      formData.append('isPublish' , `${input.isPublish}`);
  }
  
  if(input.oderPublish){
      formData.append('oderPublish' , `${input.oderPublish}`);
  }

    if(input.info){
        formData.append('info' , input.info);
    }
    
    if(input.price){
        formData.append('price' ,`${input.price}`);
    }


    
    if(input.infoHtml){
      formData.append('infoHtml' , input.infoHtml);
  }
    
    if(input.avartarUri){
        formData.append('avartarUri' , input.avartarUri);
    }

    if(input.listMediaUri){
      input.listMediaUri.forEach( item => {
          formData.append('listMediaUri' , item);
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
    const tag = `Delete ${GoiTieuDungTag}`;
    const url = `/api/GoiTieuDung/delete?id=${input.id}&v=1.0`
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