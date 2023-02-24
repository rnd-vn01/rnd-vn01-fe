import { render, screen, waitFor } from '@testing-library/react';
import { HomePage } from './HomePage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "TEST_PATH"
  })
}));

describe('HomePage', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <HomePage />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "home-page" })).toBeInTheDocument();
    })
  })
});
