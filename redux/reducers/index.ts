import {combineReducers} from 'redux';
import authReducer from '../features/auth/authSlices';
import NotificationSlice from '../features/notification/NotificationSlice';

import CartOderSlices from '../features/CartOderSlices';
import DonGiaOderSlices from '../features/DonGiaOderSlices';
import DoAnSlices from '../features/DoAnSlices';
import ThucPhamTieuChuanSlices from '../features/ThucPhamTieuChuanSlices';
import DonViDoSlices from '../features/DonViDoSlices';
import SanPhamViewSlices from '../features/SanPhamViewSlices';
import TextSearchSlides from '../features/TextSearchSlides';
import DiemAmThucSlices from '../features/DiemAmThucSlices';

export default combineReducers({
  auth: authReducer,
  noti:NotificationSlice,
  cart:CartOderSlices,
  donGia:DonGiaOderSlices,
  DiemAmThuc:DiemAmThucSlices,
  doAn:DoAnSlices,
  thucPhamTieuChuan:ThucPhamTieuChuanSlices,
  donViDo:DonViDoSlices,
  sanPhamView : SanPhamViewSlices,
  textSearch :TextSearchSlides
});
