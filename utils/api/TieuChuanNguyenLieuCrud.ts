import { TypeTieuChuanNguyenLieuCreate } from './../helper/TieuChuanNguyenLieuHelper';
import { AxiosRequestConfig } from "axios";
import { TypeTieuChuanNguyenLieuDetail } from "../helper/TieuChuanNguyenLieuHelper";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const TieuChuanNguyenLieuTag = 'TieuChuanNguyenLieu';

export default class TieuChuanNguyenLieuCrud {


  static GetAll = async (token :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${TieuChuanNguyenLieuTag}`;
    const url = '/api/TieuChuanNguyenLieu/all?v=1.0';
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
    input : TypeTieuChuanNguyenLieuCreate): Promise<ExcuteResult> => {
    const tag = `Add ${TieuChuanNguyenLieuTag}`;
    const url = '/api/TieuChuanNguyenLieu/add?v=1.0';
    console.log(`url ${tag}`, url);

    let formData = new FormData();

    if(input.name)
    {
        formData.append('Name' , input.name);
    }

    formData.append('Type' , "TieuChuanNguyenLieu");


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
  static Update = async (token :string , input : TypeTieuChuanNguyenLieuDetail): Promise<ExcuteResult> => {
    const tag = `Update ${TieuChuanNguyenLieuTag}`;
    const url = '/api/TieuChuanNguyenLieu/update?v=1.0';
     console.log(`${tag} url :`, url);

    let formData = new FormData();


    formData.append('Id' , input.id);

    formData.append('Name' , input.name);

    formData.append('Type' , "TieuChuanNguyenLieu");

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
    const tag = `Delete ${TieuChuanNguyenLieuTag}`;
    const url = `/api/TieuChuanNguyenLieu/delete?id=${input.id}&v=1.0`
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