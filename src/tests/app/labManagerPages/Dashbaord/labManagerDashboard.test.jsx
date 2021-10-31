import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import mockAxios from 'axios';
import { labReportResponseData } from '../../../data/labReportResponseData';
import LabReport from '../../../../models/labReport';
import { loggedInLabManager } from '../../../data/loggedInUsers';
import LabManagerDashboard from '../../../../app/labManagerPages/Dashboard/labMangerDashboard';

const mockStore = configureMockStore([thunk]);
// mock nested components
jest.mock(
  '../../../../app/labManagerPages/Dashboard/ItemCategories/itemCategories',
  () => ({
    __esModule: true,
    default: () => <div>ItemCategories</div>,
  }),
);
describe('Lab Manager - Dashboard', () => {
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

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LabManagerDashboard />
        </BrowserRouter>
      </Provider>,
    );
    const categoriesComponent = screen.getByText(/ItemCategories/i);
    expect(categoriesComponent).toBeInTheDocument();
  });
});
