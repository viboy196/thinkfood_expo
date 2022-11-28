import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ResultStatusCode } from '../../utils/api/apiTypes';
import DiemAmThucCrud from '../../utils/api/DiemAmThucCrud';
import { DiemAmThucTitle, TypeDiemAmThuc } from '../../utils/helper/DiemAmThucHelper';

const initialState = {
  loading: 'idle',
  listDiemAmThuc : undefined

} as  {loading?: 'idle' | 'pending' | 'succeeded' | 'failed'; listDiemAmThuc? : Array<TypeDiemAmThuc>};

export const getAllDiemAmThucAsync = createAsyncThunk(
  `${DiemAmThucTitle.tag}/getAll`,
  async (input :{token:string}) => {
    return await DiemAmThucCrud.GetAll(input.token);
  },
);

const DiemAmThucSlice = createSlice({
  name: 'DiemAmThuc',
  initialState,
  reducers: {
    addDiemAmThucItem(state, action: PayloadAction<{item: TypeDiemAmThuc}>) {
      if(state.listDiemAmThuc){

        state = {
            ...state,
            listDiemAmThuc: [...state.listDiemAmThuc , action.payload.item],
        };
    }else{
        state = {
            ...state,
            listDiemAmThuc: [action.payload.item],
        };
    }
      return state;
    },
    setDiemAmThucState(state, action: PayloadAction<{listDiemAmThuc: Array<TypeDiemAmThuc>}>) {
        state = {
            ...state,
            listDiemAmThuc: action.payload.listDiemAmThuc
          };

      return state;
      }
     
    ,
    updateDiemAmThucItem(state, action: PayloadAction<{input: TypeDiemAmThuc}>) {
      if( state.listDiemAmThuc === undefined) return {...state , loading:'failed'};

        const index = state.listDiemAmThuc.findIndex(z => z.id === action.payload.input.id);
        if(index > -1 )
        state.listDiemAmThuc[index] = action.payload.input;
     
        return state;
    },
    removeDiemAmThucItem(state, action: PayloadAction<{id :string}>) {
      if( state.listDiemAmThuc === undefined) return {...state , loading:'failed'};
      state = {
          ...state,
          listDiemAmThuc: state.listDiemAmThuc.filter(
            todo => todo.id !== action.payload.id,
          ),
        };
      return state;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getAllDiemAmThucAsync.pending, state => {
        state = {...state, loading: 'pending'};
        return state;
      })
      .addCase(getAllDiemAmThucAsync.fulfilled, (state, action) => {
        console.log('loginAsync fulfilled', action.payload);
      
        if (action.payload.code === ResultStatusCode.success) {
            state = {
              ...state,
              loading: 'succeeded',
              listDiemAmThuc: action.payload.result,
            };
          
        } else {
          state = {
            ...state,
            loading: 'failed',
            listDiemAmThuc: undefined
          };
        }
        return state;
      })
  },
});
export const {addDiemAmThucItem , removeDiemAmThucItem , setDiemAmThucState , updateDiemAmThucItem} = DiemAmThucSlice.actions;


export default DiemAmThucSlice.reducer;