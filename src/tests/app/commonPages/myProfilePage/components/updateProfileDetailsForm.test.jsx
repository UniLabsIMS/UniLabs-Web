import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { loggedInAdmin } from '../../../../data/loggedInUsers';
import UpdateProfileDetailsForm from '../../../../../app/commonPages/myProfilePage/components/updateProfileDetailsForm';

const mockStore = configureMockStore([thunk]);

const mockAdd = jest.fn();
jest.mock('../../../../../store/actions/admin/adminAdminsActions', () => ({
  addAdmin: () => mockAdd,
}));

describe('Common User - Details Update Form', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: loggedInAdmin,
        isAuthenticated: true,
        isAuthLoading: false,
        isLoginLoading: false,
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
          <UpdateProfileDetailsForm
            onSave={() => jest.fn()}
            onCancel={() => jest.fn()}
          />
        </BrowserRouter>
      </Provider>,
    );

    const submitButton = screen.getByRole('button', {
      name: /Save Changes/i,
    });
    const cancelButton = screen.getByRole('button', {
      name: /Cancel/i,
    });
    expect(cancelButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Contact Number')).toBeInTheDocument();
  });
});
