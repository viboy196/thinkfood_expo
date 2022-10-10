import { TypeMonAnCreate } from './../helper/MonAnHelper';
import { AxiosRequestConfig } from "axios";
import { TypeMonAnDetail } from "../helper/MonAnHelper";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const MonAnTag = 'MonAn';

export default class MonAnCrud {

   static getListPublishHomeByIdLoaiMonAn = async (idLoaiMonAn:string): Promise<ExcuteResult> => {
        const tag = `getListPublishHomeByIdLoaiMonAn ${MonAnTag}`;
        const url = `/api/MonAn/getListPublishHomeByIdLoaiMonAn?idLoaiMonAn=${idLoaiMonAn}&v=1.0`
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
    
   static getListPublishPageByIdLoaiMonAn = async (idLoaiMonAn:string): Promise<ExcuteResult> => {
        const tag = `getListPublishPageByIdLoaiMonAn ${MonAnTag}`;
        const url = `/api/MonAn/getListPublishPageByIdLoaiMonAn?idLoaiMonAn=${idLoaiMonAn}&v=1.0`
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

  
   static getListPublish = async (): Promise<ExcuteResult> => {
        const tag = `getListPublish ${MonAnTag}`;
        const url = '/api/MonAn/getListPublish?v=1.0'
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
        const tag = `getDetailPublish ${MonAnTag}`;
        const url = `/api/MonAn/detailPublish?id=${id}&v=1.0`
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
    const tag = `GetAll ${MonAnTag}`;
    const url = '/api/MonAn/all?v=1.0';
    console.log(`${MonAnTag} url :` , url);

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
  
  static getAllLoaiMonAnPublishBylistId = async (listId :Array<string>): Promise<ExcuteResult> => {
    const tag = `GetAll ${MonAnTag}`;
    const url = '/api/LoaiMonAn/getAllPublishBylistId?v=1.0';
    console.log(`${MonAnTag} url :` , url);

    const config: AxiosRequestConfig = {
      headers: {
        accept: 'text/plain',
      },
    };

    const res = await axios.post(url , listId, config);
    console.log(`${tag} status :`, (res.data as ExcuteResult).code);
    
    return res.data as ExcuteResult ;
  };

  static Add = async (
    token :string , 
    input : TypeMonAnCreate): Promise<ExcuteResult> => {
    const tag = `Add ${MonAnTag}`;
    const url = '/api/MonAn/add?v=1.0';
    console.log(`${MonAnTag} url :` , url);

    let formData = new FormData();

    if(input.name)
    {
        formData.append('Name' , input.name);
    }

    if(input.info){
        formData.append('info' , input.info);
    }
    
    if(input.listIdLoaiMonAn){
      input.listIdLoaiMonAn.forEach((item) => {

        formData.append('listIdLoaiMonAn' , item);
      })
    }
    if(input.listIdThucPhamTieuChuan){
      input.listIdThucPhamTieuChuan.forEach((item) => {

        formData.append('listIdThucPhamTieuChuan' , item);
      })
    }


    if(input.isPublishHome){
      formData.append('isPublishHome' , `${input.isPublishHome}`);
    }
   
    if(input.isPublishPage){
      formData.append('isPublishPage' , `${input.isPublishPage}`);
    }

    if(input.oderPublish){
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
  static Update = async (token :string , input : TypeMonAnDetail): Promise<ExcuteResult> => {
    const tag = `Update ${MonAnTag}`;
    const url = '/api/MonAn/update?v=1.0';
    console.log(`${tag} url`, url);
    
    console.log( `${tag} input`, input);


    let formData = new FormData();


    formData.append('Id' , input.id);

    formData.append('Name' , input.name);

    if(input.listIdLoaiMonAn){
      input.listIdLoaiMonAn.forEach((item) => {

        formData.append('listIdLoaiMonAn' , item);
      })
    }
    if(input.listIdThucPhamTieuChuan){
      input.listIdThucPhamTieuChuan.forEach((item) => {

        formData.append('listIdThucPhamTieuChuan' , item);
      })
    }
    
    if(input.isPublishHome){
      formData.append('isPublishHome' , `${input.isPublishHome}`);
    }
   
    if(input.isPublishPage){
      formData.append('isPublishPage' , `${input.isPublishPage}`);
    }

    if(input.oderPublish){
      formData.append('oderPublish' , `${input.oderPublish}`);
    }

    formData.append('Type' , "MonAn");

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
    const tag = `Delete ${MonAnTag}`;
    const url = `/api/MonAn/delete?id=${input.id}&v=1.0`
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