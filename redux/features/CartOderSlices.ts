import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import { TypeCartOder } from '../../utils/helper/CartOderHelper';

const initialState = {
  loading: 'idle',
  listCartOder : undefined

} as  {loading?: 'idle' | 'pending' | 'succeeded' | 'failed'; listCartOder? : Array<TypeCartOder>};


const CartOderSlice = createSlice({
  name: 'CartOder',
  initialState,
  reducers: {
    addCartOderItem(state, action: PayloadAction<{item: TypeCartOder}>) {
      if(state.listCartOder){

        state = {
            ...state,
            listCartOder: [...state.listCartOder , action.payload.item],
        };
    }else{
        state = {
            ...state,
            listCartOder: [action.payload.item],
        };
    }
      return state;
    },
    setCartOderState(state, action: PayloadAction<{listCartOder: Array<TypeCartOder>}>) {
        state = {
            ...state,
            listCartOder: action.payload.listCartOder
          };

      return state;
      }
     
    ,
    updateCartOderItem(state, action: PayloadAction<{input: TypeCartOder}>) {
      if( state.listCartOder === undefined) return {...state , loading:'failed'};

        const index = state.listCartOder.findIndex(z => z.id === action.payload.input.id);
        if(index > -1 )
        state.listCartOder[index] = action.payload.input;
     
        return state;
    },
    removeCartOderItem(state, action: PayloadAction<{id :string}>) {
      if( state.listCartOder === undefined) return {...state , loading:'failed'};
      state = {
          ...state,
          listCartOder: state.listCartOder.filter(
            todo => todo.id !== action.payload.id,
          ),
        };
      return state;
    },
  },
});
export const {addCartOderItem , setCartOderState , updateCartOderItem , removeCartOderItem} = CartOderSlice.actions;


export default CartOderSlice.reducer;