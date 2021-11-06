import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import BorrowedItem from '../../../../../models/borrowedItem';
import { borrowedItemData } from '../../../../data/borrowedItemData';
import { loggedInStudent } from '../../../../data/loggedInUsers';
import BorrowedItemsTable from '../../../../../app/studentPages/Dashboard/Borrowed Items/BorrowedItems';

const mockStore = configureMockStore([thunk]);

const mockFetch = jest.fn();
const mockResetFunctions = jest.fn();
jest.mock(
  '../../../../../store/actions/student/studentBorrowedItemsActions',
  () => ({
    fetchStudentBorrowedItems: () => mockFetch,
    resetStudentBorrowedItemsState: () => mockResetFunctions,
  }),
);
jest.mock('../../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));
describe('Student - Borrowed Items Page', () => {
  let store;
  let borrowedItem;
  let borrowedItem2;

  beforeEach(() => {
    borrowedItem = new BorrowedItem(borrowedItemData);
    borrowedItem2 = new BorrowedItem(borrowedItemData);
    borrowedItem2.id = '4ErfdTv';
    store = mockStore({
      studentBorrowedItems: {
        borrowedItems: [borrowedItem, borrowedItem2],
        isborrowedItemsLoading: false,
        isborrowedItemsError: false,
        reloadborrowedItems: false,
      },
      auth: {
        user: loggedInStudent,
      },
    });
    store.dispatch = jest.fn();
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BorrowedItemsTable />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText(/Borrowed Items/i);
    expect(titleComponent).toBeInTheDocument();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(mockFetch);
  });
  it('should render as expected when no borrowed items are available', () => {
    store = mockStore({
      studentBorrowedItems: {
        borrowedItems: [],
        isborrowedItemsLoading: false,
        isborrowedItemsError: false,
        reloadborrowedItems: false,
      },
      auth: {
        user: loggedInStudent,
      },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BorrowedItemsTable />
        </BrowserRouter>
      </Provider>,
    );

    const warningComponent = screen.getByText('No items borrowed currently');
    expect(warningComponent).toBeInTheDocument();
  });
  it('should render loading widget when loading is true', () => {
    store = mockStore({
      studentBorrowedItems: {
        borrowedItems: [],
        isborrowedItemsLoading: true,
        isborrowedItemsError: false,
        reloadborrowedItems: false,
      },
      auth: {
        user: loggedInStudent,
      },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BorrowedItemsTable />
        </BrowserRouter>
      </Provider>,
    );

    const loadingComponent = screen.getByText('Loading');
    expect(loadingComponent).toBeInTheDocument();
  });
  it('should render error message when loading fails', () => {
    store = mockStore({
      studentBorrowedItems: {
        borrowedItems: [],
        isborrowedItemsLoading: false,
        isborrowedItemsError: true,
        reloadborrowedItems: false,
      },
      auth: {
        user: loggedInStudent,
      },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BorrowedItemsTable />
        </BrowserRouter>
      </Provider>,
    );

    const warningComponent = screen.getByText('Failed to load resources');
    expect(warningComponent).toBeInTheDocument();
  });
});
