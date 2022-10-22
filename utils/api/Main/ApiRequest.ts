import axios , {AxiosRequestConfig} from 'axios';
import {ExcuteResult} from '../apiTypes';

// const host = 'https://27.71.228.66:7683';
//const host = 'https://localhost:7241';

axios.defaults.baseURL = "https://thinkfood.vn:7683/"   ;

export default class ApiRequest {

  static LoginApi = async (input: {
    phone: string;
    password: string;
  }): Promise<ExcuteResult> => {
    const url = '/api/Auth/login?v=1.0';
    console.log('urlLogin ', url);
    const res = await axios.post(url, {
      phone: input.phone,
      password: input.password,
    });
    console.log(res.data);
    return res.data as ExcuteResult;
  };
  
  static createNewPasswordTemporary = async (input: {
    id: string;
    newPassword: string;
  }): Promise<ExcuteResult> => {
    const url = '/api/Account/create-new-password-temporary?v=1.0';
    console.log('createNewPasswordTemporary ', url);

    const config: AxiosRequestConfig = {
      headers: {
        accept: 'text/plain',

        "Content-Type" : "application/json"
      },
    };
    
    const res = await axios.post(url, input , config);
    console.log(res.data);
    return res.data as ExcuteResult;
  };

  static Register = async (input: {
    phone: string;
    password: string;
    fullName:string;
  }): Promise<ExcuteResult> => {
    const url = '/api/Account/register?v=1.0';
    console.log('Register url ', url);
    const res = await axios.post(url, input);
    console.log(res.data);
    return res.data as ExcuteResult;
  };
  
  static Active = async (input: {
    phone: string;
    code:string
  }): Promise<ExcuteResult> => {
    const url = '/api/Account/active?v=1.0';
    console.log('Active url ', url);
    const res = await axios.post(url, input);
    console.log(res.data);
    return res.data as ExcuteResult;
  };
  
  static getAccountByPhone = async (input: {
    phone: string;
  }): Promise<ExcuteResult> => {
    const url = `/api/Account/getAccountByPhone?phone=${input.phone}&v=1.0`;
    console.log('getAccountByPhone url ', url);
    const config: AxiosRequestConfig = {
      headers: {
        accept: 'text/plain',

        "Content-Type" : "application/json"
      },
    };

    const res = await axios.get(url , config);
    return res.data as ExcuteResult;
  };

  static SendOtp = async (input: {
    phone: string;
  }): Promise<ExcuteResult> => {
    const url = '/api/Account/send-sms-opt?v=1.0';
    console.log('SendOtp url ', url);
    const res = await axios.post(url, input);
    console.log(res.data);
    return res.data as ExcuteResult;
  };



