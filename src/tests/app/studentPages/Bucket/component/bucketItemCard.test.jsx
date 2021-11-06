import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { displayItemResponseData } from '../../../../data/displayItemResponseData';
import DisplayItem from '../../../../../models/display_item';
import BucketItem from '../../../../../models/bucketItem';
import 'intersection-observer';
import BucketItemCard from '../../../../../app/studentPages/Bucket/components/BucketItemCard';

const mockStore = configureMockStore([thunk]);

describe('Lab Assistant - Display Item Card', () => {
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
    });
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BucketItemCard bucketItem={bucketItem} />
        </BrowserRouter>
      </Provider>,
    );
    const nameComponent = screen.getByText(bucketItem.name);
    const descComponent = screen.getByText(bucketItem.description);
    const upButton = screen.getByRole('button', {
      name: '+',
    });
    const downButton = screen.getByRole('button', {
      name: '-',
    });
    const quantity = screen.getByText('03');
    expect(nameComponent).toBeInTheDocument();
    expect(descComponent).toBeInTheDocument();
    expect(upButton).toBeInTheDocument();
    expect(downButton).toBeInTheDocument();
    expect(quantity).toBeInTheDocument();
  });
  it('should handle increase quantity as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BucketItemCard bucketItem={bucketItem} />
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
    const quantity = screen.getByText('04');
    expect(upButton).toBeInTheDocument();
    expect(downButton).toBeInTheDocument();
    expect(quantity).toBeInTheDocument();
  });

  it('should handle decrease quantity as expected', () => {
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
          <BucketItemCard bucketItem={bucketItem} />
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
    const quantity = screen.getByText('02');
    expect(upButton).toBeInTheDocument();
    expect(downButton).toBeInTheDocument();
    expect(quantity).toBeInTheDocument();
  });
  it('should handle quantity zero as expected', () => {
    bucketItem.quantity = 0;
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
          <BucketItemCard bucketItem={bucketItem} />
        </BrowserRouter>
      </Provider>,
    );
    const addButton = screen.getByRole('button', {
      name: 'Add to Bucket',
    });
    expect(addButton).toBeInTheDocument();
  });
});
