import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import mockAxios from 'axios';
import { loggedInLabManager } from '../../../../data/loggedInUsers';
import { labReportResponseData } from '../../../../data/labReportResponseData';
import LabReport from '../../../../../models/labReport';
import LabSummary from '../../../../../app/labManagerPages/Dashboard/LabSummary/labSummary';

const mockStore = configureMockStore([thunk]);
// mock nested components
jest.mock(
  '../../../../../app/labManagerPages/Dashboard/LabSummary/components/itemSummary',
  () => ({
    __esModule: true,
    default: () => <div>Item Summary</div>,
  }),
);
jest.mock(
  '../../../../../app/labManagerPages/Dashboard/LabSummary/components/countCard',
  () => ({
    __esModule: true,
    default: () => <div>Count Card</div>,
  }),
);
jest.mock('../../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));
describe('Lab Manager - Lab Report', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      labManagerLabReport: {
        labReport: new LabReport(labReportResponseData),
        islabReportLoading: false,
        labReportError: false,
        labReportSuccess: false,
      },
      auth: {
        user: loggedInLabManager,
      },
    });

    mockAxios.get.mockImplementationOnce(() => Promise.resolve({}));
  });

  it('should render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LabSummary />
        </BrowserRouter>
      </Provider>,
    );
    const titleComponent = screen.getByText(/Lab Summary/i);
    const itemSummaryComponent = screen.getByText(/Item Summary/i);
    const countCards = screen.getAllByText(/Count Card/i);
    expect(titleComponent).toBeInTheDocument();
    expect(itemSummaryComponent).toBeInTheDocument();
    expect(countCards.length).toBe(6);
  });

  it('should show loading indicator when categories are loading', () => {
    store = mockStore({
      labManagerLabReport: {
        labReport: null,
        islabReportLoading: true,
        labReportError: false,
        labReportSuccess: false,
      },
      auth: {
        user: loggedInLabManager,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LabSummary />
        </BrowserRouter>
      </Provider>,
    );
    const loadingComponent = screen.getByText(/Loading/i);
    expect(loadingComponent).toBeInTheDocument();
  });
});
