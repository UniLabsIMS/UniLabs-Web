import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CountCard from '../../../../../../app/labManagerPages/Dashboard/LabSummary/components/countCard';
import LabReport from '../../../../../../models/labReport';
import { labReportResponseData } from '../../../../../data/labReportResponseData';
import 'intersection-observer';
import { loggedInLabManager } from '../../../../../data/loggedInUsers';

const mockStore = configureMockStore([thunk]);

describe('Lab Manager - Count Card', () => {
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
          <CountCard title="Title" count={3} total={10} showPercentage />
        </BrowserRouter>
      </Provider>,
    );
    const titleComponent = screen.getByText('Title');
    const countComponent = screen.getByText('03');
    const percentageComponent = screen.getByText('Percentage: 30.00%');
    expect(titleComponent).toBeInTheDocument();
    expect(countComponent).toBeInTheDocument();
    expect(percentageComponent).toBeInTheDocument();
  });
});
