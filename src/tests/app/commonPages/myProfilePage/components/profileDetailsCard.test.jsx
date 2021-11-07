import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { loggedInAdmin } from '../../../../data/loggedInUsers';
import ProfileDetailsCard from '../../../../../app/commonPages/myProfilePage/components/profileDetailsCard';

const mockStore = configureMockStore([thunk]);
jest.mock(
  '../../../../../app/commonPages/myProfilePage/components/profileImageUploadModal',
  () => ({
    __esModule: true,
    default: () => <div>ProfileImageUploadModal</div>,
  }),
);
jest.mock('../../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));
jest.mock(
  '../../../../../app/commonPages/myProfilePage/components/changePasswordForm',
  () => ({
    __esModule: true,
    default: () => <div>ChangePasswordForm</div>,
  }),
);
jest.mock(
  '../../../../../app/commonPages/myProfilePage/components/updateProfileDetailsForm',
  () => ({
    __esModule: true,
    default: () => <div>UpdateProfileDetailsForm</div>,
  }),
);
describe('Profile Details Card', () => {
  let store;
  let userObj;
  beforeEach(() => {
    userObj = loggedInAdmin;
    userObj.firstName = 'Lorem';
    userObj.lastName = 'Ipsum';
    userObj.contactNumber = 'xxx';
    store = mockStore({
      auth: {
        isAuthenticated: true,
        isAuthLoading: false,
        isLoginLoading: false,
        user: loggedInAdmin,
        error: null,
        forgotPasswordSuccess: false,
        forgotPasswordError: false,
        isUpdateProfileLoading: false,
        updateProfileSuccess: false,
        updateProfileError: false,
        isChangePasswordLoading: false,
        changePasswordSuccess: false,
        changePasswordError: false,
        isImageChangeLoading: false,
        imageChangeSuccess: false,
        imageChangeError: false,
      },
    });
    store.dispatch = jest.fn();
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProfileDetailsCard />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(userObj.email)).toBeInTheDocument();
    expect(
      screen.getByText(`${userObj.firstName} ${userObj.lastName}`),
    ).toBeInTheDocument();
    expect(screen.getByText(userObj.contactNumber)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Change Profile Details' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Change Password' }),
    ).toBeInTheDocument();
  });
  it('should handle change password click as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProfileDetailsCard />
        </BrowserRouter>
      </Provider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Change Password' }));
    expect(screen.getByText('ChangePasswordForm')).toBeInTheDocument();
  });
  it('should handle change profile details click as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProfileDetailsCard />
        </BrowserRouter>
      </Provider>,
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Change Profile Details' }),
    );
    expect(screen.getByText('UpdateProfileDetailsForm')).toBeInTheDocument();
  });
  it('should display feedback messages as expected', () => {
    store = mockStore({
      auth: {
        isAuthenticated: true,
        isAuthLoading: false,
        isLoginLoading: false,
        user: loggedInAdmin,
        error: null,
        forgotPasswordSuccess: false,
        forgotPasswordError: false,
        isUpdateProfileLoading: false,
        updateProfileSuccess: true,
        updateProfileError: true,
        isChangePasswordLoading: false,
        changePasswordSuccess: true,
        changePasswordError: true,
        isImageChangeLoading: false,
        imageChangeSuccess: true,
        imageChangeError: true,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProfileDetailsCard />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Changes saved successfully.')).toBeInTheDocument();
    expect(
      screen.getByText('Password changed successfully.'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Failed to change password. Please make sure your password obey the constarints given.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Failed to save changes.Please try again later.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Image changed successfully.')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Failed to change profile image please try again later.',
      ),
    ).toBeInTheDocument();
  });
});
