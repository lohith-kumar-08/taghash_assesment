import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Poll from './Poll';
import { vi } from 'vitest'; 
vi.mock('axios'); 

describe('Poll Component', () => {
  test('Submit form with valid data', async () => {
    axios.post.mockResolvedValueOnce({ data: {} });

    const handleClose = vi.fn(); 
    const handleSubmit = vi.fn(); 

    const { getByTestId, getByLabelText, getByText } = render(
      <Poll open onClose={handleClose} onFormSubmit={handleSubmit} />
    );

    fireEvent.change(getByTestId('name-input'), { target: { value: 'Lohith Kumar' } });
    fireEvent.click(getByTestId('voting-choice').querySelector('input[value="true"]'));
    fireEvent.change(getByLabelText('Date of Submission'), { target: { value: '2024-06-02' } });

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });
});
