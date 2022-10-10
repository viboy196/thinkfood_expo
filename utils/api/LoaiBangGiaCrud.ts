import { TypeLoaiBangGiaCreate } from './../helper/LoaiBangGiaHelper';
import { AxiosRequestConfig } from "axios";
import { TypeLoaiBangGiaDetail } from "../helper/LoaiBangGiaHelper";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const LoaiBangGiaTag = 'LoaiBangGia';

export default class LoaiBangGiaCrud {


  static GetAll = async (token :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${LoaiBangGiaTag}`;
    const url = '/api/LoaiBangGia/all?v=1.0';
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
  
  static GetAllPublish = async (): Promise<ExcuteResult> => {
    const tag = `GetAllPublish ${LoaiBangGiaTag}`;
    const url = '/api/LoaiBangGia/all?v=1.0';
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
    const tag = `getDetailPublish ${LoaiBangGiaTag}`;
    const url = `/api/LoaiBangGia/detail?id=${id}&v=1.0`;
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
    input : TypeLoaiBangGiaCreate): Promise<ExcuteResult> => {
    const tag = `Add ${LoaiBangGiaTag}`;
    const url = '/api/LoaiBangGia/add?v=1.0';
    console.log(`url ${tag}`, url);

    let formData = new FormData();

    if(input.name)
    {
        formData.append('Name' , input.name);
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
  static Update = async (token :string , input : TypeLoaiBangGiaDetail): Promise<ExcuteResult> => {
    const tag = `Update ${LoaiBangGiaTag}`;
    const url = '/api/LoaiBangGia/update?v=1.0';
     console.log(`${tag} url :`, url);

    let formData = new FormData();


    formData.append('Id' , input.id);

    formData.append('Name' , input.name);

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
    const tag = `Delete ${LoaiBangGiaTag}`;
    const url = `/api/LoaiBangGia/delete?id=${input.id}&v=1.0`
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