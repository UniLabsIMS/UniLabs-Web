import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';

import WarningAlert from '../../../app/commonComponents/warningAlert';

const mockStore = configureMockStore([thunk]);

describe('Warning Alert Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <WarningAlert message="Test" />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Test/i)).toBeInTheDocument();
  });
});
