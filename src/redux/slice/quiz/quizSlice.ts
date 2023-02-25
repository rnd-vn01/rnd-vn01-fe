import { createSlice } from '@reduxjs/toolkit';

export const initialStateQuizSlice = {
  isShowingLabelOnHovering: true,
  isHoverable: true,
  showingPoints: [],
  selectedPoint: null,
  markedPoint: null
} as IQuizSlice;

export const quizSlice = createSlice({
  name: 'quiz/quizSlice@',
  initialState: initialStateQuizSlice,
  reducers: {
    resetToInitialStateQuizSlice(state) {
      state.isShowingLabelOnHovering = true;
      state.isHoverable = true;
      state.showingPoints = [];
      state.selectedPoint = null
      state.markedPoint = null
    },

    setStrictMode(state) {
      state.isShowingLabelOnHovering = false;
      state.isHoverable = false;
    },

    unsetStrictMode(state) {
      state.isShowingLabelOnHovering = true;
      state.isHoverable = true;
    },

    highlightPoint(state, action) {
      state.markedPoint = action.payload.markedPoint
    }
  },
});

const { actions, reducer } = quizSlice;
export const { resetToInitialStateQuizSlice, setStrictMode, unsetStrictMode, highlightPoint } = actions;
export default reducer;
