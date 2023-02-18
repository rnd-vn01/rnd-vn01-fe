import { combineReducers } from '@reduxjs/toolkit';

import cameraQuaternionSlice from 'src/redux/slice/camera/cameraQuaternionSlice';
import authSlice from 'src/redux/slice/auth/authSlice';
import languageSlice from 'src/redux/slice/settings/languageSlice';
import selectionSlice from 'src/redux/slice/mouseControls/selectionSlice';

export const rootReducer = combineReducers({
  cameraQuaternionSlice,
  authSlice,
  languageSlice,
  selectionSlice
});
