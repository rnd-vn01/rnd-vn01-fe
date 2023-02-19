import { createSlice } from '@reduxjs/toolkit';

let timestamp = 0;

export const initialStateSelectionSlice = {
  selectedLabel: null,
  selectedType: null,
  isHoveringPoint: false,
  isHoveringLine: false,
} as ISelectionSlice;

export const selectionSlice = createSlice({
  name: 'mouseControls/selectionSlice@',
  initialState: initialStateSelectionSlice,
  reducers: {
    resetToInitialStatePointSelectionSlice(state) {
      state.selectedLabel = null;
      state.selectedType = null;
      state.isHoveringPoint = false;
      state.isHoveringLine = false;
    },

    setPointSelected(state, action) {
      state.selectedLabel = action.payload.selectedLabel;
      state.selectedType = 'point';
    },

    setLineSelected(state, action) {
      //IDEA: Pass the list of points and select the line recorded the point closest to the cursor     
      const currentTimestamp = Date.now()
      if (timestamp === 0 || (currentTimestamp - timestamp > 1000)) {
        state.selectedLabel = action.payload.selectedLabel;
        state.selectedType = 'line';
        timestamp = currentTimestamp;
      }
    },

    setIsHoveringPoint(state, action) {
      state.isHoveringPoint = action.payload.isHoveringPoint;
    },

    setIsHoveringLine(state, action) {
      state.isHoveringLine = action.payload.isHoveringLine;
    }
  },
});

const { actions, reducer } = selectionSlice;
export const { resetToInitialStatePointSelectionSlice, setPointSelected,
  setLineSelected, setIsHoveringPoint, setIsHoveringLine } = actions;
export default reducer;
