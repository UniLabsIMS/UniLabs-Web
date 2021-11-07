import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import Error404 from '../../../app/commonComponents/error404';

const mockStore = configureMockStore([thunk]);

describe('Error 404 Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Error404 />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/404 OOPS! Page Not Found./i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Go Back To Home Page' }),
    ).toBeInTheDocument();
  });
});
