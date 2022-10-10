import { TypeLoaiDiemAmThucCreate } from './../helper/LoaiDiemAmThucHelper';
import { AxiosRequestConfig } from "axios";
import { TypeLoaiDiemAmThucDetail } from "../helper/LoaiDiemAmThucHelper";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const LoaiDiemAmThucTag = 'LoaiDiemAmThuc';

export default class LoaiDiemAmThucCrud {

  static GetAll = async (token :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${LoaiDiemAmThucTag}`;
    const url = '/api/LoaiDiemAmThuc/all?v=1.0';
    console.log(`${LoaiDiemAmThucTag} url :` , url);

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
    const tag = `GetAll ${LoaiDiemAmThucTag}`;
    const url = '/api/LoaiDiemAmThuc/allPublish?v=1.0';
    console.log(`${LoaiDiemAmThucTag} url :` , url);

    const config: AxiosRequestConfig = {
      headers: {
        accept: 'text/plain',
      },
    };

    const res = await axios.get(url , config);
    console.log(`${tag} status :`, (res.data as ExcuteResult).code);
    
    return res.data as ExcuteResult ;
  };


  static getListPublishLoaiDiemAmThuc = async (idMonAn:string): Promise<ExcuteResult> => {
      const tag = `getListPublishLoaiDiemAmThuc ${LoaiDiemAmThucTag}`;
      const url = `/api/LoaiDiemAmThuc/getListPublishLoaiDiemAmThuc?v=1.0`
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
      const tag = `getDetailPublish ${LoaiDiemAmThucTag}`;
      const url = `/api/LoaiDiemAmThuc/detailPublish?id=${id}&v=1.0`
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
    input : TypeLoaiDiemAmThucCreate): Promise<ExcuteResult> => {
    const tag = `Add ${LoaiDiemAmThucTag}`;
    const url = '/api/LoaiDiemAmThuc/add?v=1.0';
    console.log(`${LoaiDiemAmThucTag} url :` , url);

    let formData = new FormData();

    if(input.name)
    {
        formData.append('name' , input.name);
    }
    
    if(input.info){
      formData.append('info' , input.info);
    }

    if(input.isPublish)
    {
        formData.append('isPublish' , `${input.isPublish}`);
    }

    if(input.oderPublish)
    {
        formData.append('oderPublish' , `${input.oderPublish}`);
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

  static Update = async (token :string , input : TypeLoaiDiemAmThucDetail): Promise<ExcuteResult> => {
    const tag = `Update ${LoaiDiemAmThucTag}`;
    const url = '/api/LoaiDiemAmThuc/update?v=1.0';
    console.log(`${tag} url`, url);
    
    console.log( `${tag} input`, input);


    let formData = new FormData();


    formData.append('Id' , input.id);

    formData.append('name' , input.name);

    formData.append('code' , input.code);


    
    if(input.isPublish){
      formData.append('isPublish' , `${input.isPublish}`);
    }
   
    if(input.oderPublish){
      formData.append('oderPublish' , `${input.oderPublish}`);
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
    const tag = `Delete ${LoaiDiemAmThucTag}`;
    const url = `/api/LoaiDiemAmThuc/delete?id=${input.id}&v=1.0`
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