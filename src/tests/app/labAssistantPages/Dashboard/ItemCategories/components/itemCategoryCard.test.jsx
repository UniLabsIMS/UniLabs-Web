import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Category from '../../../../../../models/category';
import { categoryResponseData } from '../../../../../data/categoryResponseData';
import 'intersection-observer';
import { loggedInLabAssistant } from '../../../../../data/loggedInUsers';
import ItemCategoryCard from '../../../../../../app/labAssistantPages/Dashboard/ItemCategories/components/itemCategoryCard';

const mockStore = configureMockStore([thunk]);

describe('Lab Assistant - Category Card', () => {
  let store;
  let category;

  beforeEach(() => {
    category = new Category(categoryResponseData);
    store = mockStore({
      labAssistantCategories: {
        categories: [],
        isCategoriesLoading: false,
        isCategoriesError: false,
        reloadCategories: false,
      },
      auth: {
        user: loggedInLabAssistant,
      },
    });
    store.dispatch = jest.fn();
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
    expect(nameComponent).toBeInTheDocument();
    expect(descComponent).toBeInTheDocument();
    expect(viewDspItemButton).toBeInTheDocument();
  });
});
