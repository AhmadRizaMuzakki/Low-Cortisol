import { render, screen } from '@testing-library/react';
import App from './App';

test('renders sistem sekolah landing heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/sistem sekolah/i);
  expect(headingElement).toBeInTheDocument();
});
