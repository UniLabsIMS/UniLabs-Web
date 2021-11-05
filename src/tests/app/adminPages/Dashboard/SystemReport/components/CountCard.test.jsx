import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import CountCard from '../../../../../../app/adminPages/Dashboard/SystemReport/components/CountCard';

const mockStore = configureMockStore([thunk]);

describe('Admin - Count Card', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('should render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CountCard title="Title" count={3} total={10} showPercentage />
        </BrowserRouter>
      </Provider>,
    );
    const titleComponent = screen.getByText('Title');
    const countComponent = screen.getByText('03');
    const percentageComponent = screen.getByText('Percentage: 30.00%');
    expect(titleComponent).toBeInTheDocument();
    expect(countComponent).toBeInTheDocument();
    expect(percentageComponent).toBeInTheDocument();
  });
});
