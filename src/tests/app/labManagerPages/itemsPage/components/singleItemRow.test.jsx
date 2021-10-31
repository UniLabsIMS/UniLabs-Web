import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { itemResponseData } from '../../../../data/itemResponseData';
import Item from '../../../../../models/item';
import { loggedInLabManager } from '../../../../data/loggedInUsers';
import 'intersection-observer';
import SingleItemRow from '../../../../../app/labManagerPages/itemsPage/components/singleItemRow';

const mockStore = configureMockStore([thunk]);
jest.mock('react-component-export-image', () => ({
  exportComponentAsPNG: () => <div>Export</div>,
}));

describe('Lab Manager - Item Row', () => {
  let store;
  const itemOne = new Item(itemResponseData);
  const itemTwo = new Item(itemResponseData);

  beforeEach(() => {
    store = mockStore({
      labManagerItems: {
        items: [itemOne, itemTwo],
        isItemsLoading: false,
        isItemsError: false,
        newItemLoading: false,
        newItemError: false,
        newItemSuccess: false,
        newItemID: null,
        deleteItemLoading: false,
        deleteItemSucess: false,
        deleteItemError: false,
        reloadItems: false,
      },
      auth: {
        user: loggedInLabManager,
      },
    });
  });

  it('should render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Paper>
            <TableContainer>
              <Table stickyHeader size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Item ID</TableCell>
                    <TableCell align="center">State</TableCell>
                    <TableCell align="center">Added On</TableCell>
                    <TableCell align="center">Download Barcode</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <SingleItemRow item={itemOne} />
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
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
