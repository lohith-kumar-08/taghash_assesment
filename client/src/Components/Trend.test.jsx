import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Trend from './Trend';

describe('Trend Component', () => {
  test('Renders without error', () => {
    render(<Trend setPollStationOpen={() => {}} dataUpdated={false} />);
  });

  test('Data visualization title is rendered', () => {
    const { getByTestId } = render(<Trend setPollStationOpen={() => {}} dataUpdated={false} />);
    expect(getByTestId('data-visualization-title')).toBeInTheDocument();
  });

});
