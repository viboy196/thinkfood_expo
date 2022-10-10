import { TypeDonViDoCreate } from './../helper/DonViDoHelper';
import { AxiosRequestConfig } from "axios";
import { TypeDonViDoDetail } from "../helper/DonViDoHelper";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const DonViDoTag = 'DonViDo';

export default class DonViDoCrud {


  static GetAll = async (token :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${DonViDoTag}`;
    const url = '/api/DonViDo/all?v=1.0';
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

  static getListPublishByIdLoaiDonViDo = async (id :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${DonViDoTag}`;
    const url = `/api/DonViDo/getListPublishByIdLoaiDonViDo?id=${id}&v=1.0`;
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
    const tag = `GetAll ${DonViDoTag}`;
    const url = '/api/DonViDo/getAllPublish?v=1.0';
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
    const tag = `getDetailPublish ${DonViDoTag}`;
    const url = `/api/DonViDo/getDetailPublish?id=${id}&v=1.0`;
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
    input : TypeDonViDoCreate): Promise<ExcuteResult> => {
    const tag = `Add ${DonViDoTag}`;
    const url = '/api/DonViDo/add?v=1.0';
    console.log(`url ${tag}`, url);


    let formData = new FormData();

    if(input.name)
    {
        formData.append('Name' , input.name);
    }
    
    if(input.idLoaiDonViDo)
    {
        formData.append('idLoaiDonViDo' , input.idLoaiDonViDo);
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
  static Update = async (token :string , input : TypeDonViDoDetail): Promise<ExcuteResult> => {
    const tag = `Update ${DonViDoTag}`;
    const url = '/api/DonViDo/update?v=1.0';
     console.log(`${tag} url :`, url);

     let formData = new FormData();


     formData.append('Id' , input.id);
 
     formData.append('Name' , input.name);
 
     if(input.idLoaiDonViDo){
         formData.append('idLoaiDonViDo' , input.idLoaiDonViDo);
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
    const tag = `Delete ${DonViDoTag}`;
    const url = `/api/DonViDo/delete?id=${input.id}&v=1.0`
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