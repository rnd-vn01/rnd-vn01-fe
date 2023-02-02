import { render, screen, waitFor } from '@testing-library/react';
import { AboutPageSection } from './AboutPageSection';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('AboutPageSection', () => {
  beforeEach(() => {
    render(<AboutPageSection
    />)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "about-page-section" })).toBeInTheDocument();
    })
  })
});
