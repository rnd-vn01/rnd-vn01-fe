import { render, screen, waitFor } from '@testing-library/react';
import { RecordsLog } from './RecordsLog';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('RecordsLog', () => {
  beforeEach(() => {
    render(<RecordsLog
    />)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "records-log" })).toBeInTheDocument();
    })
  })
});
