import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import 'intersection-observer';
import TempBorrowedItemSearchBar from '../../../../../../app/labAssistantPages/Dashboard/tempBorrowedItems/components/tempBorrowedSearchBar';

describe('Lab Assistant - Temp Borrowed Item Search', () => {
  const mockOnchange = jest.fn();

  it('should render as expected', () => {
    render(
      <BrowserRouter>
        <TempBorrowedItemSearchBar onChange={mockOnchange} searchKey="key" />
      </BrowserRouter>,
    );
    const inputElement = screen.getByPlaceholderText(
      /Search By Student Index/i,
    );
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe('key');
  });
  it('should handle value changes as expected expected', () => {
    render(
      <BrowserRouter>
        <TempBorrowedItemSearchBar onChange={mockOnchange} searchKey="key" />
      </BrowserRouter>,
    );
    const inputElement = screen.getByPlaceholderText(
      /Search By Student Index/i,
    );
    fireEvent.change(inputElement, { target: { value: 'New Key' } });
    expect(mockOnchange).toHaveBeenCalledTimes(1);
    expect(mockOnchange).toHaveBeenCalledWith('New Key');
  });
});
