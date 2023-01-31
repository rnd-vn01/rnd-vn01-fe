import { render, screen, waitFor } from '@testing-library/react';
import { PersonalRecordsPage } from './PersonalRecordsPage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('PersonalRecordsPage', () => {
  beforeEach(() => {
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
