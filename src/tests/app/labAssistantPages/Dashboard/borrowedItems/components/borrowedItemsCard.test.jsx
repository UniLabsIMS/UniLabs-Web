import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BorrowedItem from '../../../../../../models/borrowedItem';
import { borrowedItemData } from '../../../../../data/borrowedItemData';
import 'intersection-observer';
import { loggedInLabAssistant } from '../../../../../data/loggedInUsers';
import LabAssistantBorrowedItemsCard from '../../../../../../app/labAssistantPages/Dashboard/borrowedItems/components/borrowedItemsCard';

const mockStore = configureMockStore([thunk]);

describe('Lab Assistant - Borrowed Item Card', () => {
  let store;
  let borrowedItem;
  let borrowedItem2;

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
          <LabAssistantBorrowedItemsCard borrowedItem={borrowedItem} />
        </BrowserRouter>
      </Provider>,
    );
    const nameComponent = screen.getByText(borrowedItem.displayItemName);
    const idComponent = screen.getByText(borrowedItem.id);
    const dueDateComponent = screen.getByText(
      `Due on: ${borrowedItem.dueDate}`,
    );
    const emailButton = screen.getByRole('button', {
      name: /Email Student/i,
    });
    expect(nameComponent).toBeInTheDocument();
    expect(idComponent).toBeInTheDocument();
    expect(dueDateComponent).toBeInTheDocument();
    expect(emailButton).toBeInTheDocument();
  });
});
