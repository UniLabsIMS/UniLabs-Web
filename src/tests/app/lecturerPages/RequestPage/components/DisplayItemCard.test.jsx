import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import DisplayItemsCard from '../../../../../app/lecturerPages/RequestPage/components/DisplayItemCard';
import { lecturerRequestResponseData } from '../../../../data/lecturerRequestResponseData';
import LecturerRequest from '../../../../../models/lecturerRequest';

const mockStore = configureMockStore([thunk]);

describe('Lecturer - Display Item Card', () => {
  let store;
  const request = new LecturerRequest(lecturerRequestResponseData);
  const reqItem = request.requestedDisplayItems[0];

  beforeEach(() => {
    store = mockStore({});
  });

  it('should render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DisplayItemsCard reqItem={reqItem} />
        </BrowserRouter>
      </Provider>,
    );
    const nameComponent = screen.getByText(reqItem.displayItem.name);
    const reqQuantityComponent = screen.getByText(
      `Quantity Requested: 0${reqItem.quantity}`,
    );
    const totalQuantityComponent = screen.getByText(
      `Total in Lab: 0${reqItem.displayItem.itemCount}`,
    );

    expect(nameComponent).toBeInTheDocument();
    expect(reqQuantityComponent).toBeInTheDocument();
    expect(totalQuantityComponent).toBeInTheDocument();
  });
});
