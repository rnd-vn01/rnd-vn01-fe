import { render, screen, waitFor } from '@testing-library/react';
import { RecordsChart } from './RecordsChart';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => { })
      }
    }
  }
}));

jest.mock('react-chartjs-2', () => ({
  Line: () => null
}));

jest.mock('chart.js', () => ({
  Chart: () => {
    register: () => new Promise(() => { })
  },
  CategoryScale: () => null,
  LinearScale: () => null,
  PointElement: () => null,
  LineElement: () => null,
  Title: () => null,
  Tooltip: () => null,
  Legend: () => null,
}))

describe('RecordsChart', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <RecordsChart />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "records-chart" })).toBeInTheDocument();
    })
  })
});
