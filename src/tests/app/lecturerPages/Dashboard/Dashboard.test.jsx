import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { loggedInLecturer } from '../../../data/loggedInUsers';
import LecturerDashboard from '../../../../app/lecturerPages/Dashboard/Dashboard';

const mockStore = configureMockStore([thunk]);
// mock nested components
jest.mock(
  '../../../../app/lecturerPages/Dashboard/StudentRequests/StudentRequests',
  () => ({
    __esModule: true,
    default: () => <div>StudentRequests</div>,
  }),
);

describe('Lecturer - Dashboard', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: loggedInLecturer,
      },
    });
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LecturerDashboard />
        </BrowserRouter>
      </Provider>,
    );
    const labsComponent = screen.getByText(/StudentRequests/i);
    expect(labsComponent).toBeInTheDocument();
  });
});
