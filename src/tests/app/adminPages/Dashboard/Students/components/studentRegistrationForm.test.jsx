import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { loggedInAdmin } from '../../../../../data/loggedInUsers';
import Student from '../../../../../../models/student';
import { studentResponseData } from '../../../../../data/studentResponseData';
import RegisterStudent from '../../../../../../app/adminPages/Dashboard/Students/components/studentRegistrationForm';
import Department from '../../../../../../models/department';

import { departmentResponseData } from '../../../../../data/departmentResponseData';

const mockStore = configureMockStore([thunk]);

const mockAdd = jest.fn();
const mockGetDepartments = jest.fn();
jest.mock('../../../../../../store/actions/admin/adminStudentsActions', () => ({
  addStudent: () => mockAdd,
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

describe('Admin Dashboard -  Student Registration Form', () => {
  let store;
  const student = new Student(studentResponseData);
  const department = new Department(departmentResponseData);
  beforeEach(() => {
    store = mockStore({
      adminStudents: {
        students: [student],
        isStudentsLoading: false,
        isStudentsError: false,
        newStudentLoading: false,
        newStudentError: false,
        newStudentSuccess: false,
        reloadStudents: false,
        studentBlockUnblockLoading: false,
      },

      adminDepartments: {
        departments: [department],
        isDepartmentsLoading: false,
        isDepartmentsError: false,
        newDepartmentLoading: false,
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
          <RegisterStudent />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText(/Add New Student/i);
    const emailTextField = screen.getByRole('textbox', {
      name: /email/i,
    });
    const idTextField = screen.getByRole('textbox', {
      name: /Student ID/i,
    });
    const depSelectField = screen.getByText(/Department/i);
    const submitButton = screen.getByRole('button', {
      name: /Register Student/i,
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
          <RegisterStudent />
        </BrowserRouter>
      </Provider>,
    );
    const emailTextField = screen.getByRole('textbox', {
      name: /email/i,
    });
    const idTextField = screen.getByRole('textbox', {
      name: /Student ID/i,
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
          <RegisterStudent />
        </BrowserRouter>
      </Provider>,
    );
    const submitButton = screen.getByRole('button', {
      name: /Register Student/i,
    });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(mockGetDepartments);
    expect(store.dispatch).toHaveBeenCalledWith(mockAdd);
  });
  it('should render success and error messages as expected', () => {
    store = mockStore({
      adminStudents: {
        students: [student],
        isStudentsLoading: false,
        isStudentsError: false,
        newStudentLoading: false,
        newStudentError: true,
        newStudentSuccess: true,
        reloadStudents: false,
        studentBlockUnblockLoading: false,
      },

      adminDepartments: {
        departments: [department],
        isDepartmentsLoading: false,
        isDepartmentsError: true,
        newDepartmentLoading: false,
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
          <RegisterStudent />
        </BrowserRouter>
      </Provider>,
    );
    const errorComponent = screen.getByText(
      /Failed to add new student. Make sure all the fields are filled and email and id are not duplicates/i,
    );
    const successComponent = screen.getByText(
      /Successfully added new student/i,
    );
    const depssFailComponent = screen.getByText(/Failed to load departments/i);
    expect(errorComponent).toBeInTheDocument();
    expect(successComponent).toBeInTheDocument();
    expect(depssFailComponent).toBeInTheDocument();
  });
  it('should render loading widget as expected', () => {
    store = mockStore({
      adminStudents: {
        students: [student],
        isStudentsLoading: false,
        isStudentsError: false,
        newStudentLoading: true,
        newStudentError: false,
        newStudentSuccess: false,
        reloadStudents: false,
        studentBlockUnblockLoading: false,
      },
      adminDepartments: {
        departments: [department],
        isDepartmentsLoading: false,
        isDepartmentsError: false,
        newDepartmentLoading: false,
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
          <RegisterStudent />
        </BrowserRouter>
      </Provider>,
    );
    const loadingComponent = screen.getByText(/Loading/i);

    expect(loadingComponent).toBeInTheDocument();
  });
});
