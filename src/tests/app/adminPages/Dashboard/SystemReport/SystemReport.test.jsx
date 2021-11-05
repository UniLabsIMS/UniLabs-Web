import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { loggedInAdmin } from '../../../../data/loggedInUsers';
import SysRep from '../../../../../models/systemReport';
import Lab from '../../../../../models/lab';
import { systemReportResponseData } from '../../../../data/systemReportResopnseData';
import { labResponseData } from '../../../../data/labResponseData';
import SystemReport from '../../../../../app/adminPages/Dashboard/SystemReport/SystemReport';

const mockStore = configureMockStore([thunk]);

const mockFetch = jest.fn();
const mockResetFunctions = jest.fn();
jest.mock(
  '../../../../../store/actions/admin/adminSystemReportActions',
  () => ({
    fetchSystemReport: () => mockFetch,
    resetSystemReportState: () => mockResetFunctions,
  }),
);
jest.mock('../../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));
jest.mock(
  '../../../../../app/adminPages/Dashboard/SystemReport/components/UserSummary',
  () => ({
    __esModule: true,
    default: () => <div>UserSummary</div>,
  }),
);
jest.mock(
  '../../../../../app/adminPages/Dashboard/SystemReport/components/ItemSummary',
  () => ({
    __esModule: true,
    default: () => <div>ItemSummary</div>,
  }),
);
jest.mock(
  '../../../../../app/adminPages/Dashboard/SystemReport/components/LabSummary',
  () => ({
    __esModule: true,
    default: () => <div>LabSummary</div>,
  }),
);
describe('Admin Dashboard -  System Report', () => {
  let store;
  const lab = new Lab(labResponseData);
  const sysReport = new SysRep(systemReportResponseData);

  beforeEach(() => {
    store = mockStore({
      adminSystemReport: {
        systemReport: null,
        labReport: null,
        labs: [lab],
        isSystemReportLoading: false,
        systemReportSuccess: false,
        systemReportError: false,
        isLabReportLoading: false,
        labReportSuccess: false,
        labReportError: false,
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
          <SystemReport />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText('System Report');
    const loadingComponent = screen.getByText(/Loading/i);
    expect(titleComponent).toBeInTheDocument();
    expect(loadingComponent).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should render as expected when system report is not null', () => {
    store = mockStore({
      adminSystemReport: {
        systemReport: sysReport,
        labReport: null,
        labs: [lab],
        isSystemReportLoading: false,
        systemReportSuccess: false,
        systemReportError: false,
        isLabReportLoading: false,
        labReportSuccess: false,
        labReportError: false,
      },
      auth: {
        user: loggedInAdmin,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SystemReport />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText('System Report');
    const userSummaryComponent = screen.getByText(/UserSummary/i);
    const itemSummaryComponent = screen.getByText(/ItemSummary/i);
    const labReportTextComponent = screen.getByText(/Lab Summary/i);
    const noLabselectedComponent = screen.getByText(/No lab selected/i);
    const selectTextComponent = screen.getByText(
      /Please Select a Lab to Load the Lab Report/i,
    );
    expect(titleComponent).toBeInTheDocument();
    expect(userSummaryComponent).toBeInTheDocument();
    expect(itemSummaryComponent).toBeInTheDocument();
    expect(labReportTextComponent).toBeInTheDocument();
    expect(selectTextComponent).toBeInTheDocument();
    expect(noLabselectedComponent).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
