import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { loggedInAdmin } from '../../../../../data/loggedInUsers';
import LabAssistant from '../../../../../../models/labAssistant';
import { labAssistantResponseData } from '../../../../../data/labAssistantResponseData';
import RegisterLabAssitant from '../../../../../../app/adminPages/Dashboard/LabAssistants/components/assistantRegistrationForm';
import Lab from '../../../../../../models/lab';
import { labResponseData } from '../../../../../data/labResponseData';

const mockStore = configureMockStore([thunk]);

const mockAdd = jest.fn();
const mockGetLabs = jest.fn();
jest.mock(
  '../../../../../../store/actions/admin/adminLabAssistantsActions',
  () => ({
    addLabAssistant: () => mockAdd,
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

describe('Admin Dashboard -  Lab Assistant Registration Form', () => {
  let store;
  const labAssistant = new LabAssistant(labAssistantResponseData);
  const lab = new Lab(labResponseData);
  beforeEach(() => {
    store = mockStore({
      adminLabAssistants: {
        labAssistants: [labAssistant],
        isLabAssistantsLoading: false,
        isLabAssistantsError: false,
        newLabAssistantLoading: false,
        newLabAssistantError: false,
        newLabAssistantSuccess: false,
        reloadLabAssistants: false,
        labAssistantBlockUnblockLoading: false,
        labAssistantBlockUnblockSuccess: false,
        labAssistantBlockUnblockError: false,
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

    const titleComponent = screen.getByText(/Add New Lab Assistant/i);
    const emailTextField = screen.getByRole('textbox', {
      name: /email/i,
    });
    const labSelectField = screen.getByText(/Laboratory/i);
    const submitButton = screen.getByRole('button', {
      name: /Register Lab Assistant/i,
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
      name: /Register Lab Assistant/i,
    });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(mockGetLabs);
    expect(store.dispatch).toHaveBeenCalledWith(mockAdd);
  });
  it('should render success and error messages as expected', () => {
    store = mockStore({
      adminLabAssistants: {
        labAssistants: [labAssistant],
        isLabAssistantsLoading: false,
        isLabAssistantsError: false,
        newLabAssistantLoading: false,
        newLabAssistantError: true,
        newLabAssistantSuccess: true,
        reloadLabAssistants: false,
        labAssistantBlockUnblockLoading: false,
        labAssistantBlockUnblockSuccess: false,
        labAssistantBlockUnblockError: false,
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
      /Failed to add new Lab Assistant. Make sure all fields are filled and that email is not a duplicate./i,
    );
    const successComponent = screen.getByText(
      /Successfully added new labAssistant./i,
    );
    const labsFailComponent = screen.getByText(/Failed to load labs/i);
    expect(errorComponent).toBeInTheDocument();
    expect(successComponent).toBeInTheDocument();
    expect(labsFailComponent).toBeInTheDocument();
  });
  it('should render loading widget as expected', () => {
    store = mockStore({
      adminLabAssistants: {
        labAssistants: [labAssistant],
        isLabAssistantsLoading: false,
        isLabAssistantsError: false,
        newLabAssistantLoading: true,
        newLabAssistantError: false,
        newLabAssistantSuccess: false,
        reloadLabAssistants: false,
        labAssistantBlockUnblockLoading: false,
        labAssistantBlockUnblockSuccess: false,
        labAssistantBlockUnblockError: false,
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
