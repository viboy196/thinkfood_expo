import {  createSlice, PayloadAction} from '@reduxjs/toolkit';
import {  TypeCartOderItem } from '../../utils/helper/CartOderHelper';
import {persistReducer} from 'redux-persist';


const initialState = {
  loading: 'idle',
  listCartItem : undefined,
  idKhachHang:undefined,
  id:undefined

} as  {loading?: 'idle' | 'pending' | 'succeeded' | 'failed'; id?:string, idKhachHang?:string;  listCartItem? : Array<TypeCartOderItem>};


const CartOderKhachHangSlices = createSlice({
  name: 'CartOderKhachHangSlices',
  initialState,
  reducers: {
    addCartOderItem(state, action: PayloadAction<{item: TypeCartOderItem}>) {
      if(state.listCartItem){
        const index = state.listCartItem.findIndex(x => x.idDonGia === action.payload.item.idDonGia);
        if(index >= 0){
          alert('sản phẩm đã nằm trong giỏ hàng')
          return;
        }

        state = {
            ...state,
            listCartItem: [...state.listCartItem , action.payload.item],
        };
    }else{
        state = {
            ...state,
            listCartItem: [action.payload.item],
        };
    }
      return state;
    },
    setCartOderState(state, action: PayloadAction<{listCartItem: Array<TypeCartOderItem> , id?:string , idKhachHang?:string}>) {
       
          state = {
            ...state,
            listCartItem: action.payload.listCartItem,
            id:action.payload.id ? action.payload.id : state.id ,
            idKhachHang:action.payload.idKhachHang ? action.payload.idKhachHang : state.idKhachHang
          };
        
      return state;
      }
     
    ,
    updateCartOderItem(state, action: PayloadAction<{input: TypeCartOderItem}>) {
      if( state.listCartItem === undefined) return {...state , loading:'failed'};

        const index = state.listCartItem.findIndex(z => z.idDonGia === action.payload.input.idDonGia);
        if(index > -1 )
        state.listCartItem[index] = action.payload.input;
     
        return state;
    },
    removeCartOderItem(state, action: PayloadAction<{idDonGia :string}>) {
      if( state.listCartItem === undefined) return {...state , loading:'failed'};
      state = {
          ...state,
          listCartItem: state.listCartItem.filter(
            todo => todo.idDonGia !== action.payload.idDonGia,
          ),
        };
      return state;
    },
  },
});
export const {addCartOderItem , setCartOderState , updateCartOderItem , removeCartOderItem} = CartOderKhachHangSlices.actions;



export default  CartOderKhachHangSlices.reducer;