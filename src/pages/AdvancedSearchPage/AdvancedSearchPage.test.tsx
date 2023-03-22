import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AdvancedSearchPage } from './AdvancedSearchPage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { mockGetItems } from 'src/api/mocks/mockGetItems';

const spyScrollTo = jest.fn();
Object.defineProperty(global.window, 'scrollTo', { value: spyScrollTo });

jest.mock("react-router-dom", () => ({
  useLocation: () => ({
    pathname: '/advanced_search?query=search',
    search: 'query=search'
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('AdvancedSearchPage', () => {
  beforeAll(() => {
    mockGetItems();
  })

  beforeEach(() => {
    spyScrollTo.mockClear();
    render(<Provider store={store}>
      <AdvancedSearchPage />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "advanced-search-page" })).toBeInTheDocument();
    })
  })

  it("should show the scroll to top icon if scroll out of 100px from the top", async () => {
    window.pageYOffset = 120
    fireEvent.scroll(document, { target: { scrollY: 120 } })

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "scroll-to-top" })).toHaveClass("advanced-search-page__scroll-to-top--showing")
    })
  })

  it("should hide the scroll to top icon if scroll inside range of 100px from the top", async () => {
    window.pageYOffset = 80
    fireEvent.scroll(document, { target: { scrollY: 80 } })

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "scroll-to-top" })).not.toHaveClass("advanced-search-page__scroll-to-top--showing")
    })
  })

  it("should scroll to top if clicked on the icon", async () => {
    window.pageYOffset = 120
    fireEvent.scroll(document, { target: { scrollY: 120 } })

    await waitFor(() => {
      fireEvent.click(screen.getByRole("div", { name: "scroll-to-top" }))
      expect(spyScrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: "smooth",
      })
    })
  })
});
