import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import BorrowedItem from '../../../../../models/borrowedItem';
import { borrowedItemData } from '../../../../data/borrowedItemData';
import { loggedInLabAssistant } from '../../../../data/loggedInUsers';
import TemporaryBorrowedItems from '../../../../../app/labAssistantPages/Dashboard/tempBorrowedItems/tempBorrowedItems';

const mockStore = configureMockStore([thunk]);

const mockFetch = jest.fn();
const mockResetFunctions = jest.fn();
jest.mock(
  '../../../../../store/actions/labAssistant/labAssistantTempBorrowedActions',
  () => ({
    fetchLabAssistantTempBorrowedItems: () => mockFetch,
    resetLabAssistantTempBorrowedItemsState: () => mockResetFunctions,
  }),
);
jest.mock(
  '../../../../../app/labAssistantPages/Dashboard/tempBorrowedItems/components/tempBorrowedItemsCard',
  () => ({
    __esModule: true,
    default: () => <div>TempBorrowedItemCard</div>,
  }),
);
jest.mock(
  '../../../../../app/labAssistantPages/Dashboard/tempBorrowedItems/components/tempBorrowedSearchBar',
  () => ({
    __esModule: true,
    default: () => <div>TempBorrowedItemSearchBar</div>,
  }),
);
jest.mock('../../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));
describe('Lab Assistant - Temp Borrowed Items Page', () => {
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

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TemporaryBorrowedItems />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText(/Temporarily Borrowed Items/i);
    const searchComponent = screen.getByText(/TempBorrowedItemSearchBar/i);
    const cardComponents = screen.getAllByText(/TempBorrowedItemCard/i);
    expect(titleComponent).toBeInTheDocument();
    expect(searchComponent).toBeInTheDocument();
    expect(cardComponents.length).toBe(2);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(mockFetch);
  });
  it('should render as expected when no borrowed items are available', () => {
    store = mockStore({
      labAssistantTempBorrowedItems: {
        tempBorrowedItems: [],
        isTempBorrowedItemsLoading: false,
        isTempBorrowedItemsError: false,
        reloadTempBorrowedItems: false,
      },
      auth: {
        user: loggedInLabAssistant,
      },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <TemporaryBorrowedItems />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText('Temporarily Borrowed Items');
    const searchComponent = screen.getByText(/TempBorrowedItemSearchBar/i);
    const warningComponent = screen.getByText(
      'No temporally borrowed items available',
    );
    expect(titleComponent).toBeInTheDocument();
    expect(searchComponent).toBeInTheDocument();
    expect(warningComponent).toBeInTheDocument();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(mockFetch);
  });
  it('should render loading widget when loading is true', () => {
    store = mockStore({
      labAssistantTempBorrowedItems: {
        tempBorrowedItems: [],
        isTempBorrowedItemsLoading: true,
        isTempBorrowedItemsError: false,
        reloadTempBorrowedItems: false,
      },
      auth: {
        user: loggedInLabAssistant,
      },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <TemporaryBorrowedItems />
        </BrowserRouter>
      </Provider>,
    );

    const loadingComponent = screen.getByText('Loading');
    expect(loadingComponent).toBeInTheDocument();
  });
  it('should render error message when loading fails', () => {
    store = mockStore({
      labAssistantTempBorrowedItems: {
        tempBorrowedItems: [],
        isTempBorrowedItemsLoading: false,
        isTempBorrowedItemsError: true,
        reloadTempBorrowedItems: false,
      },
      auth: {
        user: loggedInLabAssistant,
      },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <TemporaryBorrowedItems />
        </BrowserRouter>
      </Provider>,
    );

    const warningComponent = screen.getByText('Failed to load resources');
    expect(warningComponent).toBeInTheDocument();
  });
});
