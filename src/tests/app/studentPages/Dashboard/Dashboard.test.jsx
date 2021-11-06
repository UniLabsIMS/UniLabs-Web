import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { loggedInStudent } from '../../../data/loggedInUsers';
import StudentDashboard from '../../../../app/studentPages/Dashboard/Dashboard';

const mockStore = configureMockStore([thunk]);
// mock nested components
jest.mock('../../../../app/studentPages/Dashboard/Labs/Labs', () => ({
  __esModule: true,
  default: () => <div>Labs</div>,
}));
describe('Student - Dashboard', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: loggedInStudent,
      },
    });
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentDashboard />
        </BrowserRouter>
      </Provider>,
    );
    const labsComponent = screen.getByText(/Labs/i);
    expect(labsComponent).toBeInTheDocument();
  });
});
