import { TypeThucPhamTieuChuanCreate } from './../helper/ThucPhamTieuChuanHelper';
import { AxiosRequestConfig } from "axios";
import { TypeThucPhamTieuChuanDetail } from "../helper/ThucPhamTieuChuanHelper";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const ThucPhamTieuChuanTag = 'ThucPhamTieuChuan';

export default class ThucPhamTieuChuanCrud {


  static GetAll = async (token :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${ThucPhamTieuChuanTag}`;
    const url = '/api/ThucPhamTieuChuan/all?v=1.0';
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
  
  static getListPublishByIdNguyenLieu = async (id :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${ThucPhamTieuChuanTag}`;
    const url = `/api/ThucPhamTieuChuan/getListPublishByIdNguyenLieu?id=${id}&v=1.0`;
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
  
  static getListPublishByListId = async (listId :Array<string>): Promise<ExcuteResult> => {
    const tag = `GetAll ${ThucPhamTieuChuanTag}`;
    const url = `/api/ThucPhamTieuChuan/getListPublishByListId?&v=1.0`;
     console.log(`${tag} url :`, url);

    const config: AxiosRequestConfig = {
      headers: {
        accept: 'text/plain',
      },
    };

    const res = await axios.post(url ,listId, config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    
    return res.data as ExcuteResult;
  };


  
  static getDetail = async (id :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${ThucPhamTieuChuanTag}`;
    const url = `/api/ThucPhamTieuChuan/detail?id=${id}&v=1.0`;
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
    const tag = `GetAll ${ThucPhamTieuChuanTag}`;
    const url = `/api/ThucPhamTieuChuan/getDetailPublish?id=${id}&v=1.0`;
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
    input : TypeThucPhamTieuChuanCreate): Promise<ExcuteResult> => {
    const tag = `Add ${ThucPhamTieuChuanTag}`;
    const url = '/api/ThucPhamTieuChuan/add?v=1.0';
    console.log(`url ${tag}`, url);


    let formData = new FormData();

    if(input.name)
    {
        formData.append('Name' , input.name);
    }
    
    if(input.idNguyenLieu)
    {
        formData.append('idNguyenLieu' , input.idNguyenLieu);
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
  static Update = async (token :string , input : TypeThucPhamTieuChuanDetail): Promise<ExcuteResult> => {
    const tag = `Update ${ThucPhamTieuChuanTag}`;
    const url = '/api/ThucPhamTieuChuan/update?v=1.0';
     console.log(`${tag} url :`, url);

     let formData = new FormData();


     formData.append('Id' , input.id);
 
     formData.append('Name' , input.name);
 
     if(input.idNguyenLieu){
         formData.append('idNguyenLieu' , input.idNguyenLieu);
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
    const tag = `Delete ${ThucPhamTieuChuanTag}`;
    const url = `/api/ThucPhamTieuChuan/delete?id=${input.id}&v=1.0`
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