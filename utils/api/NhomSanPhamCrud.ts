import { TypeNhomSanPhamCreate } from './../helper/NhomSanPhamHelper';
import { AxiosRequestConfig } from "axios";
import { TypeNhomSanPhamDetail } from "../helper/NhomSanPhamHelper";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const NhomSanPhamTag = 'NhomSanPham';

export default class NhomSanPhamCrud {


  static GetAll = async (token? :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${NhomSanPhamTag}`;
    const url = '/api/NhomSanPham/all?v=1.0';
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
  
  static getAllPublishByIdLoaiGiaoDich = async (id :string): Promise<ExcuteResult> => {
    const tag = `getAllPublishByIdLoaiNhomSanPham ${NhomSanPhamTag}`;
    const url = `/api/NhomSanPham/getAllPublishByIdLoaiGiaoDich?id=${id}&v=1.0`;
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
    const tag = `GetAll ${NhomSanPhamTag}`;
    const url = `/api/NhomSanPham/detail?id=${id}&v=1.0`;
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

  static removeDonGia = async ( input : {id : string , idDonGia : string , token : string }): Promise<ExcuteResult> =>{
    const tag = `removeDonGia ${NhomSanPhamTag}`;
    const url = `/api/NhomSanPham/removeDonGia?id=${input.id}&idDonGia=${input.idDonGia}&v=1.0`;
    console.log(`url ${tag}`, url);
    const config: AxiosRequestConfig = {
      headers: {
        Authorization:  `bearer ${input.token}` ,
        accept: 'text/plain',
      },
    };

    const res = await axios.get(url , config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    
    return res.data as ExcuteResult;

  }
  static addDonGia = async ( input : {id : string , idDonGia : string , token : string }): Promise<ExcuteResult> =>{
    const tag = `addDonGia ${NhomSanPhamTag}`;
    const url = `/api/NhomSanPham/addDonGia?id=${input.id}&idDonGia=${input.idDonGia}&v=1.0`;
    console.log(`url ${tag}`, url);
    const config: AxiosRequestConfig = {
      headers: {
        Authorization:  `bearer ${input.token}` ,
        accept: 'text/plain',
      },
    };

    const res = await axios.get(url , config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    
    return res.data as ExcuteResult;

  }

  static Add = async (
    token :string , 
    input : TypeNhomSanPhamCreate): Promise<ExcuteResult> => {
    const tag = `Add ${NhomSanPhamTag}`;
    const url = '/api/NhomSanPham/add?v=1.0';
    console.log(`url ${tag}`, url);

    let formData = new FormData();

    if(input.name)
    {
        formData.append('Name' , input.name);
    }
    
    if(input.idLoaiGiaoDich)
    {
        formData.append('idLoaiGiaoDich' , input.idLoaiGiaoDich);
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
  static Update = async (token :string , input : TypeNhomSanPhamDetail): Promise<ExcuteResult> => {
    const tag = `Update ${NhomSanPhamTag}`;
    const url = '/api/NhomSanPham/update?v=1.0';
     console.log(`${tag} url :`, url);

    let formData = new FormData();


    formData.append('Id' , input.id);

    formData.append('Name' , input.name);

    if(input.idLoaiGiaoDich){
        formData.append('idLoaiGiaoDich' , input.idLoaiGiaoDich);
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
    const tag = `Delete ${NhomSanPhamTag}`;
    const url = `/api/NhomSanPham/delete?id=${input.id}&v=1.0`
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