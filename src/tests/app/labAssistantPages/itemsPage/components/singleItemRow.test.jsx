import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Table, TableBody } from '@material-ui/core';
import { itemResponseData } from '../../../../data/itemResponseData';
import Item from '../../../../../models/item';
import { loggedInLabAssistant } from '../../../../data/loggedInUsers';
import 'intersection-observer';
import SingleItemRow from '../../../../../app/labAssistantPages/itemsPage/components/singleItemRow';

const mockStore = configureMockStore([thunk]);
jest.mock('react-component-export-image', () => ({
  exportComponentAsPNG: () => <div>Export</div>,
}));
describe('Lab Assistant - Item Row', () => {
  let store;
  const itemOne = new Item(itemResponseData);
  const itemTwo = new Item(itemResponseData);

  beforeEach(() => {
    store = mockStore({
      labAssistantItems: {
        items: [itemOne, itemTwo],
        isItemsLoading: false,
        isItemsError: false,
        newItemLoading: false,
        newItemError: false,
        newItemSuccess: false,
        newItemID: null,
        deleteItemLoading: false,
        deleteItemSuccess: false,
        deleteItemError: false,
        reloadItems: false,
      },
      auth: {
        user: loggedInLabAssistant,
      },
    });
  });

  it('should render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Table>
            <TableBody>
              <SingleItemRow item={itemOne} />
            </TableBody>
          </Table>
        </BrowserRouter>
      </Provider>,
    );
    const nameComponent = screen.getByText(itemOne.id);
    const stateComponent = screen.getByText(itemOne.state);
    const dateComponent = screen.getByText(
      itemOne.addedOn.toString().slice(0, 10),
    );
    const downloadButton = screen.getByRole('button', {
      name: /Download/i,
    });
    const deleteButton = screen.getByRole('button', {
      name: /Delete Item/i,
    });
    expect(nameComponent).toBeInTheDocument();
    expect(stateComponent).toBeInTheDocument();
    expect(dateComponent).toBeInTheDocument();
    expect(downloadButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
});
