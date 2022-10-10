import { TypeTrangTraiCreate } from './../helper/TrangTraiHelper';
import { AxiosRequestConfig } from "axios";
import { TypeTrangTraiDetail } from "../helper/TrangTraiHelper";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const TrangTraiTag = 'TrangTrai';

export default class TrangTraiCrud {


  static GetAll = async (token? :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${TrangTraiTag}`;
    const url = '/api/TrangTrai/all?v=1.0';
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
  
  static getAllPublishByIdLoaiTrangTrai = async (id :string): Promise<ExcuteResult> => {
    const tag = `getAllPublishByIdLoaiTrangTrai ${TrangTraiTag}`;
    const url = `/api/TrangTrai/getAllPublishByIdLoaiTrangTrai?id=${id}&v=1.0`;
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
    const tag = `GetAll ${TrangTraiTag}`;
    const url = `/api/TrangTrai/detail?id=${id}&v=1.0`;
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

  static Add = async (
    token :string , 
    input : TypeTrangTraiCreate): Promise<ExcuteResult> => {
    const tag = `Add ${TrangTraiTag}`;
    const url = '/api/TrangTrai/add?v=1.0';
    console.log(`url ${tag}`, url);

    let formData = new FormData();

    if(input.name)
    {
        formData.append('Name' , input.name);
    }
    
    if(input.idLoaiTrangTrai)
    {
        formData.append('idLoaiTrangTrai' , input.idLoaiTrangTrai);
    }

    if(input.listIdThucPhamTieuChuan){
      input.listIdThucPhamTieuChuan.forEach((item) => {

        formData.append('listIdThucPhamTieuChuan' , item);
      })
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
  static Update = async (token :string , input : TypeTrangTraiDetail): Promise<ExcuteResult> => {
    const tag = `Update ${TrangTraiTag}`;
    const url = '/api/TrangTrai/update?v=1.0';
     console.log(`${tag} url :`, url);

    let formData = new FormData();


    formData.append('Id' , input.id);

    formData.append('Name' , input.name);

    if(input.idLoaiTrangTrai){
        formData.append('idLoaiTrangTrai' , input.idLoaiTrangTrai);
    }

    if(input.listIdThucPhamTieuChuan){
      input.listIdThucPhamTieuChuan.forEach((item) => {

        formData.append('listIdThucPhamTieuChuan' , item);
      })
    }
    
    if(input.info){
        formData.append('info' , input.info);
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
    const tag = `Delete ${TrangTraiTag}`;
    const url = `/api/TrangTrai/delete?id=${input.id}&v=1.0`
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