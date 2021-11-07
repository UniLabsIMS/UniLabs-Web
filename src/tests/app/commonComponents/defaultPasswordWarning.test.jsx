import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import DefaultPasswordWarining from '../../../app/commonComponents/defaultPasswordWarning';

const mockStore = configureMockStore([thunk]);

describe('Default Password Warining Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DefaultPasswordWarining />
        </BrowserRouter>
      </Provider>,
    );

    expect(
      screen.getByText(
        /You are still using your default password. Please change your password from/i,
      ),
    ).toBeInTheDocument();
  });
});
