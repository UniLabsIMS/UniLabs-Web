import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LabReport from '../../../../../../models/labReport';
import { labReportResponseData } from '../../../../../data/labReportResponseData';
import 'intersection-observer';
import { loggedInLabManager } from '../../../../../data/loggedInUsers';
import ItemSummary from '../../../../../../app/labManagerPages/Dashboard/LabSummary/components/itemSummary';

const mockStore = configureMockStore([thunk]);
jest.mock(
  '../../../../../../app/labManagerPages/Dashboard/LabSummary/components/countCard',
  () => ({
    __esModule: true,
    default: () => <div>Count Card</div>,
  }),
);
describe('Lab Manager - Lab Report Item Summary', () => {
  let store;
  let report;

  beforeEach(() => {
    report = new LabReport(labReportResponseData);
    store = mockStore({
      labManagerLabReport: {
        labReport: report,
        islabReportLoading: false,
        labReportError: false,
        labReportSuccess: false,
      },
      auth: {
        user: loggedInLabManager,
      },
    });
  });

  it('should render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ItemSummary
            totalItems={20}
            availableItems={5}
            damagedItems={5}
            borrowedItems={5}
            tempBorrowedItems={5}
          />
        </BrowserRouter>
      </Provider>,
    );
    const titleComponent = screen.getByText('Item Summary');
    const barChartComponent = screen.getByText('Item Summary Bar Chart');
    const countCards = screen.getAllByText(/Count Card/i);
    expect(titleComponent).toBeInTheDocument();
    expect(barChartComponent).toBeInTheDocument();
    expect(titleComponent).toBeInTheDocument();
    expect(countCards.length).toBe(5);
  });
});
