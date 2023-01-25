import { render, screen, waitFor } from '@testing-library/react';
import { SearchResults } from './SearchResults';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('SearchResults', () => {
  beforeEach(() => {
    render(<SearchResults
      query={""}
    />)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "search-results" })).toBeInTheDocument();
    })
  })
});
