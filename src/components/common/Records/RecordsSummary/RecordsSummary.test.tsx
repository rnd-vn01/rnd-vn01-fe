import { render, screen, waitFor } from '@testing-library/react';
import { RecordsSummary } from './RecordsSummary';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('RecordsSummary', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <RecordsSummary />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "records-summary" })).toBeInTheDocument();
    })
  })
});
