import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Category from '../../../../../../models/category';
import { categoryResponseData } from '../../../../../data/categoryResponseData';
import 'intersection-observer';
import EditCategoryForm from '../../../../../../app/labManagerPages/Dashboard/ItemCategories/components/editCategoryForm';

const mockStore = configureMockStore([thunk]);
const mockEditCategory = jest.fn();
const mockEditCategoryResetState = jest.fn();
jest.mock(
  '../../../../../../store/actions/labManager/labManagerCategoriesActions',
  () => ({
    editCategory: () => mockEditCategory,
    editCategoryResetState: () => mockEditCategoryResetState,
  }),
);
describe('Lab Manager - Edit Category Form', () => {
  let store;
  let category;
  const onSuccess = jest.fn();
  const onClose = jest.fn();

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

    category = new Category(categoryResponseData);
  });

  it('should render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <EditCategoryForm
            category={category}
            open
            onSubmitSuccess={onSuccess}
            onClose={onClose}
          />
        </BrowserRouter>
      </Provider>,
    );
    const titleComponent = screen.getByText(/Edit Category/i);
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
    expect(nameTextField.value).toBe(category.name);
    expect(descTextField.value).toBe(category.description);
    expect(closeButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  it('should handle edits as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <EditCategoryForm
            category={category}
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
          <EditCategoryForm
            category={category}
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
    expect(store.dispatch).toHaveBeenCalledWith(mockEditCategory);
  });
  it('should handle closes as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <EditCategoryForm
            category={category}
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
    expect(store.dispatch).toHaveBeenCalledWith(mockEditCategoryResetState);
  });
  it('should render error messages as expected', () => {
    store = mockStore({
      labManagerCategories: {
        categorycategories: [],
        editCategoryError: true,
        editCategorySuccess: true,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <EditCategoryForm
            category={category}
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
