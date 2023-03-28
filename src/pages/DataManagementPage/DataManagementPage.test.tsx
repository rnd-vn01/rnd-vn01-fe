import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { DataManagementPage } from './DataManagementPage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

const spyScrollTo = jest.fn();
Object.defineProperty(global.window, 'scrollTo', { value: spyScrollTo });

describe('DataManagementPage', () => {
  beforeEach(() => {
    spyScrollTo.mockClear();
    render(<Provider store={store}>
      <DataManagementPage />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "data-management-page" })).toBeInTheDocument();
    })
  })

  it("should show the scroll to top icon if scroll out of 100px from the top", async () => {
    window.pageYOffset = 120
    fireEvent.scroll(document, { target: { scrollY: 120 } })

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "scroll-to-top" })).toHaveClass("data-management-page__scroll-to-top--showing")
    })
  })

  it("should hide the scroll to top icon if scroll inside range of 100px from the top", async () => {
    window.pageYOffset = 80
    fireEvent.scroll(document, { target: { scrollY: 80 } })

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "scroll-to-top" })).not.toHaveClass("data-management-page__scroll-to-top--showing")
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
