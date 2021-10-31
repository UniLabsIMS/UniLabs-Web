import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BorrowedItem from '../../../../../../models/borrowedItem';
import { borrowedItemData } from '../../../../../data/borrowedItemData';
import 'intersection-observer';
import { loggedInLabAssistant } from '../../../../../data/loggedInUsers';
import BorrowedItemSearchBar from '../../../../../../app/labAssistantPages/Dashboard/borrowedItems/components/borrowedItemSearchBar';

const mockStore = configureMockStore([thunk]);

describe('Lab Assistant - Borrowed Item Search', () => {
  let store;
  let borrowedItem;
  let borrowedItem2;
  const mockOnchange = jest.fn();

  beforeEach(() => {
    borrowedItem = new BorrowedItem(borrowedItemData);
    borrowedItem2 = new BorrowedItem(borrowedItemData);
    store = mockStore({
      labAssistantBorrowedItems: {
        borrowedItems: [borrowedItem, borrowedItem2],
        isborrowedItemsLoading: false,
        isborrowedItemsError: false,
        reloadborrowedItems: false,
      },
      auth: {
        user: loggedInLabAssistant,
      },
    });
    store.dispatch = jest.fn();
  });

  it('should render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BorrowedItemSearchBar onChange={mockOnchange} searchKey="key" />
        </BrowserRouter>
      </Provider>,
    );
    const inputElement = screen.getByPlaceholderText(
      /Search By Student Index/i,
    );
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe('key');
  });
  it('should handle value changes as expected expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BorrowedItemSearchBar onChange={mockOnchange} searchKey="key" />
        </BrowserRouter>
      </Provider>,
    );
    const inputElement = screen.getByPlaceholderText(
      /Search By Student Index/i,
    );
    fireEvent.change(inputElement, { target: { value: 'New Key' } });
    expect(mockOnchange).toHaveBeenCalledTimes(1);
    expect(mockOnchange).toHaveBeenCalledWith('New Key');
  });
});
