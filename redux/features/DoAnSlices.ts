import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ResultStatusCode } from '../../utils/api/apiTypes';
import DoAnCrud from '../../utils/api/DoAnCrud';
import {  TypeDoAn } from '../../utils/helper/DoAnHelper';

const initialState = {
  loading: 'idle',
  listDoAn : undefined

} as  {loading?: 'idle' | 'pending' | 'succeeded' | 'failed'; listDoAn? : Array<TypeDoAn>};

export const getAllDoAnAsync = createAsyncThunk(
  `DoAn/getAll`,
  async (input :{token:string}) => {
    return await DoAnCrud.GetAll(input.token);
  },
);

const DoAnSlice = createSlice({
  name: 'DoAn',
  initialState,
  reducers: {
    addDoAnItem(state, action: PayloadAction<{item: TypeDoAn}>) {
      if(state.listDoAn){

        state = {
            ...state,
            listDoAn: [...state.listDoAn , action.payload.item],
        };
    }else{
        state = {
            ...state,
            listDoAn: [action.payload.item],
        };
    }
      return state;
    },
    setDoAnState(state, action: PayloadAction<{listDoAn: Array<TypeDoAn>}>) {
        state = {
            ...state,
            listDoAn: action.payload.listDoAn
          };

      return state;
      }
     
    ,
    updateDoAnItem(state, action: PayloadAction<{input: TypeDoAn}>) {
      if( state.listDoAn === undefined) return {...state , loading:'failed'};

        const index = state.listDoAn.findIndex(z => z.id === action.payload.input.id);
        if(index > -1 )
        state.listDoAn[index] = action.payload.input;
     
        return state;
    },
    removeDoAnItem(state, action: PayloadAction<{id :string}>) {
      if( state.listDoAn === undefined) return {...state , loading:'failed'};
      state = {
          ...state,
          listDoAn: state.listDoAn.filter(
            todo => todo.id !== action.payload.id,
          ),
        };
      return state;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getAllDoAnAsync.pending, state => {
        state = {...state, loading: 'pending'};
        return state;
      })
      .addCase(getAllDoAnAsync.fulfilled, (state, action) => {
        console.log('loginAsync fulfilled', action.payload);
      
        if (action.payload.code === ResultStatusCode.success) {
            state = {
              ...state,
              loading: 'succeeded',
              listDoAn: action.payload.result,
            };
          
        } else {
          state = {
            ...state,
            loading: 'failed',
            listDoAn: undefined
          };
        }
        return state;
      })
  },
});
export const {addDoAnItem , removeDoAnItem , setDoAnState , updateDoAnItem} = DoAnSlice.actions;


export default DoAnSlice.reducer;