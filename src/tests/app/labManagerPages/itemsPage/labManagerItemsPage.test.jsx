import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { itemResponseData } from '../../../data/itemResponseData';
import Item from '../../../../models/item';
import { loggedInLabManager } from '../../../data/loggedInUsers';
import LabManagerItemsPage from '../../../../app/labManagerPages/itemsPage/labManagerItemsPage';

const mockStore = configureMockStore([thunk]);
// mock nested components
jest.mock(
  '../../../../app/labManagerPages/itemsPage/components/newItemForm',
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
  '../../../../app/labManagerPages/itemsPage/components/singleItemRow',
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
  '../../../../store/actions/labManager/labManagerItemsActions',
  () => ({
    fetchItems: () => mockFetch,
    resetItemsPageState: () => mockResetFunctions,
  }),
);
describe('Lab Manager -  Items Page', () => {
  let store;
  const itemOne = new Item(itemResponseData);
  const itemTwo = new Item(itemResponseData);

  beforeEach(() => {
    store = mockStore({
      labManagerItems: {
        items: [itemOne, itemTwo],
        isItemsLoading: false,
        isItemsError: false,
        newItemLoading: false,
        newItemError: false,
        newItemSuccess: false,
        newItemID: null,
        deleteItemLoading: false,
        deleteItemSucess: false,
        deleteItemError: false,
        reloadItems: false,
      },
      auth: {
        user: loggedInLabManager,
      },
    });
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LabManagerItemsPage />
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
});
