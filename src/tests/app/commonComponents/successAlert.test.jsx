import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';

import SuccessAlert from '../../../app/commonComponents/successAlert';

const mockStore = configureMockStore([thunk]);

describe('Success Alert Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SuccessAlert message="Test" />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Test/i)).toBeInTheDocument();
  });
});
