import { TypeDiemAmThucCreate } from './../helper/DiemAmThucHelper';
import { AxiosRequestConfig } from "axios";
import { TypeDiemAmThucDetail } from "../helper/DiemAmThucHelper";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const DiemAmThucTag = 'DiemAmThuc';

export default class DiemAmThucCrud {

  static GetAll = async (token :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${DiemAmThucTag}`;
    const url = '/api/DiemAmThuc/all?v=1.0';
    console.log(`${DiemAmThucTag} url :` , url);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
      },
    };

    const res = await axios.get(url , config);
    console.log(`${tag} status :`, (res.data as ExcuteResult).code);
    
    return res.data as ExcuteResult ;
  };
  
  static GetAllPublish = async (): Promise<ExcuteResult> => {
    const tag = `GetAll ${DiemAmThucTag}`;
    const url = '/api/DiemAmThuc/allPublish?v=1.0';
    console.log(`${DiemAmThucTag} url :` , url);

    const config: AxiosRequestConfig = {
      headers: {
        accept: 'text/plain',
      },
    };

    const res = await axios.get(url , config);
    console.log(`${tag} status :`, (res.data as ExcuteResult).code);
    
    return res.data as ExcuteResult ;
  };

 
  static  getListPublishDiemAmThucByIdLoaiDiemAmThuc = async (id:string): Promise<ExcuteResult> => {
      const tag = `getListPublishDiemAmThucByIdLoaiDiemAmThuc ${DiemAmThucTag}`;
      const url = `/api/DiemAmThuc/getListPublishDiemAmThucByIdLoaiDiemAmThuc?id=${id}&v=1.0`
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

  static getDetailPublish = async (id:string): Promise<ExcuteResult> => {
      const tag = `getDetailPublish ${DiemAmThucTag}`;
      const url = `/api/DiemAmThuc/detailPublish?id=${id}&v=1.0`
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
    input : TypeDiemAmThucCreate): Promise<ExcuteResult> => {
    const tag = `Add ${DiemAmThucTag}`;
    const url = '/api/DiemAmThuc/add?v=1.0';
    console.log(`${DiemAmThucTag} url :` , url);

    let formData = new FormData();

    if(input.name)
    {
        formData.append('name' , input.name);
    }
    
    if(input.idLoaiDiemAmThuc)
    {
        formData.append('idLoaiDiemAmThuc' , input.idLoaiDiemAmThuc);
    }
    
    if(input.address){
      formData.append('address' , input.address);
    }

    if(input.isPublish)
    {
        formData.append('isPublish' , `${input.isPublish}`);
    }

    if(input.oderPublish)
    {
        formData.append('oderPublish' , `${input.oderPublish}`);
    }


    if(input.info){
      formData.append('info' , input.info);
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

    console.log(`${tag} status :`, (res.data as ExcuteResult).code);
    return res.data as ExcuteResult;
  };

  static Update = async (token :string , input : TypeDiemAmThucDetail): Promise<ExcuteResult> => {
    const tag = `Update ${DiemAmThucTag}`;
    const url = '/api/DiemAmThuc/update?v=1.0';
    console.log(`${tag} url`, url);
    
    console.log( `${tag} input`, input);


    let formData = new FormData();


    formData.append('Id' , input.id);

    formData.append('name' , input.name);
    

    if(input.idLoaiDiemAmThuc){
      formData.append('idLoaiDiemAmThuc' , input.idLoaiDiemAmThuc);
    }
    
    if(input.isPublish){
      formData.append('isPublish' , `${input.isPublish}`);
    }
   
    if(input.oderPublish){
      formData.append('oderPublish' , `${input.oderPublish}`);
    }
    if(input.address){
      formData.append('address' , input.address);
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

    console.log(`${tag} status :`, (res.data as ExcuteResult).code);
    
    return res.data as ExcuteResult;
  };

  static Delete = async (input :{token :string , id: string} ): Promise<ExcuteResult> => {
    const tag = `Delete ${DiemAmThucTag}`;
    const url = `/api/DiemAmThuc/delete?id=${input.id}&v=1.0`
     console.log(`${tag} url :`, url);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${input.token}`,
        accept: 'text/plain',
      },
    };

    const res = await axios.get(url , config);

    console.log(`${tag} status :`, (res.data as ExcuteResult).code);
    
    return res.data as ExcuteResult;
  };

}