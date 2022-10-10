import { TypeDoAnCreate } from './../helper/DoAnHelper';
import { AxiosRequestConfig } from "axios";
import { TypeDoAnDetail } from "../helper/DoAnHelper";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const DoAnTag = 'DoAn';

export default class DoAnCrud {

   static getListPublishDoAnByIdMonAn = async (idMonAn:string): Promise<ExcuteResult> => {
        const tag = `getListPublishHomeByIdLoaiDoAn ${DoAnTag}`;
        const url = `/api/DoAn/getListPublishDoAnByIdMonAn?idMonAn=${idMonAn}&v=1.0`
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
      const tag = `getDetailPublish ${DoAnTag}`;
      const url = `/api/DoAn/detailPublish?id=${id}&v=1.0`
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

  

  
  static GetAll = async (token :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${DoAnTag}`;
    const url = '/api/DoAn/all?v=1.0';
    console.log(`${DoAnTag} url :` , url);

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

  static Add = async (
    token :string , 
    input : TypeDoAnCreate): Promise<ExcuteResult> => {
    const tag = `Add ${DoAnTag}`;
    const url = '/api/DoAn/add?v=1.0';
    console.log(`${DoAnTag} url :` , url);

    let formData = new FormData();

    if(input.name)
    {
        formData.append('Name' , input.name);
    }
    
    if(input.idMonAn)
    {
        formData.append('idMonAn' , input.idMonAn);
    }

    if(input.listIdThucPhamTieuChuan){
      input.listIdThucPhamTieuChuan.forEach((item) => {

        formData.append('listIdThucPhamTieuChuan' , item);
      })
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

  static Update = async (token :string , input : TypeDoAnDetail): Promise<ExcuteResult> => {
    const tag = `Update ${DoAnTag}`;
    const url = '/api/DoAn/update?v=1.0';
    console.log(`${tag} url`, url);
    
    console.log( `${tag} input`, input);


    let formData = new FormData();


    formData.append('Id' , input.id);

    formData.append('Name' , input.name);

    if(input.idMonAn){
      formData.append('idMonAn' , input.idMonAn);
    }

    if(input.listIdThucPhamTieuChuan){
      input.listIdThucPhamTieuChuan.forEach((item) => {

        formData.append('listIdThucPhamTieuChuan' , item);
      })
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
    const tag = `Delete ${DoAnTag}`;
    const url = `/api/DoAn/delete?id=${input.id}&v=1.0`
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