import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import BorrowedItem from '../../../../../models/borrowedItem';
import { borrowedItemData } from '../../../../data/borrowedItemData';
import { loggedInLabAssistant } from '../../../../data/loggedInUsers';
import BorrowedItems from '../../../../../app/labAssistantPages/Dashboard/borrowedItems/borrowedItems';

const mockStore = configureMockStore([thunk]);

const mockFetch = jest.fn();
const mockResetFunctions = jest.fn();
jest.mock(
  '../../../../../store/actions/labAssistant/labAssistantBorrowedItemsActions',
  () => ({
    fetchLabAssistantBorrowedItems: () => mockFetch,
    resetLabAssistantBorrowedItemsState: () => mockResetFunctions,
  }),
);
jest.mock(
  '../../../../../app/labAssistantPages/Dashboard/borrowedItems/components/borrowedItemsCard',
  () => ({
    __esModule: true,
    default: () => <div>BorrowedItemCard</div>,
  }),
);
jest.mock(
  '../../../../../app/labAssistantPages/Dashboard/borrowedItems/components/borrowedItemSearchBar',
  () => ({
    __esModule: true,
    default: () => <div>BorrowedItemSearchBar</div>,
  }),
);
jest.mock('../../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));
describe('Lab Assistant - Borrowed Items Page', () => {
  let store;
  let borrowedItem;
  let borrowedItem2;

  beforeEach(() => {
    borrowedItem = new BorrowedItem(borrowedItemData);
    borrowedItem2 = new BorrowedItem(borrowedItemData);
    borrowedItem2.id = '4ErfdTv';
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

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BorrowedItems />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText(/Borrowed Items/i);
    const searchComponent = screen.getByText(/BorrowedItemSearchBar/i);
    const cardComponents = screen.getAllByText(/BorrowedItemCard/i);
    expect(titleComponent).toBeInTheDocument();
    expect(searchComponent).toBeInTheDocument();
    expect(cardComponents.length).toBe(2);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(mockFetch);
  });
  it('should render as expected when no borrowed items are available', () => {
    store = mockStore({
      labAssistantBorrowedItems: {
        borrowedItems: [],
        isborrowedItemsLoading: false,
        isborrowedItemsError: false,
        reloadborrowedItems: false,
      },
      auth: {
        user: loggedInLabAssistant,
      },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BorrowedItems />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText('Borrowed Items');
    const searchComponent = screen.getByText(/BorrowedItemSearchBar/i);
    const warningComponent = screen.getByText('No borrowed items available');
    expect(titleComponent).toBeInTheDocument();
    expect(searchComponent).toBeInTheDocument();
    expect(warningComponent).toBeInTheDocument();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(mockFetch);
  });
  it('should render loading widget when loading is true', () => {
    store = mockStore({
      labAssistantBorrowedItems: {
        borrowedItems: [],
        isborrowedItemsLoading: true,
        isborrowedItemsError: false,
        reloadborrowedItems: false,
      },
      auth: {
        user: loggedInLabAssistant,
      },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BorrowedItems />
        </BrowserRouter>
      </Provider>,
    );

    const loadingComponent = screen.getByText('Loading');
    expect(loadingComponent).toBeInTheDocument();
  });
  it('should render error message when loading fails', () => {
    store = mockStore({
      labAssistantBorrowedItems: {
        borrowedItems: [],
        isborrowedItemsLoading: false,
        isborrowedItemsError: true,
        reloadborrowedItems: false,
      },
      auth: {
        user: loggedInLabAssistant,
      },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BorrowedItems />
        </BrowserRouter>
      </Provider>,
    );

    const warningComponent = screen.getByText('Failed to load resources');
    expect(warningComponent).toBeInTheDocument();
  });
});
