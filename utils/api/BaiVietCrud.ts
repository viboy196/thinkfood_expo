import { TypeBaiVietCreate } from './../helper/BaiVietHelper';
import { AxiosRequestConfig } from "axios";
import { TypeBaiVietDetail } from "../helper/BaiVietHelper";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const BaiVietTag = 'BaiViet';

export default class BaiVietCrud {


  static GetAll = async (token :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${BaiVietTag}`;
    const url = '/api/BaiViet/all?v=1.0';
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
    const tag = `getAllPublish ${BaiVietTag}`;
    const url = '/api/BaiViet/getAllPublish?v=1.0';
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
    const tag = `getDetailPublish ${BaiVietTag}`;
    const url = `/api/BaiViet/getDetailPublish?id=${id}&v=1.0`;
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
    const tag = `detail ${BaiVietTag}`;
    const url = `/api/BaiViet/detail?id=${id}&v=1.0`;
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
    input : TypeBaiVietCreate): Promise<ExcuteResult> => {
    const tag = `Add ${BaiVietTag}`;
    const url = '/api/BaiViet/add?v=1.0';
    console.log(`url ${tag}`, url);

    let formData = new FormData();

    if(input.name)
    {
        formData.append('Name' , input.name);
    }
    
    if(input.idDiemAmThuc)
    {
        formData.append('idDiemAmThuc' , input.idDiemAmThuc);
    }

    if(input.idLoaiBaiViet)
    {
        formData.append('idLoaiBaiViet' , input.idLoaiBaiViet);
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
  static Update = async (token :string , input : TypeBaiVietDetail): Promise<ExcuteResult> => {
    const tag = `Update ${BaiVietTag}`;
    const url = '/api/BaiViet/update?v=1.0';
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

  if(input.idDiemAmThuc)
  {
      formData.append('idDiemAmThuc' , input.idDiemAmThuc);
  }

  if(input.idLoaiBaiViet)
  {
      formData.append('idLoaiBaiViet' , input.idLoaiBaiViet);
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
    const tag = `Delete ${BaiVietTag}`;
    const url = `/api/BaiViet/delete?id=${input.id}&v=1.0`
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