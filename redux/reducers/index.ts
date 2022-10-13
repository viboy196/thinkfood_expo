import {combineReducers} from 'redux';


import authReducer from '../features/auth/authSlices';
import CartOderSlices from '../features/CartOderSlices';


// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {persistStore, persistReducer} from 'redux-persist';

export default combineReducers({
  auth: authReducer,
  cart:CartOderSlices,
});
