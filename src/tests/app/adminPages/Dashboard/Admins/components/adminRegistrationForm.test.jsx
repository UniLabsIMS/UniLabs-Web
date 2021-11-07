import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { loggedInAdmin } from '../../../../../data/loggedInUsers';
import Admin from '../../../../../../models/admin';
import { adminResponseData } from '../../../../../data/adminResponseData';
import RegisterAdmin from '../../../../../../app/adminPages/Dashboard/Admins/components/adminRegistrationForm';

const mockStore = configureMockStore([thunk]);

const mockAdd = jest.fn();
jest.mock('../../../../../../store/actions/admin/adminAdminsActions', () => ({
  addAdmin: () => mockAdd,
}));
jest.mock(
  '../../../../../../app/commonComponents/customLoadingIndicator',
  () => ({
    __esModule: true,
    default: () => <div>Loading</div>,
  }),
);

describe('Admin Dashboard -  Admin Registration Form', () => {
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
    store.dispatch = jest.fn();
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterAdmin />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText(/Add New Admin/i);
    const emailTextField = screen.getByRole('textbox', {
      name: /email/i,
    });
    const submitButton = screen.getByRole('button', {
      name: /Register Admin/i,
    });
    expect(titleComponent).toBeInTheDocument();
    expect(emailTextField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  it('should handles edits as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterAdmin />
        </BrowserRouter>
      </Provider>,
    );
    const emailTextField = screen.getByRole('textbox', {
      name: /email/i,
    });
    fireEvent.change(emailTextField, { target: { value: 'test@example.com' } });
    expect(emailTextField.value).toBe('test@example.com');
  });
  it('should subimmision as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterAdmin />
        </BrowserRouter>
      </Provider>,
    );
    const submitButton = screen.getByRole('button', {
      name: /Register Admin/i,
    });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(mockAdd);
  });
  it('should render success and error messages as expected', () => {
    store = mockStore({
      adminAdmins: {
        admins: [admin],
        isAdminsLoading: false,
        isAdminsError: false,
        newAdminLoading: false,
        newAdminError: true,
        newAdminSuccess: true,
        reloadAdmins: false,
      },
      auth: {
        user: loggedInAdmin,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterAdmin />
        </BrowserRouter>
      </Provider>,
    );
    const errorComponent = screen.getByText(
      /Failed to add new admin.Make sure that the email is not a duplicate./i,
    );
    const successComponent = screen.getByText(
      /Successfully Added a New Admin./i,
    );

    expect(errorComponent).toBeInTheDocument();
    expect(successComponent).toBeInTheDocument();
  });
  it('should render loading widget as expected', () => {
    store = mockStore({
      adminAdmins: {
        admins: [admin],
        isAdminsLoading: false,
        isAdminsError: false,
        newAdminLoading: true,
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
          <RegisterAdmin />
        </BrowserRouter>
      </Provider>,
    );
    const loadingComponent = screen.getByText(/Loading/i);

    expect(loadingComponent).toBeInTheDocument();
  });
});
