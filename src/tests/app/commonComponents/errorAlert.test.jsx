import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';

import ErrorAlert from '../../../app/commonComponents/errorAlert';

const mockStore = configureMockStore([thunk]);

describe('Error Alert Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ErrorAlert message="Test" />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Test/i)).toBeInTheDocument();
  });
});
