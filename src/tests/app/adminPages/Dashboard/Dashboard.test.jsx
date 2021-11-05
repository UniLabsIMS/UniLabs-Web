import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import mockAxios from 'axios';
import AdminDashboard from '../../../../app/adminPages/Dashboard/Dashboard';
import { loggedInAdmin } from '../../../data/loggedInUsers';

const mockStore = configureMockStore([thunk]);
// mock nested components
jest.mock('../../../../app/adminPages/Dashboard/Students/Students', () => ({
  __esModule: true,
  default: () => <div>StudentTable</div>,
}));
describe('Admin - Dashboard', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: loggedInAdmin,
      },
    });

    mockAxios.get.mockImplementationOnce(() => Promise.resolve({}));
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AdminDashboard />
        </BrowserRouter>
      </Provider>,
    );
    const categoriesComponent = screen.getByText(/StudentTable/i);
    expect(categoriesComponent).toBeInTheDocument();
  });
});
