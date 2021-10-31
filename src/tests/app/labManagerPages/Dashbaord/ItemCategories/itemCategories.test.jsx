import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import mockAxios from 'axios';
import { loggedInLabManager } from '../../../../data/loggedInUsers';
import { categoryResponseData } from '../../../../data/categoryResponseData';
import Category from '../../../../../models/category';
import ItemCategories from '../../../../../app/labManagerPages/Dashboard/ItemCategories/itemCategories';

const mockStore = configureMockStore([thunk]);
// mock nested components
jest.mock(
  '../../../../../app/labManagerPages/Dashboard/ItemCategories/components/newCategoryForm',
  () => ({
    __esModule: true,
    default: () => <div>Category Form</div>,
  }),
);
jest.mock(
  '../../../../../app/labManagerPages/Dashboard/ItemCategories/components/labitemCategoryCard',
  () => ({
    __esModule: true,
    default: () => <div>Category Card</div>,
  }),
);
jest.mock('../../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));
describe('Lab Manager - Categories', () => {
  let store;
  let category;
  let category2;

  beforeEach(() => {
    category = new Category(categoryResponseData);
    category2 = new Category(categoryResponseData);
    store = mockStore({
      labManagerCategories: {
        categories: [category, category2],
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
      auth: {
        user: loggedInLabManager,
      },
    });

    mockAxios.get.mockImplementationOnce(() => Promise.resolve({}));
  });

  it('should render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ItemCategories />
        </BrowserRouter>
      </Provider>,
    );
    const titleComponent = screen.getByText(/Item Categories/i);
    const formComponent = screen.getByText(/Category Form/i);
    const categoryCards = screen.getAllByText(/Category Card/i);
    expect(titleComponent).toBeInTheDocument();
    expect(formComponent).toBeInTheDocument();
    expect(categoryCards.length).toBe(2);
  });

  it('should show loading indicator when categories are loading', () => {
    store = mockStore({
      labManagerCategories: {
        categories: [category, category2],
        isCategoriesLoading: true,
        isCategoriesError: false,
        newCategoryLoading: false,
        newCategoryError: false,
        newCategorySuccess: false,
        editCategoryLoading: false,
        editCategoryError: false,
        editCategorySuccess: false,
        reloadCategories: false,
      },
      auth: {
        user: loggedInLabManager,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ItemCategories />
        </BrowserRouter>
      </Provider>,
    );
    const loadingComponent = screen.getByText(/Loading/i);
    expect(loadingComponent).toBeInTheDocument();
  });
});
