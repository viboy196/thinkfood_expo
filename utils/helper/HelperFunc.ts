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