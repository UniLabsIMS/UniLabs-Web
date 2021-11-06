import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { displayItemResponseData } from '../../../../data/displayItemResponseData';
import DisplayItem from '../../../../../models/display_item';
import BucketItem from '../../../../../models/bucketItem';
import 'intersection-observer';
import BucketRequestForm from '../../../../../app/studentPages/Bucket/components/BucketRequestForm';
import { loggedInStudent } from '../../../../data/loggedInUsers';

const mockStore = configureMockStore([thunk]);

const mockAdd = jest.fn();
jest.mock('../../../../../store/actions/student/studentBucketActions', () => ({
  addRequest: () => mockAdd,
}));

jest.mock('../../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));

describe('Student - New Request Form', () => {
  let store;
  const displayItem = new DisplayItem(displayItemResponseData);
  displayItem.name = 'Test name';
  const bucketItem = new BucketItem(displayItem);
  bucketItem.quantity = 3;

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
    store.dispatch = jest.fn();
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BucketRequestForm bucketItems={[bucketItem]} />
        </BrowserRouter>
      </Provider>,
    );

    const reasonTextField = screen.getByRole('textbox', {
      id: /reason/i,
    });
    const submitButton = screen.getByRole('button', {
      name: /Place Request/i,
    });
    expect(reasonTextField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  it('should handles edits as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BucketRequestForm bucketItems={[bucketItem]} />
        </BrowserRouter>
      </Provider>,
    );
    const reasonTextField = screen.getByRole('textbox', {
      id: /reason/i,
    });
    fireEvent.change(reasonTextField, { target: { value: 'lorem' } });
    expect(reasonTextField.value).toBe('lorem');
  });
  it('should subimmision as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BucketRequestForm bucketItems={[bucketItem]} />
        </BrowserRouter>
      </Provider>,
    );
    const submitButton = screen.getByRole('button', {
      name: /Place Request/i,
    });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(mockAdd);
  });
  it('should render warning messages as expected', () => {
    store = mockStore({
      studentLabBucket: {
        bucketItems: [bucketItem],
        lecturers: [],
        isActiveRequestForLab: true,
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
          <BucketRequestForm bucketItems={[bucketItem]} />
        </BrowserRouter>
      </Provider>,
    );
    const warningComponent = screen.getByText(
      /You already have one pending request for this lab./i,
    );

    expect(warningComponent).toBeInTheDocument();
  });
});
