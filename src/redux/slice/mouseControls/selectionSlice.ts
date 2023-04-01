import { createSlice } from '@reduxjs/toolkit';
import { getNeighborPoints } from 'src/helpers/getNeighborsPoints';
import { LINE_POINTS, POINT_LOCATIONS } from 'src/configs/constants';

export const initialStateSelectionSlice = {
  selectedLabel: null,
  selectedType: null,
  isHoveringPoint: false,
  isHoveringLine: false,
  currentMousePosition: null,
  currentMouseMovePosition: null,
  hoveringLineLabel: null,
  firstSelected: false,
  isSelectingFromMenu: false,
  pointPosition: null,
  isShowingQuickInformation: null,
  preSelectLine: null,
  showingNeighbors: [],
  secondarySelectedMeridian: null,
  backupSelectedPoint: "",
  backupSelectedNeighbors: [],
} as ISelectionSlice;

export const selectionSlice = createSlice({
  name: 'mouseControls/selectionSlice@',
  initialState: initialStateSelectionSlice,
  reducers: {
    resetToInitialStatePointSelectionSlice(state) {
      state.backupSelectedPoint = `${state.selectedLabel}` || "";
      state.backupSelectedNeighbors = JSON.parse(JSON.stringify(state.showingNeighbors)) || []
      state.selectedLabel = null;
      state.selectedType = null;
      state.isHoveringPoint = false;
      state.isHoveringLine = false;
      state.currentMouseMovePosition = null;
      state.currentMousePosition = null;
      state.hoveringLineLabel = null;
      state.firstSelected = false;
      state.isSelectingFromMenu = false;
      state.pointPosition = null;
      state.isShowingQuickInformation = null;
      state.preSelectLine = null;
      state.showingNeighbors = [];
      state.secondarySelectedMeridian = null;
    },

    setPointSelected(state, action) {
      const backupCurrentSelectedPoint = `${state.backupSelectedPoint}`;

      state.firstSelected = false;
      state.isSelectingFromMenu = false;
      state.pointPosition = action.payload.pointPosition;
      state.selectedLabel = action.payload.selectedLabel;
      state.selectedType = 'point';
      state.preSelectLine = null;

      if (action.payload.selectedLabel) {
        console.log(backupCurrentSelectedPoint)

        // In case not the first item selected
        if (backupCurrentSelectedPoint !== null && backupCurrentSelectedPoint !== undefined
          && backupCurrentSelectedPoint !== "M-HN-3") {
          // Check to mark in case of a neighbor
          // If is in the neighbor list
          console.log(state.backupSelectedNeighbors)

          if (state.backupSelectedNeighbors?.includes(action.payload.selectedLabel)) {
            // If not being also one from secondary selected meridian
            if (state.secondarySelectedMeridian === null ||
              state.secondarySelectedMeridian === undefined) {
              // If not of the same meridian
              let selectedPointMeridian = backupCurrentSelectedPoint.split("-") as any
              selectedPointMeridian = selectedPointMeridian[0]

              // New meridian
              let newPointMeridian = action.payload.selectedLabel.split("-") as any
              newPointMeridian = newPointMeridian[0]

              console.log(selectedPointMeridian, newPointMeridian)

              if (selectedPointMeridian !== newPointMeridian) {
                state.secondarySelectedMeridian = selectedPointMeridian
              }
            }
          }
        }

        state.showingNeighbors = getNeighborPoints(action.payload.selectedLabel, true, 1.5, "unlimited")
      }
    },

    setLineSelected(state, action) {
      //IDEA: Pass the list of points and select the line recorded the point closest to the cursor     
      const pointer = { ...state.currentMousePosition };

      if (Object.keys(pointer).length > 0) {
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

        if (minDistance < 0.5) {
          state.selectedLabel = selectedLine;
          state.selectedType = 'line';
          state.isSelectingFromMenu = false;
          state.preSelectLine = null;
        }
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
      let pointer = action.payload.currentMouseMovePosition
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

        if (minDistance < 0.5) {
          state.hoveringLineLabel = selectedLine;
        } else {
          state.hoveringLineLabel = null;
        }
      }
    },

    setLineHover(state, action) {
      const pointer = { ...state.currentMouseMovePosition };

      if (Object.keys(pointer).length > 0) {
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

        if (minDistance < 0.5) {
          state.hoveringLineLabel = selectedLine;
        }
      }
    },

    setLineSelectedByLabel(state, action) {
      state.firstSelected = true;
      state.isSelectingFromMenu = true;
      state.selectedLabel = action.payload.selectedLine;
      state.selectedType = 'line';
      state.preSelectLine = null;
    },

    setLinePreSelectByLabel(state, action) {
      state.preSelectLine = action.payload.line;
    },

    setShowingQuickInformation(state, action) {
      state.isShowingQuickInformation = action.payload.quickInformation
    },

    setPointSelectedByLabel(state, action) {
      const pointPosition = POINT_LOCATIONS[action.payload.selectedPoint]["position"];
      state.pointPosition = {
        x: pointPosition[0],
        y: pointPosition[1],
        z: pointPosition[2],
        reverse: POINT_LOCATIONS[action.payload.selectedPoint]["reverse"],
        viewFromBottom: POINT_LOCATIONS[action.payload.selectedPoint]["viewFromBottom"]
      }
      state.firstSelected = true;
      state.isSelectingFromMenu = true;
      state.selectedLabel = action.payload.selectedPoint;
      state.selectedType = 'point';

      if (action.payload.selectedLabel) {
        state.showingNeighbors = getNeighborPoints(action.payload.selectedLabel, true, 1.5, "unlimited")
      }
    }
  },
});

const { actions, reducer } = selectionSlice;
export const { resetToInitialStatePointSelectionSlice, setPointSelected,
  setLineSelected, setIsHoveringPoint, setIsHoveringLine, setIsCurrentMousePosition,
  setIsCurrentMouseMovePosition, setLineHover, setLineSelectedByLabel,
  setShowingQuickInformation, setPointSelectedByLabel, setLinePreSelectByLabel } = actions;
export default reducer;
