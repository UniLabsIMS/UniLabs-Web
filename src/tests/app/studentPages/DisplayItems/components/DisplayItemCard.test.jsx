import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { displayItemResponseData } from '../../../../data/displayItemResponseData';
import DisplayItem from '../../../../../models/display_item';
import BucketItem from '../../../../../models/bucketItem';
import 'intersection-observer';
import DisplayItemCard from '../../../../../app/studentPages/DisplayItems/components/DisplayItemCard';

const mockStore = configureMockStore([thunk]);

describe('Lab Assistant - Display Item Card', () => {
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
    });
  });

  it('should render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DisplayItemCard displayItem={displayItem} />
        </BrowserRouter>
      </Provider>,
    );
    const nameComponent = screen.getByText(displayItem.name);
    const descComponent = screen.getByText(displayItem.description);
    const viewItemsButton = screen.getByRole('button', {
      name: /Add to Bucket/i,
    });
    expect(nameComponent).toBeInTheDocument();
    expect(descComponent).toBeInTheDocument();
    expect(viewItemsButton).toBeInTheDocument();
  });
  it('should handle add to bucket as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DisplayItemCard displayItem={displayItem} />
        </BrowserRouter>
      </Provider>,
    );
    const viewItemsButton = screen.getByRole('button', {
      name: /Add to Bucket/i,
    });
    fireEvent.click(viewItemsButton);
    const upButton = screen.getByRole('button', {
      name: '+',
    });
    const downButton = screen.getByRole('button', {
      name: '-',
    });
    const quantity = screen.getByText('01');
    expect(upButton).toBeInTheDocument();
    expect(downButton).toBeInTheDocument();
    expect(quantity).toBeInTheDocument();
  });
  it('should handle increase quantity as expected', () => {
    bucketItem.quantity = 2;
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
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DisplayItemCard displayItem={displayItem} />
        </BrowserRouter>
      </Provider>,
    );
    const upButton = screen.getByRole('button', {
      name: '+',
    });
    fireEvent.click(upButton);
    const downButton = screen.getByRole('button', {
      name: '-',
    });
    const quantity = screen.getByText('03');
    expect(upButton).toBeInTheDocument();
    expect(downButton).toBeInTheDocument();
    expect(quantity).toBeInTheDocument();
  });
  it('should handle decrease quantity as expected', () => {
    bucketItem.quantity = 2;
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
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DisplayItemCard displayItem={displayItem} />
        </BrowserRouter>
      </Provider>,
    );
    const downButton = screen.getByRole('button', {
      name: '-',
    });

    fireEvent.click(downButton);
    const upButton = screen.getByRole('button', {
      name: '+',
    });
    const quantity = screen.getByText('01');
    expect(upButton).toBeInTheDocument();
    expect(downButton).toBeInTheDocument();
    expect(quantity).toBeInTheDocument();
  });
});
