import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { displayItemResponseData } from '../../../data/displayItemResponseData';
import DisplayItem from '../../../../models/display_item';
import { loggedInLabManager } from '../../../data/loggedInUsers';
import LabManagerDisplayItemsPage from '../../../../app/labManagerPages/displayItemsPage/dispalyItemsPage';

const mockStore = configureMockStore([thunk]);
// mock nested components
jest.mock(
  '../../../../app/labManagerPages/displayItemsPage/components/newDisplayItemForm',
  () => ({
    __esModule: true,
    default: () => <div>NewDisplayItem</div>,
  }),
);
jest.mock('../../../../app/commonComponents/breadCrumbsWrapper', () => ({
  __esModule: true,
  default: () => <div>Breadcrumbs</div>,
}));
jest.mock(
  '../../../../app/labManagerPages/displayItemsPage/components/displayItemsCard',
  () => ({
    __esModule: true,
    default: () => <div>DisplayItemCard</div>,
  }),
);
const mockFetch = jest.fn();
const mockResetFunctions = jest.fn();
jest.mock(
  '../../../../store/actions/labManager/labManagerDisplayItemsActions',
  () => ({
    fetchDisplayItems: () => mockFetch,
    resetDisplayItemsPageState: () => mockResetFunctions,
  }),
);
describe('Lab Manager - Display Items Page', () => {
  let store;
  const displayItemOne = new DisplayItem(displayItemResponseData);
  const displayItemTwo = new DisplayItem(displayItemResponseData);

  beforeEach(() => {
    store = mockStore({
      labManagerDisplayItems: {
        displayItems: [displayItemOne, displayItemTwo],
        isDisplayItemsLoading: false,
        isDisplayItemsError: false,
        newDisplayItemLoading: false,
        newDisplayItemError: false,
        newDisplayItemSuccess: false,
        editDisplayItemLoading: false,
        editDisplayItemError: false,
        editDisplayItemSuccess: false,
        reloadDisplayItems: false,
      },
      auth: {
        user: loggedInLabManager,
      },
    });
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LabManagerDisplayItemsPage />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText(/Display Items/i);
    const newDspItemComponent = screen.getByText(/NewDisplayItem/i);
    const breadcrumbsComponent = screen.getByText(/Breadcrumbs/i);
    const cardComponents = screen.getAllByText(/DisplayItemCard/i);
    expect(titleComponent).toBeInTheDocument();
    expect(newDspItemComponent).toBeInTheDocument();
    expect(breadcrumbsComponent).toBeInTheDocument();
    expect(cardComponents.length).toBe(2);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
