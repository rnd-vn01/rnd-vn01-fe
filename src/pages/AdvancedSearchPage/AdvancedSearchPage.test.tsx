import { render, screen, waitFor } from '@testing-library/react';
import { AdvancedSearchPage } from './AdvancedSearchPage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('AdvancedSearchPage', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <AdvancedSearchPage />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "advanced-search-page" })).toBeInTheDocument();
    })
  })
});
