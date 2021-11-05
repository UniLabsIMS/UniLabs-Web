import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { loggedInAdmin } from '../../../../data/loggedInUsers';
import Department from '../../../../../models/department';
import { departmentResponseData } from '../../../../data/departmentResponseData';
import DepartmentTable from '../../../../../app/adminPages/Dashboard/Departments/Departments';

const mockStore = configureMockStore([thunk]);
// mock nested components
jest.mock(
  '../../../../../app/adminPages/Dashboard/Departments/components/departmentCreationForm',
  () => ({
    __esModule: true,
    default: () => <div>NewDepartmentForm</div>,
  }),
);
const mockFetch = jest.fn();
const mockResetFunctions = jest.fn();
jest.mock('../../../../../store/actions/admin/adminDepartmentsActions', () => ({
  fetchDepartments: () => mockFetch,
  resetAdminDepartmentState: () => mockResetFunctions,
}));
jest.mock('../../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));

describe('Admin Dashboard -  Departments', () => {
  let store;
  const department = new Department(departmentResponseData);

  beforeEach(() => {
    store = mockStore({
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
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DepartmentTable />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText('Departments');
    const newDepComponent = screen.getByText(/NewDepartmentForm/i);
    expect(titleComponent).toBeInTheDocument();
    expect(newDepComponent).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should display loading widget when loading is true', () => {
    store = mockStore({
      adminDepartments: {
        departments: [department],
        isDepartmentsLoading: true,
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
          <DepartmentTable />
        </BrowserRouter>
      </Provider>,
    );

    const loadingComponent = screen.getByText(/Loading/i);
    expect(loadingComponent).toBeInTheDocument();
  });
  it('should display error message when loading fails', () => {
    store = mockStore({
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
          <DepartmentTable />
        </BrowserRouter>
      </Provider>,
    );

    const errorMessageComponent = screen.getByText(
      /Failed to load departments/i,
    );
    expect(errorMessageComponent).toBeInTheDocument();
  });
});
