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
jest.mock('../../../../app/commonComponents/customLoadingIndicator', () => ({
  __esModule: true,
  default: () => <div>Loading</div>,
}));
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
  it('should show warning message is no display items are present', () => {
    store = mockStore({
      labAssistantDisplayItems: {
        displayItems: [],
        isDisplayItemsLoading: false,
        isDisplayItemsError: false,
        reloadDisplayItems: false,
      },
      auth: {
        user: loggedInLabAssistant,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LabAssistantDisplayItemsPage />
        </BrowserRouter>
      </Provider>,
    );

    const warningComponent = screen.getByText(/No display Items Added/i);
    expect(warningComponent).toBeInTheDocument();
  });
  it('should show loading widget when loading is true', () => {
    store = mockStore({
      labAssistantDisplayItems: {
        displayItems: [],
        isDisplayItemsLoading: true,
        isDisplayItemsError: false,
        reloadDisplayItems: false,
      },
      auth: {
        user: loggedInLabAssistant,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LabAssistantDisplayItemsPage />
        </BrowserRouter>
      </Provider>,
    );

    const loadingComponent = screen.getByText(/Loading/i);
    expect(loadingComponent).toBeInTheDocument();
  });
  it('should show error message i display items loading fails', () => {
    store = mockStore({
      labAssistantDisplayItems: {
        displayItems: [],
        isDisplayItemsLoading: false,
        isDisplayItemsError: true,
        reloadDisplayItems: false,
      },
      auth: {
        user: loggedInLabAssistant,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LabAssistantDisplayItemsPage />
        </BrowserRouter>
      </Provider>,
    );

    const errorComponent = screen.getByText(/Failed to load resources/i);
    expect(errorComponent).toBeInTheDocument();
  });
});
