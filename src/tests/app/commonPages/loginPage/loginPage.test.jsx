import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import LoginPage from '../../../../app/commonPages/loginPage/loginPage';

const mockStore = configureMockStore([thunk]);

const mockLogin = jest.fn();
jest.mock('../../../../store/actions/authActions', () => ({
  login: () => mockLogin,
}));
jest.mock('../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));
describe('Login Form', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isAuthenticated: null,
        isLoginLoading: false,
        error: null,
        forgotPasswordSuccess: false,
        forgotPasswordError: false,
      },
    });
    store.dispatch = jest.fn();
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Welcome to UniLabs/i)).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', {
        id: /email/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', {
        id: /password/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /Log In/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Forgot Your Password/i)).toBeInTheDocument();
  });
  it('should handles edits as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>,
    );
    const emailTextField = screen.getByRole('textbox', {
      id: /email/i,
    });
    const passwordTextField = screen.getByRole('textbox', {
      id: /password/i,
    });
    fireEvent.change(emailTextField, { target: { value: 'test@example.com' } });
    expect(emailTextField.value).toBe('test@example.com');
    fireEvent.change(passwordTextField, { target: { value: 'testPass' } });
    expect(passwordTextField.value).toBe('testPass');
  });
  it('should subimmission as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>,
    );
    const submitButton = screen.getByRole('button', {
      name: /Log In/i,
    });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(mockLogin);
  });
  it('should render success and error messages as expected', () => {
    store = mockStore({
      auth: {
        isAuthenticated: null,
        isLoginLoading: false,
        error: null,
        forgotPasswordSuccess: true,
        forgotPasswordError: true,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>,
    );
    const errorComponent = screen.getByText(
      /Password Reset Failed. This may be due to email being an invalid one./i,
    );
    const successComponent = screen.getByText(
      /Password Reset Successful.Please check your email to have your new password./i,
    );

    expect(errorComponent).toBeInTheDocument();
    expect(successComponent).toBeInTheDocument();
  });
  it('should render loading widget as expected', () => {
    store = mockStore({
      auth: {
        isAuthenticated: null,
        isLoginLoading: true,
        error: null,
        forgotPasswordSuccess: false,
        forgotPasswordError: false,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>,
    );
    const loadingComponent = screen.getByText(/Loading/i);

    expect(loadingComponent).toBeInTheDocument();
  });
});
