import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { itemResponseData } from '../../../../data/itemResponseData';
import Item from '../../../../../models/item';
import { loggedInLabManager } from '../../../../data/loggedInUsers';
import 'intersection-observer';
import NewItemForm from '../../../../../app/labManagerPages/itemsPage/components/newItemForm';

const mockStore = configureMockStore([thunk]);
const mockAddItem = jest.fn();
const mockCleanState = jest.fn();
jest.mock(
  '../../../../../store/actions/labManager/labManagerItemsActions',
  () => ({
    addItem: () => mockAddItem,
    cleanNewItemState: () => mockCleanState,
  }),
);
jest.mock('react-barcode', () => ({
  __esModule: true,
  default: () => <div>BarcodeXX</div>,
}));
jest.mock('react-component-export-image', () => ({
  exportComponentAsPNG: () => <div>Export</div>,
}));

describe('Lab Manager - New Item Form', () => {
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
    store.dispatch = jest.fn();
  });

  it('should render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewItemForm displayItemID="xxx" />
        </BrowserRouter>
      </Provider>,
    );
    const initailComponent = screen.getByText(
      /Click to Generate Barcode and Add an Item/i,
    );
    expect(initailComponent).toBeInTheDocument();
  });
  it('should handle submits as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewItemForm displayItemID="xxx" />
        </BrowserRouter>
      </Provider>,
    );
    const initailComponent = screen.getByText(
      /Click to Generate Barcode and Add an Item/i,
    );
    fireEvent.click(initailComponent); // open form
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(mockAddItem);
  });
  it('should display barcode as expected', () => {
    store = mockStore({
      labManagerItems: {
        items: [itemOne, itemTwo],
        isItemsLoading: false,
        isItemsError: false,
        newItemLoading: false,
        newItemError: false,
        newItemSuccess: true,
        newItemID: 'xxx',
        deleteItemLoading: false,
        deleteItemSucess: false,
        deleteItemError: false,
        reloadItems: false,
      },
      auth: {
        user: loggedInLabManager,
      },
    });
    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewItemForm displayItemID="xxx" />
        </BrowserRouter>
      </Provider>,
    );
    const mainTextComponent = screen.getByText(
      /Generated Barcode for The New Item/i,
    );
    const subTextComponent = screen.getByText(
      /Download the Following Barcode and Paste on the Item/i,
    );
    const barcodeCompoenent = screen.getByText(/BarcodeXX/i);
    expect(mainTextComponent).toBeInTheDocument();
    expect(subTextComponent).toBeInTheDocument();
    expect(barcodeCompoenent).toBeInTheDocument();
  });

  it('should render loading as expected', () => {
    store = mockStore({
      labManagerItems: {
        items: [itemOne, itemTwo],
        isItemsLoading: false,
        isItemsError: false,
        newItemLoading: true,
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
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewItemForm displayItemID="xxx" />
        </BrowserRouter>
      </Provider>,
    );
    const initailComponent = screen.queryByText(
      /Click to Generate Barcode and Add an Item/i,
    );

    expect(initailComponent).not.toBeInTheDocument();
  });
  it('should show error message if failed', () => {
    store = mockStore({
      labManagerItems: {
        items: [itemOne, itemTwo],
        isItemsLoading: false,
        isItemsError: false,
        newItemLoading: false,
        newItemError: true,
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
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewItemForm displayItemID="xxx" />
        </BrowserRouter>
      </Provider>,
    );
    const errorComponent = screen.queryByText(
      /Failed to add new item.Try again later/i,
    );

    expect(errorComponent).toBeInTheDocument();
  });
});
