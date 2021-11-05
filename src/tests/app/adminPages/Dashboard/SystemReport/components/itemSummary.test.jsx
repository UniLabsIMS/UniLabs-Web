import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import ItemSummary from '../../../../../../app/adminPages/Dashboard/SystemReport/components/ItemSummary';

const mockStore = configureMockStore([thunk]);
jest.mock(
  '../../../../../../app/adminPages/Dashboard/SystemReport/components/CountCard',
  () => ({
    __esModule: true,
    default: () => <div>Count Card</div>,
  }),
);

describe('Admin - Lab Report Item Summary', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });

  it('should render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ItemSummary
            totalItems={20}
            availableItems={5}
            damagedItems={5}
            borrowedItems={5}
            tempBorrowedItems={5}
          />
        </BrowserRouter>
      </Provider>,
    );
    const titleComponent = screen.getByText('Item Summary');
    const barChartComponent = screen.getByText('Item Summary Bar Chart');
    const countCards = screen.getAllByText(/Count Card/i);
    expect(titleComponent).toBeInTheDocument();
    expect(barChartComponent).toBeInTheDocument();
    expect(countCards.length).toBe(5);
  });
});
