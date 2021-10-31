import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { displayItemResponseData } from '../../../../data/displayItemResponseData';
import DisplayItem from '../../../../../models/display_item';
import { loggedInLabManager } from '../../../../data/loggedInUsers';
import 'intersection-observer';
import EditDisplayItemForm from '../../../../../app/labManagerPages/displayItemsPage/components/editDisplayItemForm';

const mockStore = configureMockStore([thunk]);
const mockEditDisplayItem = jest.fn();
const mockEditDisplayItemResetState = jest.fn();
jest.mock(
  '../../../../../store/actions/labManager/labManagerDisplayItemsActions',
  () => ({
    editDisplayItem: () => mockEditDisplayItem,
    editDisplayItemResetState: () => mockEditDisplayItemResetState,
  }),
);
describe('Lab Manager - Edit display Item Form', () => {
  let store;
  const displayItemOne = new DisplayItem(displayItemResponseData);
  const displayItemTwo = new DisplayItem(displayItemResponseData);
  const onSuccess = jest.fn();
  const onClose = jest.fn();

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
          <EditDisplayItemForm
            displayItem={displayItemOne}
            open
            onSubmitSuccess={onSuccess}
            onClose={onClose}
          />
        </BrowserRouter>
      </Provider>,
    );
    const titleComponent = screen.getByText(/Edit Display Item/i);
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
    expect(nameTextField.value).toBe(displayItemOne.name);
    expect(descTextField.value).toBe(displayItemOne.description);
    expect(closeButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  it('should handle edits as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <EditDisplayItemForm
            displayItem={displayItemOne}
            open
            onSubmitSuccess={onSuccess}
            onClose={onClose}
          />
        </BrowserRouter>
      </Provider>,
    );
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
          <EditDisplayItemForm
            displayItem={displayItemOne}
            open
            onSubmitSuccess={onSuccess}
            onClose={onClose}
          />
        </BrowserRouter>
      </Provider>,
    );
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
    expect(store.dispatch).toHaveBeenCalledWith(mockEditDisplayItem);
  });
  it('should handle closes as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <EditDisplayItemForm
            displayItem={displayItemOne}
            open
            onSubmitSuccess={onSuccess}
            onClose={onClose}
          />
        </BrowserRouter>
      </Provider>,
    );

    const closeButton = screen.getByRole('button', {
      name: /Close/i,
    });
    fireEvent.click(closeButton);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(mockEditDisplayItemResetState);
  });
  it('should render error/success messages as expected', () => {
    store = mockStore({
      labManagerDisplayItems: {
        displayItems: [displayItemOne, displayItemTwo],
        isDisplayItemsLoading: false,
        isDisplayItemsError: false,
        newDisplayItemLoading: false,
        newDisplayItemError: false,
        newDisplayItemSuccess: false,
        editDisplayItemLoading: false,
        editDisplayItemError: true,
        editDisplayItemSuccess: true,
        reloadDisplayItems: false,
      },
      auth: {
        user: loggedInLabManager,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <EditDisplayItemForm
            displayItem={displayItemOne}
            open
            onSubmitSuccess={onSuccess}
            onClose={onClose}
          />
        </BrowserRouter>
      </Provider>,
    );
    const successComponent = screen.getByText(/Saved changes successfully/i);
    const errorComponent = screen.getByText(
      /Could not save changes. Please make sure the name is not a duplicate./i,
    );

    expect(successComponent).toBeInTheDocument();
    expect(errorComponent).toBeInTheDocument();
  });
});
