import {combineReducers} from 'redux';
import authReducer from '../features/auth/authSlices';
import CartOderSlices from '../features/CartOderSlices';
import DonGiaOderSlices from '../features/DonGiaOderSlices';
import DoAnSlices from '../features/DoAnSlices';
import ThucPhamTieuChuanSlices from '../features/ThucPhamTieuChuanSlices';
import DonViDoSlices from '../features/DonViDoSlices';
import SanPhamViewSlices from '../features/SanPhamViewSlices';
import TextSearchSlides from '../features/TextSearchSlides';

export default combineReducers({
  auth: authReducer,
  cart:CartOderSlices,
  donGia:DonGiaOderSlices,
  doAn:DoAnSlices,
  thucPhamTieuChuan:ThucPhamTieuChuanSlices,
  donViDo:DonViDoSlices,
  sanPhamView : SanPhamViewSlices,
  textSearch :TextSearchSlides
});
