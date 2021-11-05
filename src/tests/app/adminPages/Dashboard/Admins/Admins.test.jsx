import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { loggedInAdmin } from '../../../../data/loggedInUsers';
import Admin from '../../../../../models/admin';
import { adminResponseData } from '../../../../data/adminResponseData';
import AdminTable from '../../../../../app/adminPages/Dashboard/Admins/Admins';

const mockStore = configureMockStore([thunk]);
// mock nested components
jest.mock(
  '../../../../../app/adminPages/Dashboard/Admins/components/adminRegistrationForm',
  () => ({
    __esModule: true,
    default: () => <div>NewAdminForm</div>,
  }),
);
const mockFetch = jest.fn();
const mockResetFunctions = jest.fn();
jest.mock('../../../../../store/actions/admin/adminAdminsActions', () => ({
  fetchAdmins: () => mockFetch,
  resetAdminAdminState: () => mockResetFunctions,
}));
jest.mock('../../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));

describe('Admin Dashboard -  Admins', () => {
  let store;
  const admin = new Admin(adminResponseData);

  beforeEach(() => {
    store = mockStore({
      adminAdmins: {
        admins: [admin],
        isAdminsLoading: false,
        isAdminsError: false,
        newAdminLoading: false,
        newAdminError: false,
        newAdminSuccess: false,
        reloadAdmins: false,
      },
      auth: {
        user: loggedInAdmin,
      },
    });
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AdminTable />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText('Admins');
    const newUserComponent = screen.getByText(/NewAdminForm/i);
    expect(titleComponent).toBeInTheDocument();
    expect(newUserComponent).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should display loading widget when loading is true', () => {
    store = mockStore({
      adminAdmins: {
        admins: [admin],
        isAdminsLoading: true,
        isAdminsError: false,
        newAdminLoading: false,
        newAdminError: false,
        newAdminSuccess: false,
        reloadAdmins: false,
      },
      auth: {
        user: loggedInAdmin,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AdminTable />
        </BrowserRouter>
      </Provider>,
    );

    const loadingComponent = screen.getByText(/Loading/i);
    expect(loadingComponent).toBeInTheDocument();
  });
  it('should display error message when loading fails', () => {
    store = mockStore({
      adminAdmins: {
        admins: [admin],
        isAdminsLoading: false,
        isAdminsError: true,
        newAdminLoading: false,
        newAdminError: false,
        newAdminSuccess: false,
        reloadAdmins: false,
      },
      auth: {
        user: loggedInAdmin,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AdminTable />
        </BrowserRouter>
      </Provider>,
    );

    const errorMessageComponent = screen.getByText(/Failed to load admins/i);
    expect(errorMessageComponent).toBeInTheDocument();
  });
});
