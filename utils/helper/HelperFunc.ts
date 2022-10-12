import { ItemDonGiaLive } from './NhomSanPhamHelper';

export  const genListIdDonGia = (listItem: ItemDonGiaLive[]): string[] => {
    let arr: string[] = [];
    listItem.forEach((x) => {
      if (x.id) {
        arr.push(x.id);
      }
    });
    return arr;
  };

  export const  currencyFormat = (num:number) :string => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }