import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { loggedInAdmin } from '../../../../data/loggedInUsers';
import LabAssistant from '../../../../../models/labAssistant';
import { labAssistantResponseData } from '../../../../data/labAssistantResponseData';
import LabAssistantTable from '../../../../../app/adminPages/Dashboard/LabAssistants/LabAssistants';

const mockStore = configureMockStore([thunk]);
// mock nested components
jest.mock(
  '../../../../../app/adminPages/Dashboard/LabAssistants/components/assistantRegistrationForm',
  () => ({
    __esModule: true,
    default: () => <div>NewLabAssistantForm</div>,
  }),
);
const mockFetch = jest.fn();
const mockResetFunctions = jest.fn();
jest.mock(
  '../../../../../store/actions/admin/adminLabAssistantsActions',
  () => ({
    fetchLabAssistants: () => mockFetch,
    resetAdminLabAssistantState: () => mockResetFunctions,
  }),
);
jest.mock('../../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));

describe('Admin Dashboard -  Lab Assistants', () => {
  let store;
  const labAssistant = new LabAssistant(labAssistantResponseData);

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
      auth: {
        user: loggedInAdmin,
      },
    });
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LabAssistantTable />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText('Lab Assistants');
    const newUserComponent = screen.getByText(/NewLabAssistantForm/i);
    expect(titleComponent).toBeInTheDocument();
    expect(newUserComponent).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should display loading widget when loading is true', () => {
    store = mockStore({
      adminLabAssistants: {
        labAssistants: [labAssistant],
        isLabAssistantsLoading: true,
        isLabAssistantsError: false,
        newLabAssistantLoading: false,
        newLabAssistantError: false,
        newLabAssistantSuccess: false,
        reloadLabAssistants: false,
        labAssistantBlockUnblockLoading: false,
        labAssistantBlockUnblockSuccess: false,
        labAssistantBlockUnblockError: false,
      },
      auth: {
        user: loggedInAdmin,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LabAssistantTable />
        </BrowserRouter>
      </Provider>,
    );

    const loadingComponent = screen.getByText(/Loading/i);
    expect(loadingComponent).toBeInTheDocument();
  });
  it('should display error message when loading fails', () => {
    store = mockStore({
      adminLabAssistants: {
        labAssistants: [labAssistant],
        isLabAssistantsLoading: false,
        isLabAssistantsError: true,
        newLabAssistantLoading: false,
        newLabAssistantError: false,
        newLabAssistantSuccess: false,
        reloadLabAssistants: false,
        labAssistantBlockUnblockLoading: false,
        labAssistantBlockUnblockSuccess: false,
        labAssistantBlockUnblockError: false,
      },
      auth: {
        user: loggedInAdmin,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LabAssistantTable />
        </BrowserRouter>
      </Provider>,
    );

    const errorMessageComponent = screen.getByText(
      /Failed to load labAssistants/i,
    );
    expect(errorMessageComponent).toBeInTheDocument();
  });
});
