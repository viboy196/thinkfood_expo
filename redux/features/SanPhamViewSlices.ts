import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import ApiRequest from '../../utils/api/Main/ApiRequest';

import { ResultStatusCode } from '../../utils/api/apiTypes';
import { TypeDonGia } from '../../utils/helper/DonGiaHelper';

export type TypeDonGiaView = TypeDonGia & { name?: string;
  nameDiemAmThuc?:string;
  avatarUri?: string;
  nameDonViDo?: string;
  listMediaUri?: string[];
  idDauBep?:string;
  info?: string;
  isBook?:boolean,
  timeBook?:string,
  status?:string,
  activeTime?:string
}

const initialState = {
  loading: 'idle',
  listSanPhamView : undefined

} as  {loading?: 'idle' | 'pending' | 'succeeded' | 'failed'; listSanPhamView? : Array<TypeDonGiaView>};


const SanPhamViewSlice = createSlice({
  name: 'SanPhamView',
  initialState,
  reducers: {
    addSanPhamViewItem(state, action: PayloadAction<{item: TypeDonGiaView}>) {
      if(state.listSanPhamView){

        state = {
            ...state,
            listSanPhamView: [...state.listSanPhamView , action.payload.item],
        };
    }else{
        state = {
            ...state,
            listSanPhamView: [action.payload.item],
        };
    }
      return state;
    },
    setSanPhamViewState(state, action: PayloadAction<{listSanPhamView: Array<TypeDonGiaView>}>) {
        state = {
            ...state,
            listSanPhamView: action.payload.listSanPhamView
          };

      return state;
      }
     
    ,
    updateSanPhamViewItem(state, action: PayloadAction<{input: TypeDonGiaView}>) {
      if( state.listSanPhamView === undefined) return {...state , loading:'failed'};

        const index = state.listSanPhamView.findIndex(z => z.id === action.payload.input.id);
        if(index > -1 )
        state.listSanPhamView[index] = action.payload.input;
     
        return state;
    },
    removeSanPhamViewItem(state, action: PayloadAction<{id :string}>) {
      if( state.listSanPhamView === undefined) return {...state , loading:'failed'};
      state = {
          ...state,
          listSanPhamView: state.listSanPhamView.filter(
            todo => todo.id !== action.payload.id,
          ),
        };
      return state;
    },
  },
});
export const {addSanPhamViewItem , setSanPhamViewState , updateSanPhamViewItem , removeSanPhamViewItem} = SanPhamViewSlice.actions;


export default SanPhamViewSlice.reducer;