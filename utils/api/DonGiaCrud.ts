import { TypeDonGiaCreate } from './../helper/DonGiaHelper';
import { AxiosRequestConfig } from "axios";
import { TypeDonGiaDetail } from "../helper/DonGiaHelper";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const DonGiaTag = 'DonGia';

export default class DonGiaCrud {


  static GetAll = async (token :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${DonGiaTag}`;
    const url = '/api/DonGia/all?v=1.0';
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
  
  static getListByIdBangGia = async (id :string , token:string): Promise<ExcuteResult> => {
    const tag = `getListByIdBangGia ${DonGiaTag}`;
    const url = `/api/DonGia/getListByIdBangGia?id=${id}&v=1.0`;
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
  
  static getListPublishByIdBangGia = async (id :string ): Promise<ExcuteResult> => {
    const tag = `getListPublishByIdBangGia ${DonGiaTag}`;
    const url = `/api/DonGia/getListPublishByIdBangGia?id=${id}&v=1.0`;
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
  
  static getLisPublishtByIdDoAn = async (id :string ): Promise<ExcuteResult> => {
    const tag = `getListPublishByIdBangGia ${DonGiaTag}`;
    const url = `/api/DonGia/getLisPublishtByIdDoAn?id=${id}&v=1.0`;
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
  static getLisPublishtByIdThucPhamTieuChuan = async (id :string ): Promise<ExcuteResult> => {
    const tag = `getLisPublishtByIdThucPhamTieuChuan ${DonGiaTag}`;
    const url = `/api/DonGia/getLisPublishtByIdThucPhamTieuChuan?id=${id}&v=1.0`;
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


  
  static getListByListId = async (listId :Array<string> , token :string): Promise<ExcuteResult> => {
    const tag = `GetAll ${DonGiaTag}`;
    const url = `/api/DonGia/getListByListId?&v=1.0`;
     console.log(`${tag} url :`, url);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
      },
    };

    const res = await axios.post(url ,listId, config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    
    return res.data as ExcuteResult;
  };
  static getListPublishByListId = async (listId :Array<string>): Promise<ExcuteResult> => {
    const tag = `GetAll ${DonGiaTag}`;
    const url = `/api/DonGia/getListPublishByListId?&v=1.0`;
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
    const tag = `GetAll ${DonGiaTag}`;
    const url = `/api/DonGia/detail?id=${id}&v=1.0`;
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
    input : TypeDonGiaCreate): Promise<ExcuteResult> => {
    const tag = `Add ${DonGiaTag}`;
    const url = 'api/DonGia/add?v=1.0';
    console.log(`url ${tag}`, url);


    let formData = new FormData();

    if(input.idBangGia){
      formData.append('idBangGia' , input.idBangGia);
  }


    if(input.type){
        formData.append('type' , input.type.toString());
    }
    
    
    if(input.idThucPhamTieuChuan){
        formData.append('idThucPhamTieuChuan' , input.idThucPhamTieuChuan);
    }
    
    
    if(input.idDoAn){
        formData.append('idDoAn' , input.idDoAn);
    }
    
    
    if(input.unitPrice){
        formData.append('unitPrice' , input.unitPrice.toString());
    }
    
    if(input.idDonViDo){
        formData.append('idDonViDo' , input.idDonViDo);
    }
    
    if(input.isPublish){
        formData.append('isPublish' , `${input.isPublish}`);
    }

    if(input.oderPublish){
        formData.append('oderPublish' , input.oderPublish.toString());
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
  static Update = async (token :string , input : TypeDonGiaDetail): Promise<ExcuteResult> => {
    const tag = `Update ${DonGiaTag}`;
    const url = '/api/DonGia/update?v=1.0';
     console.log(`${tag} url :`, url);

    let formData = new FormData();
    formData.append('Id' , input.id);

    if(input.idBangGia){
        formData.append('idBangGia' , input.idBangGia);
    }


    if(input.type){
        formData.append('type' , input.type.toString());
    }
    
    
    if(input.idThucPhamTieuChuan){
        formData.append('idThucPhamTieuChuan' , input.idThucPhamTieuChuan);
    }
    
    
    if(input.idDoAn){
        formData.append('idDoAn' , input.idDoAn);
    }
    
    
    if(input.unitPrice){
        formData.append('unitPrice' , input.unitPrice.toString());
    }
    
    if(input.idDonViDo){
        formData.append('idDonViDo' , input.idDonViDo);
    }
    
    if(input.isPublish){
        formData.append('isPublish' , `${input.isPublish}`);
    }

    if(input.oderPublish){
        formData.append('oderPublish' , input.oderPublish.toString());
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

  static Delete = async (input :{token :string , id: string} ): Promise<ExcuteResult> => {
    const tag = `Delete ${DonGiaTag}`;
    const url = `/api/DonGia/delete?id=${input.id}&v=1.0`
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