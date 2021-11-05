import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { loggedInAdmin } from '../../../../../data/loggedInUsers';
import CreateLab from '../../../../../../app/adminPages/Dashboard/Labs/components/labCreationForm';
import Lab from '../../../../../../models/lab';
import Department from '../../../../../../models/department';
import { labResponseData } from '../../../../../data/labResponseData';
import { departmentResponseData } from '../../../../../data/departmentResponseData';

const mockStore = configureMockStore([thunk]);

const mockAdd = jest.fn();
const mockGetDepartments = jest.fn();
jest.mock('../../../../../../store/actions/admin/adminLabsActions', () => ({
  addLab: () => mockAdd,
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
jest.mock('../../../../../../app/commonComponents/imagePicker', () => ({
  __esModule: true,
  default: () => <div>Image Picker</div>,
}));

describe('Admin Dashboard -  Lab Creation Form', () => {
  let store;
  const lab = new Lab(labResponseData);
  const department = new Department(departmentResponseData);

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
          <CreateLab />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText(/Add New Laboratory/i);
    const nameTextField = screen.getByRole('textbox', {
      name: /name/i,
    });
    const locTextField = screen.getByRole('textbox', {
      name: /Loctaion/i,
    });
    const noTextField = screen.getByLabelText(/Contact Number/i);
    const emailTextField = screen.getByLabelText(/Contact Email/i);
    const depComponent = screen.getByText(/Department/i);
    const imgPickerComponent = screen.getByText(/Image Picker/i);
    const submitButton = screen.getByRole('button', {
      name: /Submit/i,
    });
    expect(titleComponent).toBeInTheDocument();
    expect(nameTextField).toBeInTheDocument();
    expect(locTextField).toBeInTheDocument();
    expect(noTextField).toBeInTheDocument();
    expect(emailTextField).toBeInTheDocument();
    expect(depComponent).toBeInTheDocument();
    expect(imgPickerComponent).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  it('should handles edits as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CreateLab />
        </BrowserRouter>
      </Provider>,
    );
    const nameTextField = screen.getByRole('textbox', {
      name: /name/i,
    });
    const locTextField = screen.getByRole('textbox', {
      name: /Loctaion/i,
    });
    const noTextField = screen.getByLabelText(/Contact Number/i);
    const emailTextField = screen.getByLabelText(/Contact Email/i);
    fireEvent.change(nameTextField, { target: { value: 'name' } });
    fireEvent.change(locTextField, { target: { value: 'loc' } });
    fireEvent.change(noTextField, { target: { value: '123' } });
    fireEvent.change(emailTextField, { target: { value: 'test@example.com' } });
    expect(emailTextField.value).toBe('test@example.com');
    expect(nameTextField.value).toBe('name');
    expect(locTextField.value).toBe('loc');
    expect(noTextField.value).toBe('123');
  });
  it('should subimmision as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CreateLab />
        </BrowserRouter>
      </Provider>,
    );
    const submitButton = screen.getByRole('button', {
      name: /Submit/i,
    });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(mockGetDepartments);
    expect(store.dispatch).toHaveBeenCalledWith(mockAdd);
  });
  it('should render success and error messages as expected', () => {
    store = mockStore({
      adminLabs: {
        labs: [lab],
        lecturers: [],
        isLabsLoading: false,
        isLabsError: false,
        newLabLoading: false,
        newLabError: true,
        newLabSuccess: true,
        reloadLabs: false,
        assignLecturerLoading: false,
        assignLecturerSuccess: false,
        assignLecturerError: false,
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
          <CreateLab />
        </BrowserRouter>
      </Provider>,
    );
    const errorComponent = screen.getByText(
      /Failed to add new lab, This may be becuase the name is a duplicate/i,
    );
    const successComponent = screen.getByText(/Successfully added new lab./i);
    const depFailComponent = screen.getByText(/Failed to load departments/i);

    expect(errorComponent).toBeInTheDocument();
    expect(successComponent).toBeInTheDocument();
    expect(depFailComponent).toBeInTheDocument();
  });
  it('should render loading widget as expected', () => {
    store = mockStore({
      adminLabs: {
        labs: [lab],
        lecturers: [],
        isLabsLoading: false,
        isLabsError: false,
        newLabLoading: true,
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
          <CreateLab />
        </BrowserRouter>
      </Provider>,
    );
    const loadingComponent = screen.getByText(/Loading/i);

    expect(loadingComponent).toBeInTheDocument();
  });
});
