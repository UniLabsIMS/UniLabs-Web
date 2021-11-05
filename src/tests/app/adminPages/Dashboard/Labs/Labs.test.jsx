import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { loggedInAdmin } from '../../../../data/loggedInUsers';
import Lab from '../../../../../models/lab';
import { labResponseData } from '../../../../data/labResponseData';
import LabTable from '../../../../../app/adminPages/Dashboard/Labs/Labs';

const mockStore = configureMockStore([thunk]);
// mock nested components
jest.mock(
  '../../../../../app/adminPages/Dashboard/Labs/components/labCreationForm',
  () => ({
    __esModule: true,
    default: () => <div>NewLabForm</div>,
  }),
);
const mockFetch = jest.fn();
const mockResetFunctions = jest.fn();
jest.mock('../../../../../store/actions/admin/adminLabsActions', () => ({
  fetchLabs: () => mockFetch,
  resetAdminLabState: () => mockResetFunctions,
}));
jest.mock('../../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));

describe('Admin Dashboard -  Labs', () => {
  let store;
  const lab = new Lab(labResponseData);

  beforeEach(() => {
    store = mockStore({
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
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LabTable />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText('Labs');
    const newLabComponent = screen.getByText(/NewLabForm/i);
    expect(titleComponent).toBeInTheDocument();
    expect(newLabComponent).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should display loading widget when loading is true', () => {
    store = mockStore({
      adminLabs: {
        labs: [lab],
        lecturers: [],
        isLabsLoading: true,
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
          <LabTable />
        </BrowserRouter>
      </Provider>,
    );

    const loadingComponent = screen.getByText(/Loading/i);
    expect(loadingComponent).toBeInTheDocument();
  });
  it('should display error message when loading fails', () => {
    store = mockStore({
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
          <LabTable />
        </BrowserRouter>
      </Provider>,
    );

    const errorMessageComponent = screen.getByText(/Failed to load labs/i);
    expect(errorMessageComponent).toBeInTheDocument();
  });
});
