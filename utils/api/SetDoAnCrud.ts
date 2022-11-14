import { TypeSetDoAnCreate } from './../helper/SetDoAnHelper';
import { AxiosRequestConfig } from "axios";
import { TypeSetDoAnDetail } from "../helper/SetDoAnHelper";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const SetDoAnTag = 'SetDoAn';

export default class SetDoAnCrud {


  static GetAll = async (token :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${SetDoAnTag}`;
    const url = '/api/SetDoAn/all?v=1.0';
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
  
  static getAllPublish = async (): Promise<ExcuteResult> => {
    const tag = `getAllPublish ${SetDoAnTag}`;
    const url = '/api/SetDoAn/getAllPublish?v=1.0';
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

  
  static getAllByIdKhachHang = async (id:string , token :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${SetDoAnTag}`;
    const url = `/api/SetDoAn/getAllByIdKhachHang?id=${id}&v=1.0`;
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

  
  
  static detail = async (id :string , token : string): Promise<ExcuteResult> => {
    const tag = `detail ${SetDoAnTag}`;
    const url = `/api/SetDoAn/detail?id=${id}&v=1.0`;
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
  
  static getDetailPublish = async (id :string ): Promise<ExcuteResult> => {
    const tag = `detail ${SetDoAnTag}`;
    const url = `/api/SetDoAn/getDetailPublish?id=${id}&v=1.0`;
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
    input : TypeSetDoAnCreate): Promise<ExcuteResult> => {
    const tag = `Add ${SetDoAnTag}`;
    const url = '/api/SetDoAn/add?v=1.0';
    console.log(`url ${tag}`, url);

    let formData = new FormData();

    if(input.avartarImageFile)
    {
      formData.append('avartarImageFile' , input.avartarImageFile);
  
    }
    if(input.countFood)
    {
        formData.append('countFood' , `${input.countFood}`);
    }
    
    if(input.info)
    {
        formData.append('info' , `${input.info}`);
    }
    
    if(input.infoHtml)
    {
        formData.append('infoHtml' , `${input.infoHtml}`);
    }
    
    if(input.isPublish)
    {
        formData.append('isPublish' , `${input.isPublish}`);
    }
    
    if(input.listMediaFile){
      input.listMediaFile.forEach( item => {
          formData.append('listMediaFile' , item);
      })
    }

    if(input.listSetDoAnItem){
      input.listSetDoAnItem.forEach( item => {
       
          formData.append('listSetDoAnItemStr' , JSON.stringify(item));
      })
    }

    if(input.name)
    {
        formData.append('name' , `${input.name}`);
    }
    
    if(input.unitPrice)
    {
        formData.append('unitPrice' , `${input.unitPrice}`);
    }
    
    

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
        "Content-Type" : "multipart/form-data"
      },
    };
    const res = await axios.post(url , formData , config);
    console.log(`${tag} data code :`, res.data.code);
     
    return res.data as ExcuteResult;
  };
  static Update = async (token :string , input : TypeSetDoAnDetail): Promise<ExcuteResult> => {
    const tag = `Update ${SetDoAnTag}`;
    const url = '/api/SetDoAn/update?v=1.0';
     console.log(`${tag} url :`, url);

     let formData = new FormData();

    formData.append('Id' , input.id);

     if(input.avartarImageFile)
     {
       formData.append('avartarImageFile' , input.avartarImageFile);
   
     }
     if(input.avartarUri){
      formData.append('avartarUri' , input.avartarUri);
    }

     if(input.countFood)
     {
         formData.append('countFood' , `${input.countFood}`);
     }
     
     if(input.info)
     {
         formData.append('info' , `${input.info}`);
     }
     
     if(input.infoHtml)
     {
         formData.append('infoHtml' , `${input.infoHtml}`);
     }
     
     if(input.isPublish)
     {
         formData.append('isPublish' , `${input.isPublish}`);
     }
     
     if(input.listMediaFile){
       input.listMediaFile.forEach( item => {
           formData.append('listMediaFile' , item);
       })
     }

     if(input.listMediaUri){
      input.listMediaUri.forEach( item => {
          formData.append('listMediaUri' , item);
      })
      }
 
     if(input.listSetDoAnItem){
       input.listSetDoAnItem.forEach( item => {
        
           formData.append('listSetDoAnItemStr' , JSON.stringify(item));
       })
     }
 
     if(input.name)
     {
         formData.append('name' , `${input.name}`);
     }
     
     if(input.unitPrice)
     {
         formData.append('unitPrice' , `${input.unitPrice}`);
     }
     
     
 
     const config: AxiosRequestConfig = {
       headers: {
         Authorization: `bearer ${token}`,
         accept: 'text/plain',
         "Content-Type" : "multipart/form-data"
       },
     };
     const res = await axios.post(url , formData , config);
     console.log(`${tag} data code :`, res.data.code);
      
     return res.data as ExcuteResult;
  };

  static Delete = async (input :{token :string , id: string} ): Promise<ExcuteResult> => {
    const tag = `Delete ${SetDoAnTag}`;
    const url = `/api/SetDoAn/delete?id=${input.id}&v=1.0`
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