import { TypeBangGiaCreate } from './../helper/BangGiaHelper';
import { AxiosRequestConfig } from "axios";
import { TypeBangGiaDetail } from "../helper/BangGiaHelper";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const BangGiaTag = 'BangGia';

export default class BangGiaCrud {


  static GetAll = async (token? :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${BangGiaTag}`;
    const url = '/api/BangGia/all?v=1.0';
     console.log(`${tag} url :`, url);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: token ?  `bearer ${token}` : '',
        accept: 'text/plain',
      },
    };

    const res = await axios.get(url , config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    
    return res.data as ExcuteResult;
  };
  
  static getAllPublishByIdLoaiBangGia = async (id :string): Promise<ExcuteResult> => {
    const tag = `getAllPublishByIdLoaiBangGia ${BangGiaTag}`;
    const url = `/api/BangGia/getAllPublishByIdLoaiBangGia?id=${id}&v=1.0`;
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
  static getAllPublishByIdDiemAmThuc = async (id :string): Promise<ExcuteResult> => {
    const tag = `getAllPublishByIdDiemAmThuc ${BangGiaTag}`;
    const url = `/api/BangGia/getAllPublishByIdDiemAmThuc?id=${id}&v=1.0`;
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

  
  static getDetail = async (id :string , token?:string): Promise<ExcuteResult> => {
    const tag = `GetAll ${BangGiaTag}`;
    const url = `/api/BangGia/detail?id=${id}&v=1.0`;
     console.log(`${tag} url :`, url);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: token ?  `bearer ${token}` : '',
        accept: 'text/plain',
      },
    };

    const res = await axios.get(url , config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    
    return res.data as ExcuteResult;
  };
  
  static getDetailPublish = async (id :string ): Promise<ExcuteResult> => {
    const tag = `getDetailPublish ${BangGiaTag}`;
    const url = `/api/BangGia/getDetailPublish?id=${id}&v=1.0`;
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
    input : TypeBangGiaCreate): Promise<ExcuteResult> => {
    const tag = `Add ${BangGiaTag}`;
    const url = '/api/BangGia/add?v=1.0';
    console.log(`url ${tag}`, url);

    let formData = new FormData();

    if(input.name)
    {
        formData.append('Name' , input.name);
    }
    
    if(input.idLoaiBangGia)
    {
        formData.append('idLoaiBangGia' , input.idLoaiBangGia);
    }
    
    if(input.idDiemAmThuc){
      formData.append('idDiemAmThuc' , input.idDiemAmThuc);
    }


    if(input.info){
        formData.append('info' , input.info);
    }

    if(input.avartarImageFile){
      formData.append('avartarImageFile' , input.avartarImageFile);
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
  static Update = async (token :string , input : TypeBangGiaDetail): Promise<ExcuteResult> => {
    const tag = `Update ${BangGiaTag}`;
    const url = '/api/BangGia/update?v=1.0';
     console.log(`${tag} url :`, url);

    let formData = new FormData();


    formData.append('Id' , input.id);

    formData.append('Name' , input.name);

    if(input.idLoaiBangGia){
        formData.append('idLoaiBangGia' , input.idLoaiBangGia);
    }

    
    if(input.info){
        formData.append('info' , input.info);
    }
    
    if(input.idDiemAmThuc){
        formData.append('idDiemAmThuc' , input.idDiemAmThuc);
    }

    
    if(input.avartarUri){
        formData.append('avartarUri' , input.avartarUri);
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
    const tag = `Delete ${BangGiaTag}`;
    const url = `/api/BangGia/delete?id=${input.id}&v=1.0`
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