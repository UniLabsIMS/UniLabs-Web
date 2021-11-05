import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { loggedInAdmin } from '../../../../data/loggedInUsers';
import LabManager from '../../../../../models/labManager';
import { labManagerResponseData } from '../../../../data/labManagerResponseData';
import LabManagerTable from '../../../../../app/adminPages/Dashboard/LabManagers/LabManagers';

const mockStore = configureMockStore([thunk]);
// mock nested components
jest.mock(
  '../../../../../app/adminPages/Dashboard/LabManagers/components/labManagerRegistrationForm',
  () => ({
    __esModule: true,
    default: () => <div>NewLabManagerForm</div>,
  }),
);
const mockFetch = jest.fn();
const mockResetFunctions = jest.fn();
jest.mock('../../../../../store/actions/admin/adminLabManagersActions', () => ({
  fetchLabManagers: () => mockFetch,
  resetAdminLabManagerState: () => mockResetFunctions,
}));
jest.mock('../../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));

describe('Admin Dashboard -  Lab Managers', () => {
  let store;
  const labManager = new LabManager(labManagerResponseData);

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
      auth: {
        user: loggedInAdmin,
      },
    });
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LabManagerTable />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText('Lab Managers');
    const newUserComponent = screen.getByText(/NewLabManagerForm/i);
    expect(titleComponent).toBeInTheDocument();
    expect(newUserComponent).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should display loading widget when loading is true', () => {
    store = mockStore({
      adminLabManagers: {
        labManagers: [labManager],
        isLabManagersLoading: true,
        isLabManagersError: false,
        newLabManagerLoading: false,
        newLabManagerError: false,
        newLabManagerSuccess: false,
        reloadLabManagers: false,
        labManagerBlockUnblockLoading: false,
        labManagerBlockUnblockSuccess: false,
        labManagerBlockUnblockError: false,
      },
      auth: {
        user: loggedInAdmin,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LabManagerTable />
        </BrowserRouter>
      </Provider>,
    );

    const loadingComponent = screen.getByText(/Loading/i);
    expect(loadingComponent).toBeInTheDocument();
  });
  it('should display error message when loading fails', () => {
    store = mockStore({
      adminLabManagers: {
        labManagers: [labManager],
        isLabManagersLoading: false,
        isLabManagersError: true,
        newLabManagerLoading: false,
        newLabManagerError: false,
        newLabManagerSuccess: false,
        reloadLabManagers: false,
        labManagerBlockUnblockLoading: false,
        labManagerBlockUnblockSuccess: false,
        labManagerBlockUnblockError: false,
      },
      auth: {
        user: loggedInAdmin,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LabManagerTable />
        </BrowserRouter>
      </Provider>,
    );

    const errorMessageComponent = screen.getByText(
      /Failed to load labManagers/i,
    );
    expect(errorMessageComponent).toBeInTheDocument();
  });
  it('should display block/unblock error message when proccess fails', () => {
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
        labManagerBlockUnblockError: true,
      },
      auth: {
        user: loggedInAdmin,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LabManagerTable />
        </BrowserRouter>
      </Provider>,
    );

    const errorMessageComponent = screen.getByText(
      /Lab Manager Blocking\/Unblocking Failed./i,
    );
    expect(errorMessageComponent).toBeInTheDocument();
  });
});
