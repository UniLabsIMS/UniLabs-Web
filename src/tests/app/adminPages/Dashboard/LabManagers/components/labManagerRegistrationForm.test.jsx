import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { loggedInAdmin } from '../../../../../data/loggedInUsers';
import LabManager from '../../../../../../models/labManager';
import { labManagerResponseData } from '../../../../../data/labManagerResponseData';
import RegisterLabAssitant from '../../../../../../app/adminPages/Dashboard/LabManagers/components/labManagerRegistrationForm';
import Lab from '../../../../../../models/lab';
import { labResponseData } from '../../../../../data/labResponseData';

const mockStore = configureMockStore([thunk]);

const mockAdd = jest.fn();
const mockGetLabs = jest.fn();
jest.mock(
  '../../../../../../store/actions/admin/adminLabManagersActions',
  () => ({
    addLabManager: () => mockAdd,
  }),
);
jest.mock('../../../../../../store/actions/admin/adminLabsActions', () => ({
  fetchLabs: () => mockGetLabs,
  resetAdminLabState: () => jest.fn(),
}));
jest.mock(
  '../../../../../../app/commonComponents/customLoadingIndicator',
  () => ({
    __esModule: true,
    default: () => <div>Loading</div>,
  }),
);

describe('Admin Dashboard -  Lab Manager Registration Form', () => {
  let store;
  const labManager = new LabManager(labManagerResponseData);
  const lab = new Lab(labResponseData);
  beforeEach(() => {
    store = mockStore({
      adminLabManagers: {
        labManagers: [labManager],
        isLabManagersLoading: false,
        isLabManagersError: false,
        newLabManagerLoading: false,
        newLabManagerError: false,
        newLabManagerSuccess: false,
        reloadLabManagers: false,
        labManagerBlockUnblockLoading: false,
        labManagerBlockUnblockSuccess: false,
        labManagerBlockUnblockError: false,
      },
      adminLabs: {
        labs: [lab],
        lecturers: [],
        isLabsLoading: false,
        isLabsError: false,
        newLabLoading: false,
        newLabError: false,
        newLabSuccess: false,
        reloadLabs: false,
        assignLecturerLoading: false,
        assignLecturerSuccess: false,
        assignLecturerError: false,
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
          <RegisterLabAssitant />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText(/Add New Lab Manager/i);
    const emailTextField = screen.getByRole('textbox', {
      name: /email/i,
    });
    const labSelectField = screen.getByText(/Laboratory/i);
    const submitButton = screen.getByRole('button', {
      name: /Register Lab Manager/i,
    });
    expect(titleComponent).toBeInTheDocument();
    expect(emailTextField).toBeInTheDocument();
    expect(labSelectField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  it('should handles edits as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterLabAssitant />
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
          <RegisterLabAssitant />
        </BrowserRouter>
      </Provider>,
    );
    const submitButton = screen.getByRole('button', {
      name: /Register Lab Manager/i,
    });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(mockGetLabs);
    expect(store.dispatch).toHaveBeenCalledWith(mockAdd);
  });
  it('should render success and error messages as expected', () => {
    store = mockStore({
      adminLabManagers: {
        labManagers: [labManager],
        isLabManagersLoading: false,
        isLabManagersError: false,
        newLabManagerLoading: false,
        newLabManagerError: true,
        newLabManagerSuccess: true,
        reloadLabManagers: false,
        labManagerBlockUnblockLoading: false,
        labManagerBlockUnblockSuccess: false,
        labManagerBlockUnblockError: false,
      },
      adminLabs: {
        labs: [lab],
        lecturers: [],
        isLabsLoading: false,
        isLabsError: true,
        newLabLoading: false,
        newLabError: false,
        newLabSuccess: false,
        reloadLabs: false,
        assignLecturerLoading: false,
        assignLecturerSuccess: false,
        assignLecturerError: false,
      },
      auth: {
        user: loggedInAdmin,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterLabAssitant />
        </BrowserRouter>
      </Provider>,
    );
    const errorComponent = screen.getByText(
      /Failed to add new Lab Manager. Make sure all fields are filled and email is not a duplicate./i,
    );
    const successComponent = screen.getByText(
      /Successfully added new Lab Manager./i,
    );
    const labsFailComponent = screen.getByText(/Failed to load labs/i);
    expect(errorComponent).toBeInTheDocument();
    expect(successComponent).toBeInTheDocument();
    expect(labsFailComponent).toBeInTheDocument();
  });
  it('should render loading widget as expected', () => {
    store = mockStore({
      adminLabManagers: {
        labManagers: [labManager],
        isLabManagersLoading: false,
        isLabManagersError: false,
        newLabManagerLoading: true,
        newLabManagerError: false,
        newLabManagerSuccess: false,
        reloadLabManagers: false,
        labManagerBlockUnblockLoading: false,
        labManagerBlockUnblockSuccess: false,
        labManagerBlockUnblockError: false,
      },
      adminLabs: {
        labs: [lab],
        lecturers: [],
        isLabsLoading: false,
        isLabsError: false,
        newLabLoading: false,
        newLabError: false,
        newLabSuccess: false,
        reloadLabs: false,
        assignLecturerLoading: false,
        assignLecturerSuccess: false,
        assignLecturerError: false,
      },
      auth: {
        user: loggedInAdmin,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterLabAssitant />
        </BrowserRouter>
      </Provider>,
    );
    const loadingComponent = screen.getByText(/Loading/i);

    expect(loadingComponent).toBeInTheDocument();
  });
});
