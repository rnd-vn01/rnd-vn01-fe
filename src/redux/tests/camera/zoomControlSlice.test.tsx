import { resetToInitialStateZoomControlSlice, setInCloseZoomMode } from "src/redux/slice"
import store from "src/redux/store"
import { waitFor } from '@testing-library/react';
import { ZOOM_CONTROL_LEVEL } from "src/configs/constants";

describe("zoomControlSlice", () => {
  afterEach(() => {
    store.dispatch(resetToInitialStateZoomControlSlice())
  })

  it("should reset to far zoom mode on reset", async () => {
    store.dispatch(setInCloseZoomMode({
      isInCloseZoomMode: ZOOM_CONTROL_LEVEL.SHOW_ALL
    }))

    store.dispatch(resetToInitialStateZoomControlSlice())

    expect(store.getState().zoomControlSlice.isInCloseZoomMode).toEqual(ZOOM_CONTROL_LEVEL.FAR)
  })

  it("should update the zoom mode level if requested", async () => {
    store.dispatch(setInCloseZoomMode({
      isInCloseZoomMode: ZOOM_CONTROL_LEVEL.SHOW_LINE
    }))

    expect(store.getState().zoomControlSlice.isInCloseZoomMode).toEqual(ZOOM_CONTROL_LEVEL.SHOW_LINE)
  })
})
