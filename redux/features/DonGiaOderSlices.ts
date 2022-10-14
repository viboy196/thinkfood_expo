import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import ApiRequest from '../../utils/api/Main/ApiRequest';

import { ResultStatusCode } from '../../utils/api/apiTypes';
import { TypeDonGia } from '../../utils/helper/DonGiaHelper';

const initialState = {
  loading: 'idle',
  listDonGia : undefined

} as  {loading?: 'idle' | 'pending' | 'succeeded' | 'failed'; listDonGia? : Array<TypeDonGia>};


const DonGiaSlice = createSlice({
  name: 'DonGia',
  initialState,
  reducers: {
    addDonGiaItem(state, action: PayloadAction<{item: TypeDonGia}>) {
      if(state.listDonGia){

        state = {
            ...state,
            listDonGia: [...state.listDonGia , action.payload.item],
        };
    }else{
        state = {
            ...state,
            listDonGia: [action.payload.item],
        };
    }
      return state;
    },
    setDonGiaState(state, action: PayloadAction<{listDonGia: Array<TypeDonGia>}>) {
        state = {
            ...state,
            listDonGia: action.payload.listDonGia
          };

      return state;
      }
     
    ,
    updateDonGiaItem(state, action: PayloadAction<{input: TypeDonGia}>) {
      if( state.listDonGia === undefined) return {...state , loading:'failed'};

        const index = state.listDonGia.findIndex(z => z.id === action.payload.input.id);
        if(index > -1 )
        state.listDonGia[index] = action.payload.input;
     
        return state;
    },
    removeDonGiaItem(state, action: PayloadAction<{id :string}>) {
      if( state.listDonGia === undefined) return {...state , loading:'failed'};
      state = {
          ...state,
          listDonGia: state.listDonGia.filter(
            todo => todo.id !== action.payload.id,
          ),
        };
      return state;
    },
  },
});
export const {addDonGiaItem , setDonGiaState , updateDonGiaItem , removeDonGiaItem} = DonGiaSlice.actions;


export default DonGiaSlice.reducer;