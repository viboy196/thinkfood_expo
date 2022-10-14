import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import ApiRequest from '../../utils/api/Main/ApiRequest';

import { ResultStatusCode } from '../../utils/api/apiTypes';
import { TypeThucPhamTieuChuan } from '../../utils/helper/ThucPhamTieuChuanHelper';

const initialState = {
  loading: 'idle',
  listThucPhamTieuChuan : undefined

} as  {loading?: 'idle' | 'pending' | 'succeeded' | 'failed'; listThucPhamTieuChuan? : Array<TypeThucPhamTieuChuan>};


const ThucPhamTieuChuanSlice = createSlice({
  name: 'ThucPhamTieuChuan',
  initialState,
  reducers: {
    addThucPhamTieuChuanItem(state, action: PayloadAction<{item: TypeThucPhamTieuChuan}>) {
      if(state.listThucPhamTieuChuan){

        state = {
            ...state,
            listThucPhamTieuChuan: [...state.listThucPhamTieuChuan , action.payload.item],
        };
    }else{
        state = {
            ...state,
            listThucPhamTieuChuan: [action.payload.item],
        };
    }
      return state;
    },
    setThucPhamTieuChuanState(state, action: PayloadAction<{listThucPhamTieuChuan: Array<TypeThucPhamTieuChuan>}>) {
        state = {
            ...state,
            listThucPhamTieuChuan: action.payload.listThucPhamTieuChuan
          };

      return state;
      }
     
    ,
    updateThucPhamTieuChuanItem(state, action: PayloadAction<{input: TypeThucPhamTieuChuan}>) {
      if( state.listThucPhamTieuChuan === undefined) return {...state , loading:'failed'};

        const index = state.listThucPhamTieuChuan.findIndex(z => z.id === action.payload.input.id);
        if(index > -1 )
        state.listThucPhamTieuChuan[index] = action.payload.input;
     
        return state;
    },
    removeThucPhamTieuChuanItem(state, action: PayloadAction<{id :string}>) {
      if( state.listThucPhamTieuChuan === undefined) return {...state , loading:'failed'};
      state = {
          ...state,
          listThucPhamTieuChuan: state.listThucPhamTieuChuan.filter(
            todo => todo.id !== action.payload.id,
          ),
        };
      return state;
    },
  },
});
export const {addThucPhamTieuChuanItem , setThucPhamTieuChuanState , updateThucPhamTieuChuanItem , removeThucPhamTieuChuanItem} = ThucPhamTieuChuanSlice.actions;


export default ThucPhamTieuChuanSlice.reducer;