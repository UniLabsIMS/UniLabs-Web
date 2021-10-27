import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchLabAssistantItems,
  addLabAssistantItem,
  deleteLabAssistantItem,
  cleanLabAssistantNewItemState,
  resetLabAssistantItemsPageState,
} from '../../../../store/actions/labAssistant/labAssistantItemsActions';
import { loggedInLabAssistant } from '../../../data/loggedInUsers';
import {
  ITEMS_ERROR,
  ITEMS_LOADED,
  ITEMS_LOADING,
  NEW_ITEM_FAIL,
  NEW_ITEM_LOADING,
  NEW_ITEM_SUCCESS,
  RESET_ITEMS_STATE,
  RESET_NEW_ITEM_STATE,
  ITEM_DELETE_LOADING,
  ITEM_DELETE_SUCCESS,
  ITEM_DELETE_FAIL,
} from '../../../../store/actionTypes/labAssistantActionTypes';
import { itemReponseData } from '../../../data/itemResponseData';

const mockStore = configureMockStore([thunk]);

describe('Lab Assistant Items Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        token: localStorage.getItem('token'),
        user: loggedInLabAssistant,
      },
    });
  });

  describe('Fetch Items', () => {
    it('dispatches ITEMS_LOADED action and returns data on success', async () => {
      const responseData = [itemReponseData];

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(
        fetchLabAssistantItems('8ff542b4-dbef-45c8-8853-27362fed664d'),
      );
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(ITEMS_LOADING);
      expect(actions[1].type).toEqual(ITEMS_LOADED);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches ITEMS_ERROR action on faliure', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(
        fetchLabAssistantItems('8ff542b4-dbef-45c8-8853-27362fed664d'),
      );
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(ITEMS_LOADING);
      expect(actions[1].type).toEqual(ITEMS_ERROR);
    });
  });

  describe('Add Item', () => {
    it('dispatches NEW_ITEM_SUCCESS action and returns data on success', async () => {
      const responseData = {};

      mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(
        addLabAssistantItem('8ff542b4-dbef-45c8-8853-27362fed664d'),
      );
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(NEW_ITEM_LOADING);
      expect(actions[1].type).toEqual(NEW_ITEM_SUCCESS);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches NEW_ITEM_FAIL action on faliure', async () => {
      mockAxios.post.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(
        addLabAssistantItem('8ff542b4-dbef-45c8-8853-27362fed664d'),
      );
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(NEW_ITEM_LOADING);
      expect(actions[1].type).toEqual(NEW_ITEM_FAIL);
    });
  });

  describe('Delete Item', () => {
    it('dispatches ITEM_DELETE_SUCCESS action and returns data on success', async () => {
      const responseData = {};

      mockAxios.delete.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(
        deleteLabAssistantItem('8ff542b4-dbef-45c8-8853-27362fed664d'),
      );
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(ITEM_DELETE_LOADING);
      expect(actions[1].type).toEqual(ITEM_DELETE_SUCCESS);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches ITEM_DELETE_FAIL action on faliure', async () => {
      mockAxios.delete.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(
        deleteLabAssistantItem('8ff542b4-dbef-45c8-8853-27362fed664d'),
      );
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(ITEM_DELETE_LOADING);
      expect(actions[1].type).toEqual(ITEM_DELETE_FAIL);
    });
  });

  describe('Clear New Item State', () => {
    it('dispatches RESET_NEW_ITEM_STATE action', () => {
      store.dispatch(cleanLabAssistantNewItemState());
      const actions = store.getActions();

      expect.assertions(1);
      expect(actions[0].type).toEqual(RESET_NEW_ITEM_STATE);
    });
  });

  describe('Reset State', () => {
    it('dispatches RESET_ITEMS_STATE action', () => {
      store.dispatch(resetLabAssistantItemsPageState());
      const actions = store.getActions();

      expect.assertions(1);
      expect(actions[0].type).toEqual(RESET_ITEMS_STATE);
    });
  });
});
