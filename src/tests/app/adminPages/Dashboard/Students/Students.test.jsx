import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { loggedInAdmin } from '../../../../data/loggedInUsers';
import Student from '../../../../../models/student';
import { studentResponseData } from '../../../../data/studentResponseData';
import StudentTable from '../../../../../app/adminPages/Dashboard/Students/Students';

const mockStore = configureMockStore([thunk]);
// mock nested components
jest.mock(
  '../../../../../app/adminPages/Dashboard/Students/components/studentRegistrationForm',
  () => ({
    __esModule: true,
    default: () => <div>NewStudentForm</div>,
  }),
);
const mockFetch = jest.fn();
const mockResetFunctions = jest.fn();
jest.mock('../../../../../store/actions/admin/adminStudentsActions', () => ({
  fetchStudents: () => mockFetch,
  resetAdminStudentState: () => mockResetFunctions,
}));
jest.mock('../../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));

describe('Admin Dashboard -  Students', () => {
  let store;
  const student = new Student(studentResponseData);

  beforeEach(() => {
    store = mockStore({
      adminStudents: {
        students: [student],
        isStudentsLoading: false,
        isStudentsError: false,
        newStudentLoading: false,
        newStudentError: false,
        newStudentsuccess: false,
        reloadStudents: false,
        studentBlockUnblockLoading: false,
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
          <StudentTable />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText('Students');
    const newUserComponent = screen.getByText(/NewStudentForm/i);
    expect(titleComponent).toBeInTheDocument();
    expect(newUserComponent).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should display loading widget when loading is true', () => {
    store = mockStore({
      adminStudents: {
        students: [student],
        isStudentsLoading: true,
        isStudentsError: false,
        newStudentLoading: false,
        newStudentError: false,
        newStudentsuccess: false,
        reloadStudents: false,
        studentBlockUnblockSuccess: false,
      },
      auth: {
        user: loggedInAdmin,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentTable />
        </BrowserRouter>
      </Provider>,
    );

    const loadingComponent = screen.getByText(/Loading/i);
    expect(loadingComponent).toBeInTheDocument();
  });
  it('should display error message when loading fails', () => {
    store = mockStore({
      adminStudents: {
        students: [student],
        isStudentsLoading: false,
        isStudentsError: true,
        newStudentLoading: false,
        newStudentError: false,
        newStudentsuccess: false,
        reloadStudents: false,
        studentBlockUnblockError: false,
      },
      auth: {
        user: loggedInAdmin,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentTable />
        </BrowserRouter>
      </Provider>,
    );

    const errorMessageComponent = screen.getByText(/Failed to load Students/i);
    expect(errorMessageComponent).toBeInTheDocument();
  });
  it('should display block/unblock error message when proccess fails', () => {
    store = mockStore({
      adminStudents: {
        students: [student],
        isStudentsLoading: false,
        isStudentsError: false,
        newStudentLoading: false,
        newStudentError: false,
        newStudentsuccess: false,
        reloadStudents: false,
        studentBlockUnblockLoading: false,
        studentBlockUnblockSuccess: false,
        studentBlockUnblockError: true,
      },
      auth: {
        user: loggedInAdmin,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentTable />
        </BrowserRouter>
      </Provider>,
    );

    const errorMessageComponent = screen.getByText(
      /Student Blocking\/Unblocking Failed./i,
    );
    expect(errorMessageComponent).toBeInTheDocument();
  });
});
