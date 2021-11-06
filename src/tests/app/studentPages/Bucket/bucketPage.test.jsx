import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { displayItemResponseData } from '../../../data/displayItemResponseData';
import DisplayItem from '../../../../models/display_item';
import BucketItem from '../../../../models/bucketItem';
import BucketPage from '../../../../app/studentPages/Bucket/BucketPage';
import { loggedInStudent } from '../../../data/loggedInUsers';

const mockStore = configureMockStore([thunk]);
// mock nested components
jest.mock(
  '../../../../app/studentPages/Bucket/components/BucketItemCard',
  () => ({
    __esModule: true,
    default: () => <div>BucketItemCard</div>,
  }),
);

jest.mock('../../../../app/commonComponents/breadCrumbsWrapper', () => ({
  __esModule: true,
  default: () => <div>Breadcrumbs</div>,
}));
jest.mock(
  '../../../../app/studentPages/Bucket/components/BucketRequestForm',
  () => ({
    __esModule: true,
    default: () => <div>BucketRequestForm</div>,
  }),
);

const mockFetch = jest.fn();
jest.mock('../../../../store/actions/student/studentBucketActions', () => ({
  fetchLabLecturers: () => mockFetch,
}));

jest.mock('../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));
describe('Student - Bucket Page', () => {
  let store;
  const displayItem = new DisplayItem(displayItemResponseData);
  displayItem.name = 'Test name';
  const bucketItem = new BucketItem(displayItem);
  bucketItem.quantity = 0;

  beforeEach(() => {
    store = mockStore({
      studentLabBucket: {
        bucketItems: [bucketItem],
        lecturers: [],
        isActiveRequestForLab: false,
        quantityChangeTicker: 0,
        isBucketLoading: false,
        bucketLoaded: false,
        bucketError: false,
        isNewRequestLaoding: false,
        newRequestSuccess: false,
        newRequestError: false,
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
          <BucketPage />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText(/My Bucket/i);
    const breadcrumbsComponent = screen.getByText(/Breadcrumbs/i);
    expect(titleComponent).toBeInTheDocument();
    expect(breadcrumbsComponent).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
  it('should show warning message if no bucket items are present', () => {
    store = mockStore({
      studentLabBucket: {
        bucketItems: [],
        lecturers: [],
        isActiveRequestForLab: false,
        quantityChangeTicker: 0,
        isBucketLoading: false,
        bucketLoaded: false,
        bucketError: false,
        isNewRequestLaoding: false,
        newRequestSuccess: false,
        newRequestError: false,
      },
      auth: {
        user: loggedInStudent,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BucketPage />
        </BrowserRouter>
      </Provider>,
    );

    const warningComponent = screen.getByText(
      /No items in the bucket for this lab./i,
    );
    expect(warningComponent).toBeInTheDocument();
  });
  it('should show loading widget when loading is true', () => {
    store = mockStore({
      studentLabBucket: {
        bucketItems: [],
        lecturers: [],
        isActiveRequestForLab: false,
        quantityChangeTicker: 0,
        isBucketLoading: true,
        bucketLoaded: false,
        bucketError: false,
        isNewRequestLaoding: false,
        newRequestSuccess: false,
        newRequestError: false,
      },
      auth: {
        user: loggedInStudent,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BucketPage />
        </BrowserRouter>
      </Provider>,
    );

    const loadingComponent = screen.getByText(/Loading/i);
    expect(loadingComponent).toBeInTheDocument();
  });
  it('should show error message if loading fails', () => {
    store = mockStore({
      studentLabBucket: {
        bucketItems: [],
        lecturers: [],
        isActiveRequestForLab: false,
        quantityChangeTicker: 0,
        isBucketLoading: false,
        bucketLoaded: false,
        bucketError: true,
        isNewRequestLaoding: false,
        newRequestSuccess: false,
        newRequestError: false,
      },
      auth: {
        user: loggedInStudent,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BucketPage />
        </BrowserRouter>
      </Provider>,
    );

    const errorComponent = screen.getByText(/Failed to laod the lab bucket/i);
    expect(errorComponent).toBeInTheDocument();
  });
  it('should show error/success message when new request is failed/successful.', () => {
    store = mockStore({
      studentLabBucket: {
        bucketItems: [],
        lecturers: [],
        isActiveRequestForLab: false,
        quantityChangeTicker: 0,
        isBucketLoading: false,
        bucketLoaded: false,
        bucketError: false,
        isNewRequestLaoding: false,
        newRequestSuccess: true,
        newRequestError: true,
      },
      auth: {
        user: loggedInStudent,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BucketPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(
      screen.getByText(/Successfully added new requests./i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Failed to submit the request. Make sure you have no currenlty pending requests for this lab./i,
      ),
    ).toBeInTheDocument();
  });
});
