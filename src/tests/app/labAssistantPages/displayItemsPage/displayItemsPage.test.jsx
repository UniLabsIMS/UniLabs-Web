import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import { displayItemResponseData } from '../../../data/displayItemResponseData';
import DisplayItem from '../../../../models/display_item';
import { loggedInLabAssistant } from '../../../data/loggedInUsers';
import LabAssistantDisplayItemsPage from '../../../../app/labAssistantPages/displayItemsPage/displayItemsPage';

const mockStore = configureMockStore([thunk]);
jest.mock('../../../../app/commonComponents/breadCrumbsWrapper', () => ({
  __esModule: true,
  default: () => <div>Breadcrumbs</div>,
}));
jest.mock(
  '../../../../app/labAssistantPages/displayItemsPage/components/displayItemsCard',
  () => ({
    __esModule: true,
    default: () => <div>DisplayItemCard</div>,
  }),
);
const mockFetch = jest.fn();
const mockResetFunctions = jest.fn();
jest.mock(
  '../../../../store/actions/labAssistant/labAssistantDisplayItemsActions',
  () => ({
    fetchLabAssistantDisplayItems: () => mockFetch,
    resetLabAssistantDisplayItemsPageState: () => mockResetFunctions,
  }),
);
describe('Lab Assistant - Display Items Page', () => {
  let store;
  const displayItemOne = new DisplayItem(displayItemResponseData);
  const displayItemTwo = new DisplayItem(displayItemResponseData);

  beforeEach(() => {
    store = mockStore({
      labAssistantDisplayItems: {
        displayItems: [displayItemOne, displayItemTwo],
        isDisplayItemsLoading: false,
        isDisplayItemsError: false,
        reloadDisplayItems: false,
      },
      auth: {
        user: loggedInLabAssistant,
      },
    });
  });

  it('should initially render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LabAssistantDisplayItemsPage />
        </BrowserRouter>
      </Provider>,
    );

    const titleComponent = screen.getByText(/Display Items/i);
    const breadcrumbsComponent = screen.getByText(/Breadcrumbs/i);
    const cardComponents = screen.getAllByText(/DisplayItemCard/i);
    expect(titleComponent).toBeInTheDocument();
    expect(breadcrumbsComponent).toBeInTheDocument();
    expect(cardComponents.length).toBe(2);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
