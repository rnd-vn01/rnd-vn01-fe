import { combineReducers } from '@reduxjs/toolkit';

import cameraQuaternionSlice from 'src/redux/slice/camera/cameraQuaternionSlice';
import authSlice from 'src/redux/slice/auth/authSlice';

export const rootReducer = combineReducers({
  cameraQuaternionSlice,
  authSlice
});
