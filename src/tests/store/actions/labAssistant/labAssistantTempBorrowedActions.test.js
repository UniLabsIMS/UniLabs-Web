import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchLabAssistantTempBorrowedItems,
  resetLabAssistantTempBorrowedItemsState,
} from '../../../../store/actions/labAssistant/labAssistantTempBorrowedActions';
import { loggedInLabAssistant } from '../../../data/loggedInUsers';
import {
  TEMP_BORROWED_ITEMS_ERROR,
  TEMP_BORROWED_ITEMS_LOADED,
  TEMP_BORROWED_ITEMS_LOADING,
  RESET_TEMP_BORROWED_ITEMS_STATE,
} from '../../../../store/actionTypes/labAssistantActionTypes';
import { tempBorrowedItemData } from '../../../data/borrowedItemData';

const mockStore = configureMockStore([thunk]);

describe('Lab Assistant Temp Borrowed Items Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        token: localStorage.getItem('token'),
        user: loggedInLabAssistant,
      },
    });
  });

  describe('Fetch Temp Borrowed Items', () => {
    it('dispatches TEMP_BORROWED_ITEMS_LOADED action and returns data on success', async () => {
      const responseData = [tempBorrowedItemData];

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(fetchLabAssistantTempBorrowedItems());
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(TEMP_BORROWED_ITEMS_LOADING);
      expect(actions[1].type).toEqual(TEMP_BORROWED_ITEMS_LOADED);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches TEMP_BORROWED_ITEMS_ERROR action on faliure', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(fetchLabAssistantTempBorrowedItems());
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(TEMP_BORROWED_ITEMS_LOADING);
      expect(actions[1].type).toEqual(TEMP_BORROWED_ITEMS_ERROR);
    });
  });

  describe('Reset State', () => {
    it('dispatches RESET_BORROWED_ITEMS_STATE action', () => {
      store.dispatch(resetLabAssistantTempBorrowedItemsState());
      const actions = store.getActions();

      expect.assertions(1);
      expect(actions[0].type).toEqual(RESET_TEMP_BORROWED_ITEMS_STATE);
    });
  });
});
