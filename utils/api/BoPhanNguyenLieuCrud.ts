import { TypeBoPhanNguyenLieuCreate } from './../helper/BoPhanNguyenLieuHelper';
import { AxiosRequestConfig } from "axios";
import { TypeBoPhanNguyenLieuDetail } from "../helper/BoPhanNguyenLieuHelper";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const BoPhanNguyenLieuTag = 'BoPhanNguyenLieu';

export default class BoPhanNguyenLieuCrud {


  static GetAll = async (token :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${BoPhanNguyenLieuTag}`;
    const url = '/api/BoPhanNguyenLieu/all?v=1.0';
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
    input : TypeBoPhanNguyenLieuCreate): Promise<ExcuteResult> => {
    const tag = `Add ${BoPhanNguyenLieuTag}`;
    const url = '/api/BoPhanNguyenLieu/add?v=1.0';
    console.log(`url ${tag}`, url);

    let formData = new FormData();

    if(input.name)
    {
        formData.append('Name' , input.name);
    }

    formData.append('Type' , "BoPhanNguyenLieu");


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
  static Update = async (token :string , input : TypeBoPhanNguyenLieuDetail): Promise<ExcuteResult> => {
    const tag = `Update ${BoPhanNguyenLieuTag}`;
    const url = '/api/BoPhanNguyenLieu/update?v=1.0';
     console.log(`${tag} url :`, url);

    let formData = new FormData();


    formData.append('Id' , input.id);

    formData.append('Name' , input.name);

    formData.append('Type' , "BoPhanNguyenLieu");

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
    const tag = `Delete ${BoPhanNguyenLieuTag}`;
    const url = `/api/BoPhanNguyenLieu/delete?id=${input.id}&v=1.0`
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