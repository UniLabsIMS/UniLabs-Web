import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import LabBucketEntranceCard from '../../../app/commonComponents/labBucketEntranceCard';

const mockStore = configureMockStore([thunk]);

describe('Lab Bucket Entrance Card Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      studentLabBucket: {
        quantityChangeTicker: 0,
        bucketItems: [],
      },
    });
    store.dispatch = jest.fn();
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LabBucketEntranceCard labId="xxx" />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Go to Lab Bucket/i)).toBeInTheDocument();
    expect(screen.getByText(/00 Items in the Bucket./i)).toBeInTheDocument();
  });
});
