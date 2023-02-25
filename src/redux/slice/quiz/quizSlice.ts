import { createSlice } from '@reduxjs/toolkit';

export const initialStateQuizSlice = {
  isShowingLabelOnHovering: true,
  isHoverable: true,
  showingPoints: [],
  selectedPoint: null,
  markedPoint: null,
  isShowingLabelOnClick: true,
  isQuizMode: false,
  isNavigateQuest: false,
  navigateQuestSelectable: false,
  isQuizField: 0,
  showingCorrectPoint: null
} as IQuizSlice;

export const quizSlice = createSlice({
  name: 'quiz/quizSlice@',
  initialState: initialStateQuizSlice,
  reducers: {
    resetToInitialStateQuizSlice(state) {
      state.isShowingLabelOnHovering = true;
      state.isHoverable = true;
      state.showingPoints = [];
      state.selectedPoint = null;
      state.markedPoint = null;
      state.isShowingLabelOnClick = true;
      state.isQuizMode = false;
      state.navigateQuestSelectable = false;
      state.quizField = 0;
      state.showingCorrectPoint = null;
    },

    resetToInitialStateSceneQuiz(state) {
      state.isShowingLabelOnHovering = true;
      state.isHoverable = true;
      state.showingPoints = [];
      state.selectedPoint = null;
      state.markedPoint = null;
      state.isShowingLabelOnClick = false;
      state.isQuizMode = true;
      state.navigateQuestSelectable = false;
      state.quizField = 0;
      state.showingCorrectPoint = null;
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
    },

    setIsShowingLabelOnClick(state, action) {
      state.isShowingLabelOnClick = action.payload.isShowingLabelOnClick
    },

    setIsQuizMode(state, action) {
      state.isQuizMode = action.payload.isQuizMode;
    },

    setIsNavigateQuest(state, action) {
      state.isNavigateQuest = action.payload.isNavigate
      state.navigateQuestSelectable = action.payload.isNavigate
    },

    setNavigateQuestSelectedPoint(state, action) {
      state.selectedPoint = action.payload.selectedPoint;
    },

    setNavigateQuestSelectable(state, action) {
      state.navigateQuestSelectable = action.payload.selectable;
    },

    setQuizField(state, action) {
      state.quizField = action.payload.field;
    },

    setShowingCorrectPoint(state, action) {
      state.showingCorrectPoint = action.payload.correctPoint;
    }
  },
});

const { actions, reducer } = quizSlice;
export const { resetToInitialStateQuizSlice, setStrictMode, unsetStrictMode, highlightPoint,
  setIsShowingLabelOnClick, setIsQuizMode, setIsNavigateQuest, setNavigateQuestSelectedPoint,
  setNavigateQuestSelectable, resetToInitialStateSceneQuiz, setQuizField, setShowingCorrectPoint } = actions;
export default reducer;
