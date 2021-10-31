import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { displayItemResponseData } from '../../../../data/displayItemResponseData';
import DisplayItem from '../../../../../models/display_item';
import { loggedInLabManager } from '../../../../data/loggedInUsers';
import 'intersection-observer';
import NewDisplayItemForm from '../../../../../app/labManagerPages/displayItemsPage/components/newDisplayItemForm';

const mockStore = configureMockStore([thunk]);
const mockAddDisplayItem = jest.fn();
jest.mock(
  '../../../../../store/actions/labManager/labManagerDisplayItemsActions',
  () => ({
    addDisplayItem: () => mockAddDisplayItem,
  }),
);
jest.mock('../../../../../app/commonComponents/imagePicker', () => ({
  __esModule: true,
  default: () => <div>Image Form</div>,
}));
describe('Lab Manager - Edit New Item Form', () => {
  let store;
  const displayItemOne = new DisplayItem(displayItemResponseData);
  const displayItemTwo = new DisplayItem(displayItemResponseData);

  beforeEach(() => {
    store = mockStore({
      labManagerDisplayItems: {
        displayItems: [displayItemOne, displayItemTwo],
        isDisplayItemsLoading: false,
        isDisplayItemsError: false,
        newDisplayItemLoading: false,
        newDisplayItemError: false,
        newDisplayItemSuccess: false,
        editDisplayItemLoading: false,
        editDisplayItemError: false,
        editDisplayItemSuccess: false,
        reloadDisplayItems: false,
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
          <NewDisplayItemForm categoryID="xxx" />
        </BrowserRouter>
      </Provider>,
    );
    const initailComponent = screen.getByText(/Click to Add New Display Item/i);
    fireEvent.click(initailComponent); // open form
    const titleComponent = screen.getByText(/Add New Display Item/i);
    const imageFormComponent = screen.getByText(/Image Form/i);
    const nameTextField = screen.getByRole('textbox', {
      name: /name/i,
    });
    const descTextField = screen.getByRole('textbox', {
      name: /description/i,
    });
    const closeButton = screen.getByRole('button', {
      name: /Close/i,
    });
    const submitButton = screen.getByRole('button', {
      name: /Submit/i,
    });
    expect(titleComponent).toBeInTheDocument();

    expect(nameTextField).toBeInTheDocument();
    expect(descTextField).toBeInTheDocument();
    expect(imageFormComponent).toBeInTheDocument();
    expect(nameTextField.value).toBe('');
    expect(descTextField.value).toBe('');
    expect(closeButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  it('should handle edits as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewDisplayItemForm categoryID="xxx" />
        </BrowserRouter>
      </Provider>,
    );
    const initailComponent = screen.getByText(/Click to Add New Display Item/i);
    fireEvent.click(initailComponent); // open form
    const nameTextField = screen.getByRole('textbox', {
      name: /name/i,
    });
    const descTextField = screen.getByRole('textbox', {
      name: /description/i,
    });
    fireEvent.change(nameTextField, { target: { value: 'Name' } });
    fireEvent.change(descTextField, { target: { value: 'Desc' } });

    expect(nameTextField.value).toBe('Name');
    expect(descTextField.value).toBe('Desc');
  });
  it('should handle submits as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewDisplayItemForm categoryID="xxx" />
        </BrowserRouter>
      </Provider>,
    );
    const initailComponent = screen.getByText(/Click to Add New Display Item/i);
    fireEvent.click(initailComponent); // open form
    const nameTextField = screen.getByRole('textbox', {
      name: /name/i,
    });
    const descTextField = screen.getByRole('textbox', {
      name: /description/i,
    });
    const submitButton = screen.getByRole('button', {
      name: /Submit/i,
    });
    fireEvent.change(nameTextField, { target: { value: 'Name' } });
    fireEvent.change(descTextField, { target: { value: 'Desc' } });
    fireEvent.click(submitButton);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(mockAddDisplayItem);
  });
  it('should render error messages as expected', () => {
    store = mockStore({
      labManagerDisplayItems: {
        displayItems: [displayItemOne, displayItemTwo],
        isDisplayItemsLoading: false,
        isDisplayItemsError: false,
        newDisplayItemLoading: false,
        newDisplayItemError: true,
        newDisplayItemSuccess: true,
        editDisplayItemLoading: false,
        editDisplayItemError: false,
        editDisplayItemSuccess: false,
        reloadDisplayItems: false,
      },
      auth: {
        user: loggedInLabManager,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewDisplayItemForm categoryID="xxx" />
        </BrowserRouter>
      </Provider>,
    );
    const initailComponent = screen.getByText(/Click to Add New Display Item/i);
    fireEvent.click(initailComponent); // open form
    const errorComponent = screen.getByText(
      /Failed to add new display item, This may be becuase the name is a duplicate/i,
    );

    expect(errorComponent).toBeInTheDocument();
  });
  it('should render loading as expected', () => {
    store = mockStore({
      labManagerDisplayItems: {
        displayItems: [displayItemOne, displayItemTwo],
        isDisplayItemsLoading: false,
        isDisplayItemsError: false,
        newDisplayItemLoading: true,
        newDisplayItemError: false,
        newDisplayItemSuccess: false,
        editDisplayItemLoading: false,
        editDisplayItemError: false,
        editDisplayItemSuccess: false,
        reloadDisplayItems: false,
      },
      auth: {
        user: loggedInLabManager,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewDisplayItemForm categoryID="xxx" />
        </BrowserRouter>
      </Provider>,
    );
    const initailComponent = screen.queryByText(/Add New Display Item/i);

    expect(initailComponent).not.toBeInTheDocument();
  });
});
