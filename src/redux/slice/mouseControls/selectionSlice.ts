import { createSlice } from '@reduxjs/toolkit';
import { LINE_POINTS } from 'src/configs/constants';

let timestamp = 0;
let currentMinimumDistance = 1000;

export const initialStateSelectionSlice = {
  selectedLabel: null,
  selectedType: null,
  isHoveringPoint: false,
  isHoveringLine: false,
  currentMousePosition: null,
  currentMouseMovePosition: null,
  hoveringLineLabel: null
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
      const pointer = { ...state.currentMousePosition };

      if (pointer != null) {
        let minDistance = 1000;
        let selectedLine = "";

        Object.keys(LINE_POINTS).forEach(meridian => {
          LINE_POINTS[meridian].forEach(linePoint => {
            // Only check if in the same side
            if (linePoint.z * pointer.z >= 0) {
              const distance = Math.sqrt(Math.pow(linePoint.x - pointer.x, 2) + Math.pow(linePoint.y - pointer.y, 2))
              if (distance < minDistance) {
                minDistance = distance
                selectedLine = meridian
              }
            }
          })
        })

        state.selectedLabel = selectedLine;
        state.selectedType = 'line';
      }
    },

    setIsHoveringPoint(state, action) {
      state.isHoveringPoint = action.payload.isHoveringPoint;
    },

    setIsHoveringLine(state, action) {
      state.isHoveringLine = action.payload.isHoveringLine;
    },

    setIsCurrentMousePosition(state, action) {
      state.currentMousePosition = action.payload.currentMousePosition;
    },

    setIsCurrentMouseMovePosition(state, action) {
      state.currentMouseMovePosition = action.payload.currentMouseMovePosition;
    },

    setLineHover(state, action) {
      const pointer = { ...state.currentMouseMovePosition };

      if (pointer != null) {
        let minDistance = 1000;
        let selectedLine = "";

        Object.keys(LINE_POINTS).forEach(meridian => {
          LINE_POINTS[meridian].forEach(linePoint => {
            // Only check if in the same side
            if (linePoint.z * pointer.z >= 0) {
              const distance = Math.sqrt(Math.pow(linePoint.x - pointer.x, 2) + Math.pow(linePoint.y - pointer.y, 2))
              if (distance < minDistance) {
                minDistance = distance
                selectedLine = meridian
              }
            }
          })
        })

        state.hoveringLineLabel = selectedLine;
      }
    }
  },
});

const { actions, reducer } = selectionSlice;
export const { resetToInitialStatePointSelectionSlice, setPointSelected,
  setLineSelected, setIsHoveringPoint, setIsHoveringLine, setIsCurrentMousePosition,
  setIsCurrentMouseMovePosition, setLineHover } = actions;
export default reducer;
