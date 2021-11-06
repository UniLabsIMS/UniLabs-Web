import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { loggedInStudent } from '../../../../data/loggedInUsers';
import Lab from '../../../../../models/lab';
import Department from '../../../../../models/department';
import { labResponseData } from '../../../../data/labResponseData';
import { departmentResponseData } from '../../../../data/departmentResponseData';
import Labs from '../../../../../app/studentPages/Dashboard/Labs/Labs';

const mockStore = configureMockStore([thunk]);

jest.mock(
  '../../../../../app/studentPages/Dashboard/Labs/components/labCard',
  () => ({
    __esModule: true,
    default: () => <div>Lab Card</div>,
  }),
);
jest.mock('../../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));
const mockFetch = jest.fn();
jest.mock('../../../../../store/actions/student/studentLabsActions', () => ({
  fetchLabsStudent: () => mockFetch,
}));
describe('Student - Labs', () => {
  let store;
  const lab = new Lab(labResponseData);
  const dep = new Department(departmentResponseData);
  beforeEach(() => {
    store = mockStore({
      studentLabs: {
        labs: [lab],
        departments: [dep],
        isLabsLoading: false,
        isLabsError: false,
        reloadLabs: false,
      },
      auth: {
        user: loggedInStudent,
      },
    });
    store.dispatch = jest.fn();
  });

  it('should render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Labs />
        </BrowserRouter>
      </Provider>,
    );
    const titleComponent = screen.getByText(/Laboratories/i);
    const labCards = screen.getAllByText(/Lab Card/i);
    expect(titleComponent).toBeInTheDocument();
    expect(labCards.length).toBe(1);
    expect(store.dispatch).toBeCalledTimes(1);
    expect(store.dispatch).toBeCalledWith(mockFetch);
  });

  it('should show loading indicator when labs are loading', () => {
    store = mockStore({
      studentLabs: {
        labs: [],
        departments: [],
        isLabsLoading: true,
        isLabsError: false,
        reloadLabs: false,
      },
      auth: {
        user: loggedInStudent,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Labs />
        </BrowserRouter>
      </Provider>,
    );
    const loadingComponent = screen.getByText(/Loading/i);
    expect(loadingComponent).toBeInTheDocument();
  });
  it('should show error message when labs fail to load', () => {
    store = mockStore({
      studentLabs: {
        labs: [],
        departments: [],
        isLabsLoading: true,
        isLabsError: true,
        reloadLabs: false,
      },
      auth: {
        user: loggedInStudent,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Labs />
        </BrowserRouter>
      </Provider>,
    );
    const errComponent = screen.getByText(/Failed to load labs/i);
    expect(errComponent).toBeInTheDocument();
  });
});
