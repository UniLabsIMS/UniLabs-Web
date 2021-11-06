import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { displayItemResponseData } from '../../../data/displayItemResponseData';
import DisplayItem from '../../../../models/display_item';
import { loggedInStudent } from '../../../data/loggedInUsers';
import StudentDisplayItemsPage from '../../../../app/studentPages/DisplayItems/studentDisplayItemsPage';

const mockStore = configureMockStore([thunk]);
jest.mock('../../../../app/commonComponents/breadCrumbsWrapper', () => ({
  __esModule: true,
  default: () => <div>Breadcrumbs</div>,
}));
jest.mock(
  '../../../../app/studentPages/DisplayItems/components/DisplayItemCard',
  () => ({
    __esModule: true,
    default: () => <div>DisplayItemCard</div>,
  }),
);
const mockFetch = jest.fn();
jest.mock(
  '../../../../store/actions/student/studentDisplayItemsActions',
  () => ({
    fetchDisplayItems: () => mockFetch,
  }),
);
jest.mock('../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));
jest.mock('../../../../app/commonComponents/labBucketEntranceCard', () => ({
  __esModule: true,
  default: () => <div>Lab Bucket Entrance Card</div>,
}));
describe('Student - Display Items Page', () => {
  let store;
  const displayItemOne = new DisplayItem(displayItemResponseData);
  const displayItemTwo = new DisplayItem(displayItemResponseData);
  displayItemTwo.id = 'b946f0b4-958a-4a2a-910a-a783dbc2d9990';
  beforeEach(() => {
    store = mockStore({
      studentDisplayItems: {
        displayItems: [displayItemOne, displayItemTwo],
        isDisplayItemsLoading: false,
        isDisplayItemsError: false,
        reloadDisplayItems: false,
      },
      auth: {
        user: loggedInStudent,
      },
    });
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentDisplayItemsPage />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText('Items');
    const breadcrumbsComponent = screen.getByText(/Breadcrumbs/i);
    const bucketCardComponent = screen.getByText(/Lab Bucket Entrance Card/i);
    const cardComponents = screen.getAllByText(/DisplayItemCard/i);
    expect(titleComponent).toBeInTheDocument();
    expect(bucketCardComponent).toBeInTheDocument();
    expect(breadcrumbsComponent).toBeInTheDocument();
    expect(cardComponents.length).toBe(2);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
  it('should show warning message is no display items are present', () => {
    store = mockStore({
      studentDisplayItems: {
        displayItems: [],
        isDisplayItemsLoading: false,
        isDisplayItemsError: false,
        reloadDisplayItems: false,
      },
      auth: {
        user: loggedInStudent,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentDisplayItemsPage />
        </BrowserRouter>
      </Provider>,
    );

    const warningComponent = screen.getByText(/No Items Available/i);
    expect(warningComponent).toBeInTheDocument();
  });
  it('should show loading widget when loading is true', () => {
    store = mockStore({
      studentDisplayItems: {
        displayItems: [],
        isDisplayItemsLoading: true,
        isDisplayItemsError: false,
        reloadDisplayItems: false,
      },
      auth: {
        user: loggedInStudent,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentDisplayItemsPage />
        </BrowserRouter>
      </Provider>,
    );

    const loadingComponent = screen.getByText(/Loading/i);
    expect(loadingComponent).toBeInTheDocument();
  });
  it('should show error message i display items loading fails', () => {
    store = mockStore({
      studentDisplayItems: {
        displayItems: [],
        isDisplayItemsLoading: false,
        isDisplayItemsError: true,
        reloadDisplayItems: false,
      },
      auth: {
        user: loggedInStudent,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentDisplayItemsPage />
        </BrowserRouter>
      </Provider>,
    );

    const errorComponent = screen.getByText(/Failed to load resources/i);
    expect(errorComponent).toBeInTheDocument();
  });
});
