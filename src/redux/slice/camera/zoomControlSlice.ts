import { createSlice } from '@reduxjs/toolkit';
import { ZOOM_CONTROL_LEVEL } from 'src/configs/constants';

export const initialStateZoomControlSlice = {
  isInCloseZoomMode: ZOOM_CONTROL_LEVEL.FAR
} as IZoomControlSlice;

export const zoomControlSlice = createSlice({
  name: 'camera/zoomControlSlice@',
  initialState: initialStateZoomControlSlice,
  reducers: {
    resetToInitialStateZoomControlSlice(state) {
      state.isInCloseZoomMode = ZOOM_CONTROL_LEVEL.FAR;
    },

    setInCloseZoomMode(state, action) {
      state.isInCloseZoomMode = action.payload.isInCloseZoomMode;
    }
  },
});

const { actions, reducer } = zoomControlSlice;
export const { resetToInitialStateZoomControlSlice,
  setInCloseZoomMode } = actions;
export default reducer;
