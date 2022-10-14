import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import ApiRequest from '../../utils/api/Main/ApiRequest';

import { ResultStatusCode } from '../../utils/api/apiTypes';
import { TypeDonViDo } from '../../utils/helper/DonViDoHelper';

const initialState = {
  loading: 'idle',
  listDonViDo : undefined

} as  {loading?: 'idle' | 'pending' | 'succeeded' | 'failed'; listDonViDo? : Array<TypeDonViDo>};


const DonViDoSlice = createSlice({
  name: 'DonViDo',
  initialState,
  reducers: {
    addDonViDoItem(state, action: PayloadAction<{item: TypeDonViDo}>) {
      if(state.listDonViDo){

        state = {
            ...state,
            listDonViDo: [...state.listDonViDo , action.payload.item],
        };
    }else{
        state = {
            ...state,
            listDonViDo: [action.payload.item],
        };
    }
      return state;
    },
    setDonViDoState(state, action: PayloadAction<{listDonViDo: Array<TypeDonViDo>}>) {
        state = {
            ...state,
            listDonViDo: action.payload.listDonViDo
          };

      return state;
      }
     
    ,
    updateDonViDoItem(state, action: PayloadAction<{input: TypeDonViDo}>) {
      if( state.listDonViDo === undefined) return {...state , loading:'failed'};

        const index = state.listDonViDo.findIndex(z => z.id === action.payload.input.id);
        if(index > -1 )
        state.listDonViDo[index] = action.payload.input;
     
        return state;
    },
    removeDonViDoItem(state, action: PayloadAction<{id :string}>) {
      if( state.listDonViDo === undefined) return {...state , loading:'failed'};
      state = {
          ...state,
          listDonViDo: state.listDonViDo.filter(
            todo => todo.id !== action.payload.id,
          ),
        };
      return state;
    },
  },
});
export const {addDonViDoItem , setDonViDoState , updateDonViDoItem , removeDonViDoItem} = DonViDoSlice.actions;


export default DonViDoSlice.reducer;