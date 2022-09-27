import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { LoginUserState, SetIsLogin, SetLoginWith, SetUserData } from './type';

export const initialState: LoginUserState = {
  email: '',
  name: '',
  familyName: '',
  givenName: '',
  photo: '',
  id: '',
  isLogin: false,
  loginWith: '',
};

const loginUser = createSlice({
  name: 'loginUser',
  reducers: {
    setUserData: (state, action: PayloadAction<SetUserData>) => {
      return Object.assign({}, state, {
        ...action.payload.user,
      });
    },
    setIsLogin: (state, action: PayloadAction<SetIsLogin>) => {
      state.isLogin = action.payload.isLogin;
    },
    setLoginWith: (state, action: PayloadAction<SetLoginWith>) => {
      state.loginWith = action.payload.loginWith;
    },
    resetUser: () => {
      return initialState;
    },
  },
  initialState,
});

export const {setUserData, setIsLogin, setLoginWith, resetUser} =
  loginUser.actions;

export default loginUser.reducer;
