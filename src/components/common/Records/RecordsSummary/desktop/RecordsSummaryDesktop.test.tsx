import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RecordsSummaryDesktop } from './RecordsSummaryDesktop';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { Context as ResponsiveContext } from "react-responsive";
import { resetToInitialStateLanguageSlice, setStateLanguage } from 'src/redux/slice';

const DEMO_RECORDS_SUMMARY = {
  0: {
    points: 215,
    meridians: 11,
    quizzes: 52,
    accuracy: 76,
  },
  1: {
    points: 150,
    meridians: 9,
    quizzes: 40,
    accuracy: 80
  },
  2: {
    points: 15,
    meridians: 2,
    quizzes: 5,
    accuracy: 68
  },
  3: {
    points: 2,
    meridians: 1,
    quizzes: 2,
    accuracy: 79
  }
}

describe('RecordsSummaryDesktop', () => {
  beforeEach(() => {
    store.dispatch(setStateLanguage({
      currentLanguage: "EN"
    }))

    render(<ResponsiveContext.Provider value={{ width: 1200 }}>
      <Provider store={store}>
        <RecordsSummaryDesktop />
      </Provider>
    </ResponsiveContext.Provider>)
  })

  afterEach(() => {
    store.dispatch(resetToInitialStateLanguageSlice());
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "records-summary-desktop" })).toBeInTheDocument();
    })
  })

  it("should update showing type this_year option if changed from select", async () => {
    render(<Provider store={store}>
      <RecordsSummaryDesktop />
    </Provider>)

    const recordsSummaryTypeSelect = screen.getAllByRole("select", { name: "records-summary-desktop-type-select" })
    fireEvent.change(recordsSummaryTypeSelect[0], { target: { value: 1 } })

    await waitFor(() => {
      const recordsSummaryPoints = screen.getAllByTestId("record-summary-points")
      const recordsSummaryMeridians = screen.getAllByTestId("record-summary-meridians")
      const recordsSummaryQuizzes = screen.getAllByTestId("record-summary-quizzes")
      const recordsSummaryAccuracy = screen.getAllByTestId("record-summary-accuracy")

      expect(recordsSummaryPoints[0].innerHTML).toBe(`${DEMO_RECORDS_SUMMARY[1].points}`)
      expect(recordsSummaryMeridians[0].innerHTML).toBe(`${DEMO_RECORDS_SUMMARY[1].meridians}`)
      expect(recordsSummaryQuizzes[0].innerHTML).toBe(`${DEMO_RECORDS_SUMMARY[1].quizzes}`)
      expect(recordsSummaryAccuracy[0].innerHTML).toBe(`${DEMO_RECORDS_SUMMARY[1].accuracy}%`)
    })
  })

  it("should update showing type this_month option if changed from select", async () => {
    render(<Provider store={store}>
      <RecordsSummaryDesktop />
    </Provider>)

    const recordsSummaryTypeSelect = screen.getAllByRole("select", { name: "records-summary-desktop-type-select" })
    fireEvent.change(recordsSummaryTypeSelect[0], { target: { value: 2 } })

    await waitFor(() => {
      const recordsSummaryPoints = screen.getAllByTestId("record-summary-points")
      const recordsSummaryMeridians = screen.getAllByTestId("record-summary-meridians")
      const recordsSummaryQuizzes = screen.getAllByTestId("record-summary-quizzes")
      const recordsSummaryAccuracy = screen.getAllByTestId("record-summary-accuracy")

      expect(recordsSummaryPoints[0].innerHTML).toBe(`${DEMO_RECORDS_SUMMARY[2].points}`)
      expect(recordsSummaryMeridians[0].innerHTML).toBe(`${DEMO_RECORDS_SUMMARY[2].meridians}`)
      expect(recordsSummaryQuizzes[0].innerHTML).toBe(`${DEMO_RECORDS_SUMMARY[2].quizzes}`)
      expect(recordsSummaryAccuracy[0].innerHTML).toBe(`${DEMO_RECORDS_SUMMARY[2].accuracy}%`)
    })
  })

  it("should update showing type this_week option if changed from select", async () => {
    render(<Provider store={store}>
      <RecordsSummaryDesktop />
    </Provider>)

    const recordsSummaryTypeSelect = screen.getAllByRole("select", { name: "records-summary-desktop-type-select" })
    fireEvent.change(recordsSummaryTypeSelect[0], { target: { value: 3 } })

    await waitFor(() => {
      const recordsSummaryPoints = screen.getAllByTestId("record-summary-points")
      const recordsSummaryMeridians = screen.getAllByTestId("record-summary-meridians")
      const recordsSummaryQuizzes = screen.getAllByTestId("record-summary-quizzes")
      const recordsSummaryAccuracy = screen.getAllByTestId("record-summary-accuracy")

      expect(recordsSummaryPoints[0].innerHTML).toBe(`${DEMO_RECORDS_SUMMARY[3].points}`)
      expect(recordsSummaryMeridians[0].innerHTML).toBe(`${DEMO_RECORDS_SUMMARY[3].meridians}`)
      expect(recordsSummaryQuizzes[0].innerHTML).toBe(`${DEMO_RECORDS_SUMMARY[3].quizzes}`)
      expect(recordsSummaryAccuracy[0].innerHTML).toBe(`${DEMO_RECORDS_SUMMARY[3].accuracy}%`)
    })
  })

  it("should render as expected inside the summary box if language is set to be Vietnamese", async () => {
    store.dispatch(setStateLanguage({
      currentLanguage: "VI"
    }))

    await waitFor(() => {
      expect(screen.getAllByTestId("h3-quizzes-attempts").length).toBe(2)
    })
  })
});
