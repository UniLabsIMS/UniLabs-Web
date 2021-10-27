import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchLabAssistantBorrowedItems,
  resetLabAssistantBorrowedItemsState,
} from '../../../../store/actions/labAssistant/labAssistantBorrowedItemsActions';
import { loggedInLabAssistant } from '../../../data/loggedInUsers';
import {
  BORROWED_ITEMS_ERROR,
  BORROWED_ITEMS_LOADED,
  BORROWED_ITEMS_LOADING,
  RESET_BORROWED_ITEMS_STATE,
} from '../../../../store/actionTypes/labAssistantActionTypes';
import { borrowedItemData } from '../../../data/borrowedItemData';

const mockStore = configureMockStore([thunk]);

describe('Lab Assistant Borrowed Items Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        token: localStorage.getItem('token'),
        user: loggedInLabAssistant,
      },
    });
  });

  describe('Fetch Borrowed Items', () => {
    it('dispatches BORROWED_ITEMS_LOADED action and returns data on success', async () => {
      const responseData = [borrowedItemData];

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(fetchLabAssistantBorrowedItems());
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(BORROWED_ITEMS_LOADING);
      expect(actions[1].type).toEqual(BORROWED_ITEMS_LOADED);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches BORROWED_ITEMS_ERROR action on faliure', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(fetchLabAssistantBorrowedItems());
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(BORROWED_ITEMS_LOADING);
      expect(actions[1].type).toEqual(BORROWED_ITEMS_ERROR);
    });
  });

  describe('Reset State', () => {
    it('dispatches RESET_BORROWED_ITEMS_STATE action', () => {
      store.dispatch(resetLabAssistantBorrowedItemsState());
      const actions = store.getActions();

      expect.assertions(1);
      expect(actions[0].type).toEqual(RESET_BORROWED_ITEMS_STATE);
    });
  });
});
