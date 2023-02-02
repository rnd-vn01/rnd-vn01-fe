import { render, screen, waitFor } from '@testing-library/react';
import { AboutPage } from './AboutPage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('AboutPage', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <AboutPage />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "about-us-page" })).toBeInTheDocument();
    })
  })
});
