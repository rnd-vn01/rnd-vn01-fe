import { render, screen, waitFor } from '@testing-library/react';
import { PersonalRecordsPage } from './PersonalRecordsPage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { mockQuizRecords } from 'src/api/mocks/quizRecords/mockQuizRecords';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => { })
      }
    }
  }
}));

jest.mock("react-router-dom", () => ({
  useLocation: () => ({
    pathname: '/advanced_search?query=search',
    search: 'query=search'
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('react-chartjs-2', () => ({
  Line: () => null
}));

describe('PersonalRecordsPage', () => {
  beforeEach(() => {
    mockQuizRecords();
    render(<Provider store={store}>
      <PersonalRecordsPage />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "personal-records-page" })).toBeInTheDocument();
    })
  })
});
