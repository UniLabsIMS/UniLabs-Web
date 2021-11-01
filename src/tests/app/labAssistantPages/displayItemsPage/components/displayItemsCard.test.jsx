import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { displayItemResponseData } from '../../../../data/displayItemResponseData';
import DisplayItem from '../../../../../models/display_item';
import { loggedInLabAssistant } from '../../../../data/loggedInUsers';
import 'intersection-observer';
import DisplayItemsCard from '../../../../../app/labAssistantPages/displayItemsPage/components/displayItemsCard';

const mockStore = configureMockStore([thunk]);

describe('Lab Assistant - Display Item Card', () => {
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

  it('should render as expected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DisplayItemsCard displayItem={displayItemOne} categoryID="xxx" />
        </BrowserRouter>
      </Provider>,
    );
    const nameComponent = screen.getByText(displayItemOne.name);
    const descComponent = screen.getByText(displayItemOne.description);
    const viewItemsButton = screen.getByRole('button', {
      name: /Go to Items/i,
    });
    expect(nameComponent).toBeInTheDocument();
    expect(descComponent).toBeInTheDocument();
    expect(viewItemsButton).toBeInTheDocument();
  });
});
