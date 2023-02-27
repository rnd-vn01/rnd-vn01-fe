import { createSlice } from '@reduxjs/toolkit';

export const initialStateGlobalSlice = {
  modelLoaded: false,
} as IGlobalSlice;

export const globalSlice = createSlice({
  name: 'global/globalSlice@',
  initialState: initialStateGlobalSlice,
  reducers: {
    resetToInitialStateGlobalSlice(state) {
      state.modelLoaded = false;
    },

    setModalLoaded(state, action) {
      state.modelLoaded = action.payload.modelLoaded;
    }
  },
});

const { actions, reducer } = globalSlice;
export const { resetToInitialStateGlobalSlice, setModalLoaded } = actions;
export default reducer;
