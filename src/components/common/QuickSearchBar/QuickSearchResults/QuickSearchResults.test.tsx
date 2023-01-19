import { render, screen, waitFor } from '@testing-library/react';
import { QuickSearchResults } from './QuickSearchResults';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('QuickSearchResults', () => {
  beforeEach(() => {
    render(<QuickSearchResults 
        query={""}
    />)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "quick-search-results" })).toBeInTheDocument();
    })
  })
});
