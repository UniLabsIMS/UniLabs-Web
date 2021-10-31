import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import NewCategoryForm from '../../../../../../app/labManagerPages/Dashboard/ItemCategories/components/newCategoryForm';

const mockStore = configureMockStore([thunk]);

describe('Lab Manager - New Category Form', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      labManagerCategories: {
        categorycategories: [],
        isCategoriesLoading: false,
        isCategoriesError: false,
        newCategoryLoading: false,
        newCategoryError: false,
        newCategorySuccess: false,
        editCategoryLoading: false,
        editCategoryError: false,
        editCategorySuccess: false,
        reloadCategories: false,
      },
    });
    store.dispatch = jest.fn();
  });

  it('should render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewCategoryForm />
        </BrowserRouter>
      </Provider>,
    );

    const initailComponent = screen.getByText(/Click to Add New Category/i);
    fireEvent.click(initailComponent); // open form
    const titleComponent = screen.getByText(/Add New Category/i);
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
    expect(nameTextField.value).toBe('');
    expect(descTextField.value).toBe('');
    expect(closeButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  it('should handle edits as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewCategoryForm />
        </BrowserRouter>
      </Provider>,
    );
    const initailComponent = screen.getByText(/Click to Add New Category/i);
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
          <NewCategoryForm />
        </BrowserRouter>
      </Provider>,
    );
    const initailComponent = screen.getByText(/Click to Add New Category/i);
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
  });
  it('should render error messages as expected', () => {
    store = mockStore({
      labManagerCategories: {
        categorycategories: [],
        isCategoriesLoading: false,
        isCategoriesError: false,
        newCategoryLoading: false,
        newCategoryError: true,
        newCategorySuccess: false,
        editCategoryLoading: false,
        editCategoryError: false,
        editCategorySuccess: false,
        reloadCategories: false,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewCategoryForm />
        </BrowserRouter>
      </Provider>,
    );
    const initailComponent = screen.getByText(/Click to Add New Category/i);
    fireEvent.click(initailComponent); // open form
    const errorComponent = screen.getByText(
      /Failed to add new category. This may be becuase the category name is a duplicate/i,
    );

    expect(errorComponent).toBeInTheDocument();
  });
  it('should render loading as expected', () => {
    store = mockStore({
      labManagerCategories: {
        categorycategories: [],
        isCategoriesLoading: false,
        isCategoriesError: false,
        newCategoryLoading: true,
        newCategoryError: true,
        newCategorySuccess: false,
        editCategoryLoading: false,
        editCategoryError: false,
        editCategorySuccess: false,
        reloadCategories: false,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewCategoryForm />
        </BrowserRouter>
      </Provider>,
    );
    const initailComponent = screen.queryByText(/Add New Category/i);

    expect(initailComponent).not.toBeInTheDocument();
  });
});
