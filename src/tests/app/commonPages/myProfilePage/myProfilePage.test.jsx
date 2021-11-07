import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import MyProfilePage from '../../../../app/commonPages/myProfilePage/myProfilePage';
import { loggedInAdmin } from '../../../data/loggedInUsers';

const mockStore = configureMockStore([thunk]);

jest.mock(
  '../../../../app/commonPages/myProfilePage/components/profileDetailsCard',
  () => ({
    __esModule: true,
    default: () => <div>ProfileDetailsCard</div>,
  }),
);
describe('My Profile Page', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: loggedInAdmin,
      },
    });
    store.dispatch = jest.fn();
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MyProfilePage />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/ProfileDetailsCard/i)).toBeInTheDocument();
  });
});
