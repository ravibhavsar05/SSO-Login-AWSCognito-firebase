import {createSlice} from '@reduxjs/toolkit';
import {AlertState, AlertType} from './type';

export const initialState: AlertState = {
  alert: null,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    hideAlert: () => {
      return initialState;
    },
    showNoInternetAlert: () => {
      return {
        alert: {
          type: AlertType.NO_INTERNET,
        },
      };
    },
    showLogOutAlert: () => {
      return {
        alert: {
          type: AlertType.LOGOUT,
        },
      };
    }, 
  },
});

export const {showNoInternetAlert, hideAlert, showLogOutAlert} =
alertSlice.actions;

export default alertSlice.reducer;
