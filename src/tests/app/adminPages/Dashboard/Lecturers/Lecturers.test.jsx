import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { loggedInAdmin } from '../../../../data/loggedInUsers';
import Lecturer from '../../../../../models/lecturer';
import { labLecturerResponseData } from '../../../../data/labLecturerResponseData';
import LecturerTable from '../../../../../app/adminPages/Dashboard/Lecturers/Lecturers';

const mockStore = configureMockStore([thunk]);
// mock nested components
jest.mock(
  '../../../../../app/adminPages/Dashboard/Lecturers/components/LecturerRegistrationForm',
  () => ({
    __esModule: true,
    default: () => <div>NewLecturerForm</div>,
  }),
);
const mockFetch = jest.fn();
const mockResetFunctions = jest.fn();
jest.mock('../../../../../store/actions/admin/adminLecturersActions', () => ({
  fetchLecturers: () => mockFetch,
  resetAdminLecturerState: () => mockResetFunctions,
}));
jest.mock('../../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));

describe('Admin Dashboard -  Lecturers', () => {
  let store;
  const lecturer = new Lecturer(labLecturerResponseData);

  beforeEach(() => {
    store = mockStore({
      adminLecturers: {
        lecturers: [lecturer],
        isLecturersLoading: false,
        isLecturersError: false,
        newLecturerLoading: false,
        newLecturerError: false,
        newLecturerSuccess: false,
        reloadLecturers: false,
        lecturerBlockUnblockLoading: false,
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
          <LecturerTable />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText('Lecturers');
    const newUserComponent = screen.getByText(/NewLecturerForm/i);
    expect(titleComponent).toBeInTheDocument();
    expect(newUserComponent).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should display loading widget when loading is true', () => {
    store = mockStore({
      adminLecturers: {
        lecturers: [],
        isLecturersLoading: true,
        isLecturersError: false,
        newLecturerLoading: false,
        newLecturerError: false,
        newLecturerSuccess: false,
        reloadLecturers: false,
        lecturerBlockUnblockSuccess: false,
      },
      auth: {
        user: loggedInAdmin,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LecturerTable />
        </BrowserRouter>
      </Provider>,
    );

    const loadingComponent = screen.getByText(/Loading/i);
    expect(loadingComponent).toBeInTheDocument();
  });
  it('should display error message when loading fails', () => {
    store = mockStore({
      adminLecturers: {
        lecturers: [],
        isLecturersLoading: false,
        isLecturersError: true,
        newLecturerLoading: false,
        newLecturerError: false,
        newLecturerSuccess: false,
        reloadLecturers: false,
        lecturerBlockUnblockError: false,
      },
      auth: {
        user: loggedInAdmin,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LecturerTable />
        </BrowserRouter>
      </Provider>,
    );

    const errorMessageComponent = screen.getByText(/Failed to load lecturers/i);
    expect(errorMessageComponent).toBeInTheDocument();
  });
  it('should display block/unblock error message when proccess fails', () => {
    store = mockStore({
      adminLecturers: {
        lecturers: [],
        isLecturersLoading: false,
        isLecturersError: false,
        newLecturerLoading: false,
        newLecturerError: false,
        newLecturerSuccess: false,
        reloadLecturers: false,
        lecturerBlockUnblockError: true,
      },
      auth: {
        user: loggedInAdmin,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LecturerTable />
        </BrowserRouter>
      </Provider>,
    );

    const errorMessageComponent = screen.getByText(
      /Lecturer Blocking\/Unblocking Failed./i,
    );
    expect(errorMessageComponent).toBeInTheDocument();
  });
});
