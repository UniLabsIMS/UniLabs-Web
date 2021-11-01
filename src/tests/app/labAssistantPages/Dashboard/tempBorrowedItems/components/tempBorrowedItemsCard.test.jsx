import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BorrowedItem from '../../../../../../models/borrowedItem';
import { borrowedItemData } from '../../../../../data/borrowedItemData';
import 'intersection-observer';
import { loggedInLabAssistant } from '../../../../../data/loggedInUsers';
import LabAssistantTempBorrowedItemsCard from '../../../../../../app/labAssistantPages/Dashboard/tempBorrowedItems/components/tempBorrowedItemsCard';

const mockStore = configureMockStore([thunk]);

describe('Lab Assistant - Temp Borrowed Item Card', () => {
  let store;
  let borrowedItem;
  let borrowedItem2;

  beforeEach(() => {
    borrowedItem = new BorrowedItem(borrowedItemData);
    borrowedItem2 = new BorrowedItem(borrowedItemData);
    borrowedItem2.id = '4ErfdTv';
    store = mockStore({
      labAssistantTempBorrowedItems: {
        tempBorrowedItems: [borrowedItem, borrowedItem2],
        isTempBorrowedItemsLoading: false,
        isTempBorrowedItemsError: false,
        reloadTempBorrowedItems: false,
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
          <LabAssistantTempBorrowedItemsCard tempBorrowedItem={borrowedItem} />
        </BrowserRouter>
      </Provider>,
    );
    const nameComponent = screen.getByText(borrowedItem.displayItemName);
    const idComponent = screen.getByText(borrowedItem.id);
    const emailComponent = screen.getByText(/Email - student3@example.com/i);
    const indexComponent = screen.getByText(/Index Number - 180345/i);
    const dueDateComponent = screen.getByText(
      `Due on : ${borrowedItem.dueDate}`,
    );
    const emailButton = screen.getByRole('button', {
      name: /Email Student/i,
    });
    expect(nameComponent).toBeInTheDocument();
    expect(idComponent).toBeInTheDocument();
    expect(emailComponent).toBeInTheDocument();
    expect(indexComponent).toBeInTheDocument();
    expect(dueDateComponent).toBeInTheDocument();
    expect(emailButton).toBeInTheDocument();
  });
});
