import { render, screen } from '@testing-library/react';
import App from './App';

test('renders HealthGuard Pro app', () => {
  render(<App />);
  // Test that the app renders without crashing
  expect(document.body).toBeInTheDocument();
});
