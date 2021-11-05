import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { loggedInAdmin } from '../../../../../data/loggedInUsers';
import Lecturer from '../../../../../../models/lecturer';
import { labLecturerResponseData } from '../../../../../data/labLecturerResponseData';
import RegisterLecturer from '../../../../../../app/adminPages/Dashboard/Lecturers/components/lecturerRegistrationForm';
import Lab from '../../../../../../models/lab';
import Department from '../../../../../../models/department';
import { labResponseData } from '../../../../../data/labResponseData';
import { departmentResponseData } from '../../../../../data/departmentResponseData';

const mockStore = configureMockStore([thunk]);

const mockAdd = jest.fn();
const mockGetLabs = jest.fn();
const mockGetDepartments = jest.fn();
jest.mock(
  '../../../../../../store/actions/admin/adminLecturersActions',
  () => ({
    addLecturer: () => mockAdd,
  }),
);
jest.mock('../../../../../../store/actions/admin/adminLabsActions', () => ({
  fetchLabs: () => mockGetLabs,
  resetAdminLabState: () => jest.fn(),
}));
jest.mock(
  '../../../../../../store/actions/admin/adminDepartmentsActions',
  () => ({
    fetchDepartments: () => mockGetDepartments,
    resetAdminDepartmentState: () => jest.fn(),
  }),
);
jest.mock(
  '../../../../../../app/commonComponents/customLoadingIndicator',
  () => ({
    __esModule: true,
    default: () => <div>Loading</div>,
  }),
);

describe('Admin Dashboard -  Lecturer Registration Form', () => {
  let store;
  const lecturer = new Lecturer(labLecturerResponseData);
  const lab = new Lab(labResponseData);
  const department = new Department(departmentResponseData);
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
      adminDepartments: {
        departments: [department],
        isDepartmentsLoading: false,
        isDepartmentsError: false,
        newDepartmentLoading: true,
        newDepartmentError: false,
        newDepartmentSuccess: false,
        reloadDepartments: false,
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
          <RegisterLecturer />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText(/Add a new Lecturer/i);
    const emailTextField = screen.getByRole('textbox', {
      name: /email/i,
    });
    const idTextField = screen.getByRole('textbox', {
      name: /Lecturer ID/i,
    });
    const depSelectField = screen.getByText(/Department/i);
    const submitButton = screen.getByRole('button', {
      name: /Register Lecturer/i,
    });
    expect(titleComponent).toBeInTheDocument();
    expect(emailTextField).toBeInTheDocument();
    expect(idTextField).toBeInTheDocument();
    expect(depSelectField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  it('should handles edits as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterLecturer />
        </BrowserRouter>
      </Provider>,
    );
    const emailTextField = screen.getByRole('textbox', {
      name: /email/i,
    });
    const idTextField = screen.getByRole('textbox', {
      name: /Lecturer ID/i,
    });
    fireEvent.change(emailTextField, { target: { value: 'test@example.com' } });
    fireEvent.change(idTextField, { target: { value: 'xxx' } });
    expect(emailTextField.value).toBe('test@example.com');
    expect(idTextField.value).toBe('xxx');
  });
  it('should subimmision as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterLecturer />
        </BrowserRouter>
      </Provider>,
    );
    const submitButton = screen.getByRole('button', {
      name: /Register Lecturer/i,
    });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(mockGetDepartments);
    expect(store.dispatch).toHaveBeenCalledWith(mockAdd);
  });
  it('should render success and error messages as expected', () => {
    store = mockStore({
      adminLecturers: {
        lecturers: [lecturer],
        isLecturersLoading: false,
        isLecturersError: false,
        newLecturerLoading: false,
        newLecturerError: true,
        newLecturerSuccess: true,
        reloadLecturers: false,
        lecturerBlockUnblockLoading: false,
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
      adminDepartments: {
        departments: [department],
        isDepartmentsLoading: false,
        isDepartmentsError: true,
        newDepartmentLoading: true,
        newDepartmentError: false,
        newDepartmentSuccess: false,
        reloadDepartments: false,
      },
      auth: {
        user: loggedInAdmin,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterLecturer />
        </BrowserRouter>
      </Provider>,
    );
    const errorComponent = screen.getByText(
      /Failed to add new lecturer. Make sure all the fields are filled and email and id are not duplicates./i,
    );
    const successComponent = screen.getByText(
      /Successfully added new lecturer./i,
    );
    const depssFailComponent = screen.getByText(/Failed to load departments/i);
    expect(errorComponent).toBeInTheDocument();
    expect(successComponent).toBeInTheDocument();
    expect(depssFailComponent).toBeInTheDocument();
  });
  it('should render loading widget as expected', () => {
    store = mockStore({
      adminLecturers: {
        lecturers: [lecturer],
        isLecturersLoading: false,
        isLecturersError: false,
        newLecturerLoading: true,
        newLecturerError: false,
        newLecturerSuccess: false,
        reloadLecturers: false,
        lecturerBlockUnblockLoading: false,
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
      adminDepartments: {
        departments: [department],
        isDepartmentsLoading: false,
        isDepartmentsError: false,
        newDepartmentLoading: true,
        newDepartmentError: false,
        newDepartmentSuccess: false,
        reloadDepartments: false,
      },
      auth: {
        user: loggedInAdmin,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterLecturer />
        </BrowserRouter>
      </Provider>,
    );
    const loadingComponent = screen.getByText(/Loading/i);

    expect(loadingComponent).toBeInTheDocument();
  });
});
