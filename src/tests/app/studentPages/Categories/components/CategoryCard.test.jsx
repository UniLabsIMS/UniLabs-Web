import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Category from '../../../../../models/category';
import { categoryResponseData } from '../../../../data/categoryResponseData';
import 'intersection-observer';
import CategoryCard from '../../../../../app/studentPages/Categories/components/CategoryCard';

const mockStore = configureMockStore([thunk]);

describe('Student - Category Card', () => {
  let store;
  let category;

  beforeEach(() => {
    category = new Category(categoryResponseData);
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  it('should render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CategoryCard category={category} labId="123" />
        </BrowserRouter>
      </Provider>,
    );
    const nameComponent = screen.getByText(category.name);
    const descComponent = screen.getByText(category.description);
    const viewItemsButton = screen.getByRole('button', {
      name: /View Items/i,
    });
    expect(nameComponent).toBeInTheDocument();
    expect(descComponent).toBeInTheDocument();
    expect(viewItemsButton).toBeInTheDocument();
  });
});
