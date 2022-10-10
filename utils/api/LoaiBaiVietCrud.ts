import { TypeLoaiBaiVietCreate } from './../helper/LoaiBaiVietHelper';
import { AxiosRequestConfig } from "axios";
import { TypeLoaiBaiVietDetail } from "../helper/LoaiBaiVietHelper";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const LoaiBaiVietTag = 'LoaiBaiViet';

export default class LoaiBaiVietCrud {


  static GetAll = async (token :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${LoaiBaiVietTag}`;
    const url = '/api/LoaiBaiViet/all?v=1.0';
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
    const tag = `getAllPublish ${LoaiBaiVietTag}`;
    const url = '/api/LoaiBaiViet/getAllPublish?v=1.0';
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
    const tag = `getDetailPublish ${LoaiBaiVietTag}`;
    const url = `/api/LoaiBaiViet/getDetailPublish?id=${id}&v=1.0`;
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
    const tag = `detail ${LoaiBaiVietTag}`;
    const url = `/api/LoaiBaiViet/detail?id=${id}&v=1.0`;
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
    input : TypeLoaiBaiVietCreate): Promise<ExcuteResult> => {
    const tag = `Add ${LoaiBaiVietTag}`;
    const url = '/api/LoaiBaiViet/add?v=1.0';
    console.log(`url ${tag}`, url);

    let formData = new FormData();

    if(input.name)
    {
        formData.append('Name' , input.name);
    }

    if(input.isPublish){
        formData.append('isPublish' , `${input.isPublish}`);
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
  static Update = async (token :string , input : TypeLoaiBaiVietDetail): Promise<ExcuteResult> => {
    const tag = `Update ${LoaiBaiVietTag}`;
    const url = '/api/LoaiBaiViet/update?v=1.0';
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
    const tag = `Delete ${LoaiBaiVietTag}`;
    const url = `/api/LoaiBaiViet/delete?id=${input.id}&v=1.0`
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