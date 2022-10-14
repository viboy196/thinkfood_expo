import {createSlice, PayloadAction} from '@reduxjs/toolkit';


interface TypeTextSearch {
  searchHome?:string;
}

const initialState = {
 searchHome:undefined
} as TypeTextSearch;

export const textSearchSlides = createSlice({
  name: 'textSearch',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setStateTextSearch(state, action: PayloadAction<{search: TypeTextSearch}>) {
      state = action.payload.search;
      
      return state;
    }
  },
});

export const {setStateTextSearch} = textSearchSlides.actions;

export default textSearchSlides.reducer;
