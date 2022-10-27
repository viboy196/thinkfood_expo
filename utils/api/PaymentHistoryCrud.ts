import { AxiosRequestConfig } from "axios";
import { ExcuteResult } from "./apiTypes";
import axios from "./axios";


const PaymentHistoryTag = 'PaymentHistory';

export default class PaymentHistoryCrud {
  static getAllByUser = async (token :string): Promise<ExcuteResult> => {
    const tag = `getAllByUser ${PaymentHistoryTag}`;
    const url = `/api/PaymentHistory/getAllByUser?v=1.0`;
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
  static getAllByIdKhachHang = async (idKhachHang :string , token:string): Promise<ExcuteResult> => {
    const tag = `getAllByIdKhachHang ${PaymentHistoryTag}`;
    const url = `/api/PaymentHistory/getAllByIdKhachHang?idKhachHang=${idKhachHang}&v=1.0`;
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
    const tag = `detail ${PaymentHistoryTag}`;
    const url = `/api/PaymentHistory/detail?id=${id}&v=1.0`;
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
  static Delete = async (input :{token :string , id: string} ): Promise<ExcuteResult> => {
    const tag = `Delete ${PaymentHistoryTag}`;
    const url = `/api/PaymentHistory/delete?id=${input.id}&v=1.0`
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