import {combineReducers} from '@reduxjs/toolkit';
import useReducer from '../redux/slices/LoginReducer/index';
import alertReducer from '../redux/slices/LogoutREducer/index';

const rootReducer = combineReducers({
  loginUser: useReducer,
  alertSlice: alertReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
