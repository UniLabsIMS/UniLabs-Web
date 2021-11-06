import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { lecturerRequestResponseData } from '../../../data/lecturerRequestResponseData';

import { loggedInLecturer } from '../../../data/loggedInUsers';
import LecturerRequestViewPage from '../../../../app/lecturerPages/RequestPage/RequestView';
import LecturerRequest from '../../../../models/lecturerRequest';

const mockStore = configureMockStore([thunk]);
// mock nested components

jest.mock('../../../../app/commonComponents/breadCrumbsWrapper', () => ({
  __esModule: true,
  default: () => <div>Breadcrumbs</div>,
}));
jest.mock('../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));
jest.mock(
  '../../../../app/lecturerPages/RequestPage/components/DisplayItemCard',
  () => ({
    __esModule: true,
    default: () => <div>RequestedItemCard</div>,
  }),
);
const mockFetch = jest.fn();
const mockApproveOrDecline = jest.fn();
jest.mock('../../../../store/actions/lecturer/lecturerRequestActions', () => ({
  fetchLecturerRequest: () => mockFetch,
}));
jest.mock(
  '../../../../store/actions/lecturer/lecturerApproveOrDeclineRequesrActions',
  () => ({
    ApproveorDeclineStudentRequest: () => mockApproveOrDecline,
  }),
);

describe('Lecturer - Request Page', () => {
  let store;
  const request = new LecturerRequest(lecturerRequestResponseData);

  beforeEach(() => {
    store = mockStore({
      lecturerRequest: {
        request,
        isRequestLoading: false,
        isRequestError: false,
        reloadRequest: false,
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
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LecturerRequestViewPage />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText(/Student Request/i);

    const indexComponent = screen.getByText(
      `Index Number : ${request.studentIndex}`,
    );
    const emailComponent = screen.getByText(`Email : ${request.student.email}`);
    const labComponent = screen.getByText(`Lab : ${request.lab.name}`);
    const depComponent = screen.getByText(
      `Department : ${request.studentDepartment}`,
    );
    const reasonComponent = screen.getByText(`${request.reason}`);
    const breadcrumbsComponent = screen.getByText(/Breadcrumbs/i);
    const acceptButton = screen.getByRole('button', {
      name: 'Accept',
    });
    const declineButton = screen.getByRole('button', {
      name: 'Decline',
    });
    const cardComponents = screen.getAllByText('RequestedItemCard');
    expect(titleComponent).toBeInTheDocument();
    expect(indexComponent).toBeInTheDocument();
    expect(emailComponent).toBeInTheDocument();
    expect(labComponent).toBeInTheDocument();
    expect(depComponent).toBeInTheDocument();
    expect(reasonComponent).toBeInTheDocument();
    expect(breadcrumbsComponent).toBeInTheDocument();
    expect(acceptButton).toBeInTheDocument();
    expect(declineButton).toBeInTheDocument();
    expect(cardComponents.length).toBe(2);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should show loading widget when loading is true', () => {
    store = mockStore({
      lecturerRequest: {
        request,
        isRequestLoading: true,
        isRequestError: false,
        reloadRequest: false,
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
          <LecturerRequestViewPage />
        </BrowserRouter>
      </Provider>,
    );

    const loadingComponent = screen.getByText(/Loading/i);
    expect(loadingComponent).toBeInTheDocument();
  });

  it('should show appropriate error messages when faliures occcur', () => {
    store = mockStore({
      lecturerRequest: {
        request,
        isRequestLoading: false,
        isRequestError: true,
        reloadRequest: false,
      },
      lecturerApproveOrDeclineRequest: {
        isApprovalOrDeclineLoading: false,
        isApprovalOrDeclineSuccess: false,
        isApprovalOrDeclineError: true,
      },
      auth: {
        user: loggedInLecturer,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LecturerRequestViewPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(
      screen.getByText(/Failed to approve of decline the request/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Failed to load display items/i),
    ).toBeInTheDocument();
  });
  it('should handle approve as expected', () => {
    store = mockStore({
      lecturerRequest: {
        request,
        isRequestLoading: false,
        isRequestError: false,
        reloadRequest: false,
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
          <LecturerRequestViewPage />
        </BrowserRouter>
      </Provider>,
    );

    const acceptButton = screen.getByRole('button', {
      name: 'Accept',
    });
    fireEvent.click(acceptButton);
    expect(mockApproveOrDecline).toHaveBeenCalledTimes(1);
  });
  it('should handle decline as expected', () => {
    store = mockStore({
      lecturerRequest: {
        request,
        isRequestLoading: false,
        isRequestError: false,
        reloadRequest: false,
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
          <LecturerRequestViewPage />
        </BrowserRouter>
      </Provider>,
    );

    const declineButton = screen.getByRole('button', {
      name: 'Decline',
    });
    fireEvent.click(declineButton);
    expect(mockApproveOrDecline).toHaveBeenCalledTimes(1);
  });
});
