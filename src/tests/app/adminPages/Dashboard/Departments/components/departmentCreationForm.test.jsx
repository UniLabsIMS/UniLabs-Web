import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { loggedInAdmin } from '../../../../../data/loggedInUsers';
import Department from '../../../../../../models/department';
import { departmentResponseData } from '../../../../../data/departmentResponseData';
import CreateDepartment from '../../../../../../app/adminPages/Dashboard/Departments/components/departmentCreationForm';

const mockStore = configureMockStore([thunk]);

const mockAdd = jest.fn();
jest.mock(
  '../../../../../../store/actions/admin/adminDepartmentsActions',
  () => ({
    addDepartment: () => mockAdd,
  }),
);
jest.mock(
  '../../../../../../app/commonComponents/customLoadingIndicator',
  () => ({
    __esModule: true,
    default: () => <div>Loading</div>,
  }),
);

describe('Admin Dashboard -  Department Registration Form', () => {
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
    store.dispatch = jest.fn();
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CreateDepartment />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText(/Add New Department/i);
    const nameTextField = screen.getByRole('textbox', {
      name: /name/i,
    });
    const codeTextField = screen.getByRole('textbox', {
      name: /code/i,
    });
    const submitButton = screen.getByRole('button', {
      name: /Submit/i,
    });
    expect(titleComponent).toBeInTheDocument();
    expect(nameTextField).toBeInTheDocument();
    expect(codeTextField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  it('should handles edits as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CreateDepartment />
        </BrowserRouter>
      </Provider>,
    );
    const nameTextField = screen.getByRole('textbox', {
      name: /name/i,
    });
    const codeTextField = screen.getByRole('textbox', {
      name: /code/i,
    });
    fireEvent.change(nameTextField, { target: { value: 'dep_name' } });
    fireEvent.change(codeTextField, { target: { value: 'dep_code' } });
    expect(nameTextField.value).toBe('dep_name');
    expect(codeTextField.value).toBe('dep_code');
  });
  it('should subimmision as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CreateDepartment />
        </BrowserRouter>
      </Provider>,
    );
    const submitButton = screen.getByRole('button', {
      name: /Submit/i,
    });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(mockAdd);
  });
  it('should render success and error messages as expected', () => {
    store = mockStore({
      adminDepartments: {
        departments: [department],
        isDepartmentsLoading: false,
        isDepartmentsError: false,
        newDepartmentLoading: false,
        newDepartmentError: true,
        newDepartmentSuccess: true,
        reloadDepartments: false,
      },
      auth: {
        user: loggedInAdmin,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CreateDepartment />
        </BrowserRouter>
      </Provider>,
    );
    const errorComponent = screen.getByText(
      /Failed to add new department, This may be becuase the department name or code is a duplicate/i,
    );
    const successComponent = screen.getByText(
      /Successfully added new department./i,
    );

    expect(errorComponent).toBeInTheDocument();
    expect(successComponent).toBeInTheDocument();
  });
  it('should render loading widget as expected', () => {
    store = mockStore({
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
          <CreateDepartment />
        </BrowserRouter>
      </Provider>,
    );
    const loadingComponent = screen.getByText(/Loading/i);

    expect(loadingComponent).toBeInTheDocument();
  });
});
