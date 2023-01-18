import { render, screen, waitFor } from '@testing-library/react';
import { QuickSearchBar } from './QuickSearchBar';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('QuickSearchBar', () => {
  beforeEach(() => {
    render(<QuickSearchBar />)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "quick-search" })).toBeInTheDocument();
    })
  })
});
