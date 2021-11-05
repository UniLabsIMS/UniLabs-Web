import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ItemCategoryCard from '../../../../../../app/labManagerPages/Dashboard/ItemCategories/components/labitemCategoryCard';
import Category from '../../../../../../models/category';
import { categoryResponseData } from '../../../../../data/categoryResponseData';
import 'intersection-observer';

const mockStore = configureMockStore([thunk]);

describe('Lab Manager - Category Card', () => {
  let store;
  let category;

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

    category = new Category(categoryResponseData);
  });

  it('should render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ItemCategoryCard category={category} />
        </BrowserRouter>
      </Provider>,
    );
    const nameComponent = screen.getByText(category.name);
    const descComponent = screen.getByText(category.description);
    const viewDspItemButton = screen.getByRole('button', {
      name: /Go to Display Items/i,
    });
    const editCatButton = screen.getByRole('button', {
      name: /Edit Category/i,
    });
    expect(nameComponent).toBeInTheDocument();
    expect(descComponent).toBeInTheDocument();
    expect(viewDspItemButton).toBeInTheDocument();
    expect(editCatButton).toBeInTheDocument();
  });
});
