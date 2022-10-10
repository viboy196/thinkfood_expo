import { TypeNguyenLieuCreate } from './../helper/NguyenLieuHelper';
import { AxiosRequestConfig } from "axios";
import { TypeNguyenLieuDetail } from "../helper/NguyenLieuHelper";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const NguyenLieuTag = 'NguyenLieu';

export default class NguyenLieuCrud {


  static GetAll = async (token :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${NguyenLieuTag}`;
    const url = '/api/NguyenLieu/all?v=1.0';
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

  static getListPublishByIdLoaiNguyenLieu = async (id :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${NguyenLieuTag}`;
    const url = `/api/NguyenLieu/getListPublishByIdLoaiNguyenLieu?id=${id}&v=1.0`;
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
  
  static GetAllPublish = async (): Promise<ExcuteResult> => {
    const tag = `GetAll ${NguyenLieuTag}`;
    const url = '/api/NguyenLieu/getAllPublish?v=1.0';
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
    const tag = `getDetailPublish ${NguyenLieuTag}`;
    const url = `/api/NguyenLieu/getDetailPublish?id=${id}&v=1.0`;
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
    input : TypeNguyenLieuCreate): Promise<ExcuteResult> => {
    const tag = `Add ${NguyenLieuTag}`;
    const url = '/api/NguyenLieu/add?v=1.0';
    console.log(`url ${tag}`, url);


    let formData = new FormData();

    if(input.name)
    {
        formData.append('Name' , input.name);
    }
    
    if(input.idLoaiNguyenLieu)
    {
        formData.append('idLoaiNguyenLieu' , input.idLoaiNguyenLieu);
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
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    
    return res.data as ExcuteResult;
  };
  static Update = async (token :string , input : TypeNguyenLieuDetail): Promise<ExcuteResult> => {
    const tag = `Update ${NguyenLieuTag}`;
    const url = '/api/NguyenLieu/update?v=1.0';
     console.log(`${tag} url :`, url);

     let formData = new FormData();


     formData.append('Id' , input.id);
 
     formData.append('Name' , input.name);
 
     if(input.idLoaiNguyenLieu){
         formData.append('idLoaiNguyenLieu' , input.idLoaiNguyenLieu);
     }
 
     if(input.info){
         formData.append('info' , input.info);
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
    const tag = `Delete ${NguyenLieuTag}`;
    const url = `/api/NguyenLieu/delete?id=${input.id}&v=1.0`
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