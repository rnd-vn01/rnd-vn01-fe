import { render, screen, waitFor } from '@testing-library/react';
import { RecordsProgressLog } from './RecordsProgressLog';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('RecordsProgressLog', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <RecordsProgressLog />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "records-progress" })).toBeInTheDocument();
    })
  })
});
