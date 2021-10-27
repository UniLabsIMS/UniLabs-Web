import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchLabAssistantDisplayItems,
  resetLabAssistantDisplayItemsPageState,
} from '../../../../store/actions/labAssistant/labAssistantDisplayItemsActions';
import { loggedInLabAssistant } from '../../../data/loggedInUsers';
import {
  DISPLAY_ITEMS_ERROR,
  DISPLAY_ITEMS_LOADED,
  DISPLAY_ITEMS_LOADING,
  RESET_DISPLAY_ITEMS_STATE,
} from '../../../../store/actionTypes/labAssistantActionTypes';
import { categoryResponseData } from '../../../data/categoryResponseData';

const mockStore = configureMockStore([thunk]);

describe('Lab Assistant Display Items Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        token: localStorage.getItem('token'),
        user: loggedInLabAssistant,
      },
    });
  });

  describe('Fetch Display Items', () => {
    it('dispatches DISPLAY_ITEMS_LOADED action and returns data on success', async () => {
      const responseData = [categoryResponseData];

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(
        fetchLabAssistantDisplayItems('8ff542b4-dbef-45c8-8853-27362fed664d'),
      );
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(DISPLAY_ITEMS_LOADING);
      expect(actions[1].type).toEqual(DISPLAY_ITEMS_LOADED);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches DISPLAY_ITEMS_ERROR action on faliure', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(
        fetchLabAssistantDisplayItems('8ff542b4-dbef-45c8-8853-27362fed664d'),
      );
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(DISPLAY_ITEMS_LOADING);
      expect(actions[1].type).toEqual(DISPLAY_ITEMS_ERROR);
    });
  });

  describe('Reset State', () => {
    it('dispatches RESET_CATEGORIES_STATE action', () => {
      store.dispatch(resetLabAssistantDisplayItemsPageState());
      const actions = store.getActions();

      expect.assertions(1);
      expect(actions[0].type).toEqual(RESET_DISPLAY_ITEMS_STATE);
    });
  });
});
