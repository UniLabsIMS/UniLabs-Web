import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { itemResponseData } from '../../../data/itemResponseData';
import Item from '../../../../models/item';
import { loggedInLabAssistant } from '../../../data/loggedInUsers';
import LabAssistantItemsPage from '../../../../app/labAssistantPages/itemsPage/itemsPage';

const mockStore = configureMockStore([thunk]);
// mock nested components
jest.mock(
  '../../../../app/labAssistantPages/itemsPage/components/newItemForm',
  () => ({
    __esModule: true,
    default: () => <div>NewItemForm</div>,
  }),
);
jest.mock('../../../../app/commonComponents/breadCrumbsWrapper', () => ({
  __esModule: true,
  default: () => <div>Breadcrumbs</div>,
}));
jest.mock(
  '../../../../app/labAssistantPages/itemsPage/components/singleItemRow',
  () => ({
    __esModule: true,
    default: () => (
      <tr>
        <td>ItemRow</td>
        <td>D2</td>
        <td>D3</td>
        <td>D4</td>
        <td>D5</td>
      </tr>
    ),
  }),
);
const mockFetch = jest.fn();
const mockResetFunctions = jest.fn();
jest.mock(
  '../../../../store/actions/labAssistant/labAssistantItemsActions',
  () => ({
    fetchLabAssistantItems: () => mockFetch,
    resetLabAssistantItemsPageState: () => mockResetFunctions,
  }),
);
jest.mock('../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));
describe('Lab Assistant -  Items Page', () => {
  let store;
  const itemOne = new Item(itemResponseData);
  const itemTwo = new Item(itemResponseData);

  beforeEach(() => {
    store = mockStore({
      labAssistantItems: {
        items: [itemOne, itemTwo],
        isItemsLoading: false,
        isItemsError: false,
        newItemLoading: false,
        newItemError: false,
        newItemSuccess: false,
        newItemID: null,
        deleteItemLoading: false,
        deleteItemSuccess: false,
        deleteItemError: false,
        reloadItems: false,
      },
      auth: {
        user: loggedInLabAssistant,
      },
    });
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LabAssistantItemsPage />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText('Items');
    const newItemComponent = screen.getByText(/NewItemForm/i);
    const breadcrumbsComponent = screen.getByText(/Breadcrumbs/i);
    const itemRowComponents = screen.getAllByText(/ItemRow/i);
    expect(titleComponent).toBeInTheDocument();
    expect(newItemComponent).toBeInTheDocument();
    expect(breadcrumbsComponent).toBeInTheDocument();
    expect(itemRowComponents.length).toBe(2);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
  it('should render delete item error/success messages successfully', () => {
    store = mockStore({
      labAssistantItems: {
        items: [itemOne, itemTwo],
        isItemsLoading: false,
        isItemsError: false,
        newItemLoading: false,
        newItemError: false,
        newItemSuccess: false,
        newItemID: null,
        deleteItemLoading: false,
        deleteItemSuccess: true,
        deleteItemError: true,
        reloadItems: false,
      },
      auth: {
        user: loggedInLabAssistant,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LabAssistantItemsPage />
        </BrowserRouter>
      </Provider>,
    );

    const successMessageComponent = screen.getByText(
      /Successfully deleted item/i,
    );
    const errorMessageComponent = screen.getByText(/Item Deletion Failed/i);
    expect(errorMessageComponent).toBeInTheDocument();
    expect(successMessageComponent).toBeInTheDocument();
  });
  it('should display warning message when no items present', () => {
    store = mockStore({
      labAssistantItems: {
        items: [],
        isItemsLoading: false,
        isItemsError: false,
        newItemLoading: false,
        newItemError: false,
        newItemSuccess: false,
        newItemID: null,
        deleteItemLoading: false,
        deleteItemSuccess: false,
        deleteItemError: false,
        reloadItems: false,
      },
      auth: {
        user: loggedInLabAssistant,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LabAssistantItemsPage />
        </BrowserRouter>
      </Provider>,
    );

    const warningMessageComponent = screen.getByText(/No display Items Added/i);
    expect(warningMessageComponent).toBeInTheDocument();
  });
  it('should display loading widget when loading is true', () => {
    store = mockStore({
      labAssistantItems: {
        items: [],
        isItemsLoading: true,
        isItemsError: false,
        newItemLoading: false,
        newItemError: false,
        newItemSuccess: false,
        newItemID: null,
        deleteItemLoading: false,
        deleteItemSuccess: false,
        deleteItemError: false,
        reloadItems: false,
      },
      auth: {
        user: loggedInLabAssistant,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LabAssistantItemsPage />
        </BrowserRouter>
      </Provider>,
    );

    const loadingComponent = screen.getByText(/Loading/i);
    expect(loadingComponent).toBeInTheDocument();
  });
  it('should display error message when item loading fails', () => {
    store = mockStore({
      labAssistantItems: {
        items: [],
        isItemsLoading: false,
        isItemsError: true,
        newItemLoading: false,
        newItemError: false,
        newItemSuccess: false,
        newItemID: null,
        deleteItemLoading: false,
        deleteItemSuccess: false,
        deleteItemError: false,
        reloadItems: false,
      },
      auth: {
        user: loggedInLabAssistant,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LabAssistantItemsPage />
        </BrowserRouter>
      </Provider>,
    );

    const errorComponent = screen.getByText(/Failed to load items/i);
    expect(errorComponent).toBeInTheDocument();
  });
});
