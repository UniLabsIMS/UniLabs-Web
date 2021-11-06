import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { loggedInLecturer } from '../../../../data/loggedInUsers';
import LecturerRequest from '../../../../../models/lecturerRequest';
import { lecturerRequestResponseData } from '../../../../data/lecturerRequestResponseData';

import StudentRequestsPage from '../../../../../app/lecturerPages/Dashboard/StudentRequests/StudentRequests';

const mockStore = configureMockStore([thunk]);

jest.mock(
  '../../../../../app/lecturerPages/Dashboard/StudentRequests/components/StudentRequestCard',
  () => ({
    __esModule: true,
    default: () => <div>StudentRequestCard</div>,
  }),
);
jest.mock('../../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));
const mockFetch = jest.fn();
jest.mock(
  '../../../../../store/actions/lecturer/lecturerRequestsActions',
  () => ({
    fetchLecturerRequests: () => mockFetch,
  }),
);
jest.mock(
  '../../../../../store/actions/lecturer/lecturerApproveOrDeclineRequesrActions',
  () => ({
    resetApproveorDeclineState: () => jest.fn(),
  }),
);

describe('Lecturer - New Requests Section', () => {
  let store;
  const request = new LecturerRequest(lecturerRequestResponseData);
  const request2 = new LecturerRequest(lecturerRequestResponseData);
  request2.id = `${request.id}df`;
  beforeEach(() => {
    store = mockStore({
      lecturerRequests: {
        requests: [request, request2],
        isRequestsLoading: false,
        isRequestsError: false,
        reloadRequests: false,
      },
      lecturerApproveOrDeclineRequest: {
        isApprovalOrDeclineLoading: false,
        isApprovalOrDeclineSuccess: false,
        isApprovalOrDeclineError: false,
      },
      auth: {
        user: loggedInLecturer,
      },
    });
    store.dispatch = jest.fn();
  });

  it('should render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentRequestsPage />
        </BrowserRouter>
      </Provider>,
    );
    const titleComponent = screen.getByText(/New Requests/i);
    const filterComponent = screen.getByText(/Filter by Lab/i);
    const reqComponents = screen.getAllByText(/StudentRequestCard/i);
    expect(titleComponent).toBeInTheDocument();
    expect(filterComponent).toBeInTheDocument();
    expect(reqComponents.length).toBe(2);
    expect(store.dispatch).toBeCalledTimes(1);
    expect(store.dispatch).toBeCalledWith(mockFetch);
  });

  it('should show loading indicator when loading', () => {
    store = mockStore({
      lecturerRequests: {
        requests: [request],
        isRequestsLoading: true,
        isRequestsError: false,
        reloadRequests: false,
      },
      lecturerApproveOrDeclineRequest: {
        isApprovalOrDeclineLoading: false,
        isApprovalOrDeclineSuccess: false,
        isApprovalOrDeclineError: false,
      },
      auth: {
        user: loggedInLecturer,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentRequestsPage />
        </BrowserRouter>
      </Provider>,
    );
    const loadingComponent = screen.getByText(/Loading/i);
    expect(loadingComponent).toBeInTheDocument();
  });
  it('should show error message in faliure to load', () => {
    store = mockStore({
      lecturerRequests: {
        requests: [request],
        isRequestsLoading: false,
        isRequestsError: true,
        reloadRequests: false,
      },
      lecturerApproveOrDeclineRequest: {
        isApprovalOrDeclineLoading: false,
        isApprovalOrDeclineSuccess: false,
        isApprovalOrDeclineError: false,
      },
      auth: {
        user: loggedInLecturer,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentRequestsPage />
        </BrowserRouter>
      </Provider>,
    );
    const errComponent = screen.getByText(/Failed to load requests/i);
    expect(errComponent).toBeInTheDocument();
  });
  it('should show warning message when no requests', () => {
    store = mockStore({
      lecturerRequests: {
        requests: [],
        isRequestsLoading: false,
        isRequestsError: false,
        reloadRequests: false,
      },
      lecturerApproveOrDeclineRequest: {
        isApprovalOrDeclineLoading: false,
        isApprovalOrDeclineSuccess: false,
        isApprovalOrDeclineError: false,
      },
      auth: {
        user: loggedInLecturer,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentRequestsPage />
        </BrowserRouter>
      </Provider>,
    );
    const warningComponent = screen.getByText(/No New Requests/i);
    expect(warningComponent).toBeInTheDocument();
  });
  it('should show success messages as needed', () => {
    store = mockStore({
      lecturerRequests: {
        requests: [request],
        isRequestsLoading: false,
        isRequestsError: false,
        reloadRequests: false,
      },
      lecturerApproveOrDeclineRequest: {
        isApprovalOrDeclineLoading: false,
        isApprovalOrDeclineSuccess: true,
        isApprovalOrDeclineError: false,
      },
      auth: {
        user: loggedInLecturer,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentRequestsPage />
        </BrowserRouter>
      </Provider>,
    );
    const successComponent = screen.getByText(
      /Request Approval\/Decline Successful/i,
    );
    expect(successComponent).toBeInTheDocument();
  });
});
