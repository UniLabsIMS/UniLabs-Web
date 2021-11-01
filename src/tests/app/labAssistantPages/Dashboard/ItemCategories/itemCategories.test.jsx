import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { loggedInLabAssistant } from '../../../../data/loggedInUsers';
import { categoryResponseData } from '../../../../data/categoryResponseData';
import Category from '../../../../../models/category';
import ItemCategories from '../../../../../app/labAssistantPages/Dashboard/ItemCategories/itemCategories';

const mockStore = configureMockStore([thunk]);
jest.mock(
  '../../../../../app/labAssistantPages/Dashboard/ItemCategories/components/itemCategoryCard',
  () => ({
    __esModule: true,
    default: () => <div>Category Card</div>,
  }),
);
jest.mock('../../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));
const mockFetchCategories = jest.fn();
const mockFetchCategoriesReset = jest.fn();
jest.mock(
  '../../../../../store/actions/labAssistant/labAssistantCategoriesActions',
  () => ({
    fetchLabAssistantCategories: () => mockFetchCategories,
    resetLabAssistantCategoriesState: () => mockFetchCategoriesReset,
  }),
);

describe('Lab Assistant - Categories', () => {
  let store;
  let category;
  let category2;

  beforeEach(() => {
    category = new Category(categoryResponseData);
    category2 = new Category(categoryResponseData);
    store = mockStore({
      labAssistantCategories: {
        categories: [category, category2],
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
          <ItemCategories />
        </BrowserRouter>
      </Provider>,
    );
    const titleComponent = screen.getByText(/Item Categories/i);
    const categoryCards = screen.getAllByText(/Category Card/i);
    expect(titleComponent).toBeInTheDocument();
    expect(categoryCards.length).toBe(2);
    expect(store.dispatch).toBeCalledTimes(1);
    expect(store.dispatch).toBeCalledWith(mockFetchCategories);
  });

  it('should show loading indicator when categories are loading', () => {
    store = mockStore({
      labAssistantCategories: {
        categories: [],
        isCategoriesLoading: true,
        isCategoriesError: false,
        reloadCategories: false,
      },
      auth: {
        user: loggedInLabAssistant,
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

  it('should show warning if no categories are present', () => {
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
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ItemCategories />
        </BrowserRouter>
      </Provider>,
    );
    const warningComponent = screen.getByText(/No categories available/i);
    expect(warningComponent).toBeInTheDocument();
  });
});
