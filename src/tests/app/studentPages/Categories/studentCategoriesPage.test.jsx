import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { loggedInStudent } from '../../../data/loggedInUsers';
import { categoryResponseData } from '../../../data/categoryResponseData';
import Category from '../../../../models/category';
import StudentCategoriesPage from '../../../../app/studentPages/Categories/studentCategoriesPage';

const mockStore = configureMockStore([thunk]);
jest.mock(
  '../../../../app/studentPages/Categories/components/CategoryCard',
  () => ({
    __esModule: true,
    default: () => <div>Category Card</div>,
  }),
);
jest.mock('../../../../app/commonComponents/labBucketEntranceCard', () => ({
  __esModule: true,
  default: () => <div>Lab Bucket Entrance Card</div>,
}));
jest.mock('../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));
jest.mock('../../../../app/commonComponents/breadCrumbsWrapper', () => ({
  __esModule: true,
  default: () => <div>Breadcrumbs</div>,
}));
const mockFetchCategories = jest.fn();
jest.mock('../../../../store/actions/student/studentCategoriesActions', () => ({
  fetchCategories: () => mockFetchCategories,
}));

describe('Student - Categories', () => {
  let store;
  let category;
  let category2;

  beforeEach(() => {
    category = new Category(categoryResponseData);
    category2 = new Category(categoryResponseData);
    category2.id = '8ff542b4-dbef-45c8-8853-27362fed664fg';
    store = mockStore({
      studentCategories: {
        categories: [category, category2],
        isCategoriesLoading: false,
        isCategoriesError: false,
        reloadCategories: false,
      },
      auth: {
        user: loggedInStudent,
      },
    });
    store.dispatch = jest.fn();
  });

  it('should render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentCategoriesPage />
        </BrowserRouter>
      </Provider>,
    );
    const titleComponent = screen.getByText(/Item Categories/i);
    const breadcrumbsComponent = screen.getByText(/Breadcrumbs/i);
    const bucketCardComponent = screen.getByText(/Lab Bucket Entrance Card/i);
    const categoryCards = screen.getAllByText(/Category Card/i);
    expect(titleComponent).toBeInTheDocument();
    expect(breadcrumbsComponent).toBeInTheDocument();
    expect(bucketCardComponent).toBeInTheDocument();
    expect(categoryCards.length).toBe(2);
    expect(store.dispatch).toBeCalledTimes(1);
    expect(store.dispatch).toBeCalledWith(mockFetchCategories);
  });

  it('should show loading indicator when categories are loading', () => {
    store = mockStore({
      studentCategories: {
        categories: [],
        isCategoriesLoading: true,
        isCategoriesError: false,
        reloadCategories: false,
      },
      auth: {
        user: loggedInStudent,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentCategoriesPage />
        </BrowserRouter>
      </Provider>,
    );
    const loadingComponent = screen.getByText(/Loading/i);
    expect(loadingComponent).toBeInTheDocument();
  });

  it('should show warning if no categories are present', () => {
    store = mockStore({
      studentCategories: {
        categories: [],
        isCategoriesLoading: false,
        isCategoriesError: false,
        reloadCategories: false,
      },
      auth: {
        user: loggedInStudent,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentCategoriesPage />
        </BrowserRouter>
      </Provider>,
    );
    const warningComponent = screen.getByText(/No Categories Available/i);
    expect(warningComponent).toBeInTheDocument();
  });
});
