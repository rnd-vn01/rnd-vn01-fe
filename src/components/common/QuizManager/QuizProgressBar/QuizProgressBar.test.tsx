import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { QuizProgressBar } from './QuizProgressBar';

describe('QuizProgressBar', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <QuizProgressBar />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "quiz-progress-bar" })).toBeInTheDocument();
    })
  })
});
