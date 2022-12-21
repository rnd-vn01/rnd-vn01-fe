import { combineReducers } from '@reduxjs/toolkit';

import cameraQuaternionSlice from 'src/redux/slice/camera/cameraQuaternionSlice';

export const rootReducer = combineReducers({
  cameraQuaternionSlice
});
