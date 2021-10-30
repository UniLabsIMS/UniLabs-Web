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

    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {},
      }),
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ItemCategories />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('should render as expected', () => {
    const titleComponent = screen.getByText(/Item Categories/i);
    const categoryCards = screen.getAllByText(category.name);
    expect(titleComponent).toBeInTheDocument();
    expect(categoryCards.length).toBe(2);
  });
});
