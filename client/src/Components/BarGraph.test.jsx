import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import BarGraph from './BarGraph';

describe('BarGraph Component', () => {
  test('Renders without error', () => {
    render(<BarGraph />);
  });
});