  static GetAllMonAn = async (token :string): Promise<ExcuteResult> => {
    const tag = 'GetAllMonAn';
    const url = '/api/MonAn/all?v=1.0';
    console.log('urlLogin ', url);

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
  
  static OnePayBuyGoiTieuDung = async (token :string , idGoiTieuDung): Promise<ExcuteResult> => {
    const tag = 'OnePayBuyGoiTieuDung';
    const url = `/api/OnePay/buyGoiTieuDung?id=${idGoiTieuDung}&v=1.0`;
    console.log('urlLogin ', url);

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
  
  static getBalance = async (token :string): Promise<ExcuteResult> => {
    const tag = 'getBalance';
    const url = `/api/Account/getBalance?v=1.0`;
    console.log('urlLogin ', url);

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


  static getPhoneActive = async (token :string): Promise<ExcuteResult> => {
    const tag = 'getPhoneActive';
    const url = '/api/OnCall/getPhoneActive?v=1.0';
    console.log( `${tag} url`, url);

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
  

  
  static GetMonAnByIdLoaiMonAn = async (id :string): Promise<ExcuteResult> => {
    const tag = 'GetAllMonAn';
    const url = `/api/MonAn/get-MonAn-By-LoaiMonAn?idLoaiMonAn=${id}&v=1.0`;
    console.log('urlLogin ', url);

    const config: AxiosRequestConfig = {
      headers: {
        accept: 'text/plain',
      },
    };

    const res = await axios.get(url , config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    
    return res.data as ExcuteResult;
  };


 
  
  static AddMonAn = async (token :string , input : {Name : string  , info? : string ,avartarImageFile? : File    ,DsIdLoaiMatHang? : Array<string> , listMediaFile?:Array<File>  }): Promise<ExcuteResult> => {
    const tag = 'AddMonAn';
    const url = '/api/MonAn/add?v=1.0';
    console.log('urlLogin ', url);

    let formdata = new FormData();
    if(input.avartarImageFile){
      formdata.append('avartarImageFile' , input.avartarImageFile);
    }
    formdata.append('Name' , input.Name);
    if(input.info){
      formdata.append('info' , input.info);
    }
    if(input.DsIdLoaiMatHang){
      input.DsIdLoaiMatHang.forEach(item => {
        formdata.append('DsIdLoaiMatHang' , item);
      })
    }
    if(input.listMediaFile){
      input.listMediaFile.forEach(item => {
        formdata.append('listMediaFile' , item);
      })
    }
    console.log(formdata, '$$$$');
    

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
        "Content-Type" : "multipart/form-data"
      },
    };
    const res = await axios.post(url , formdata , config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    
    return res.data as ExcuteResult;
  };



  static GetDetailUser = async (token :string): Promise<ExcuteResult> => {
    const tag = 'GetDetailUser';
    const url = '/api/Account/detail?v=1.0';
    console.log('url', url);

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

  // loai Nguyên Liệu
  static GetLoaiNguyenLieu = async (token :string): Promise<ExcuteResult> => {
    const tag = 'GetLoaiNguyenLieu';
    const url = '/api/LoaiNguyenLieu/all?v=1.0';
    console.log(`${tag} url`, url);

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
  static AddLoaiNguyenLieu = async (token :string , input : {Name : string  , info? : string ,avartarImageFile? : File   }): Promise<ExcuteResult> => {
    const tag = 'addLoaiNguyenLieu';
    const url = '/api/LoaiNguyenLieu/add?v=1.0';
    console.log(`${tag} url :`, url);

    let formdata = new FormData();
    if(input.avartarImageFile){
      formdata.append('avartarImageFile' , input.avartarImageFile);
    }
    formdata.append('Name' , input.Name);
    formdata.append('Type' , "MonAn");
    if(input.info){
      formdata.append('info' , input.info);
    }
    console.log(formdata, '$$$$');
    

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
        "Content-Type" : "multipart/form-data"
      },
    };
    const res = await axios.post(url , formdata , config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    
    return res.data as ExcuteResult;
  };


    static RemoveLoaiNguyenLieu = async (input : {token:string , id :string}): Promise<ExcuteResult> => {
      const tag = 'GetLoaiNguyenLieu';
      const url = `/api/LoaiNguyenLieu/delete?id=${input.id}&v=1.0`;
      console.log(`${tag} url`, url);
  
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

    // Nguyên liệu
    static GetNguyenLieu = async (token :string): Promise<ExcuteResult> => {
      const tag = 'GetNguyenLieu';
      const url = '/api/NguyenLieu/all?v=1.0';
      console.log(`${tag} url`, url);
  
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

    // role

    static GetRoleAll = async (token :string): Promise<ExcuteResult> => {
      const tag = 'GetRoleAll';
      const url = '/api/AppRole/all?v=1.0';
      console.log(`${tag} url`, url);
  
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

    static AddKhachHang = async (token :string , input : {phone : string  , fullName:string  }): Promise<ExcuteResult> => {
      const tag = 'AddKhachHang';
      const url = '/api/Account/addKhachHang?v=1.0';
      console.log(`${tag} url :`, url);  

  
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `bearer ${token}`,
          accept: 'text/plain',
          "Content-Type" : "application/json"
        },
      };
      const res = await axios.post(url , input , config);
      console.log(`${tag} data key.length :`, Object.keys(res.data).length);
      
      return res.data as ExcuteResult;
    };
    

    static RemoveAppRole = async ( input : {token:string , id :string}): Promise<ExcuteResult> => {
      const tag = 'RemoveAppRole';
      const url = `/api/AppRole/delete?id=${input.id}&v=1.0`;
      console.log(`${tag} url`, url);
  
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



    static GetListAccountAll = async (token :string): Promise<ExcuteResult> => {
      const tag = 'GetListAccountAll';
      const url = '/api/Account/all?v=1.0';
      console.log(`${tag} url`, url);
  
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

    static UpdateRoleByIdAccount = async (token :string , input : {id : string  , listRole : Array< string>}): Promise<ExcuteResult> => {
      const tag = 'UpdateRoleByIdAccount';
      const url = `/api/Account/update-role-by-id?id=${input.id}&v=1.0`;
      console.log(`${tag} url :`, url);  

  
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `bearer ${token}`,
          accept: 'text/plain',
          "Content-Type" : "application/json"
        },
      };
      const res = await axios.post(url , input.listRole , config);
      console.log(`${tag} data key.length :`, Object.keys(res.data).length);
      
      return res.data as ExcuteResult;
    };

    static AddAccount = async (token :string , input : {phone : string  , password : string ,fullName : string    }): Promise<ExcuteResult> => {
      const tag = 'AddAccount';
      const url = '/api/Account/add?v=1.0';
      console.log(`${tag} url :`, url);  

  
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `bearer ${token}`,
          accept: 'text/plain',
          "Content-Type" : "application/json"
        },
      };
      const res = await axios.post(url , input , config);
      console.log(`${tag} data key.length :`, Object.keys(res.data).length);
      
      return res.data as ExcuteResult;
    };
}
