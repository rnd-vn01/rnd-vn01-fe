import { render, screen, waitFor } from '@testing-library/react';
import { DetailPage } from './DetailPage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { mockGetItemByCode } from 'src/api/mocks/items/mockGetItemByCode';

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  useLocation: () => ({
    pathname: '/detail/meridian/LX?query=search',
    search: 'query=search'
  }),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('DetailPage with param of invalid meridian', () => {
  beforeAll(() => {
    mockGetItemByCode();
  })

  beforeEach(() => {
    render(<Provider store={store}>
      <DetailPage />
    </Provider>)
  })

  it("should redirect user to advanced search page if cannot find the meridian from code", async () => {
    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/advanced-search")
    })
  })
});
