import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchDisplayItems,
  addDisplayItem,
  editDisplayItem,
  editDisplayItemResetState,
  resetDisplayItemsPageState,
} from '../../../../store/actions/labManager/labManagerDisplayItemsActions';
import { loggedInLabManager } from '../../../data/loggedInUsers';
import {
  DISPLAY_ITEMS_ERROR,
  DISPLAY_ITEMS_LOADED,
  DISPLAY_ITEMS_LOADING,
  EDIT_DSP_ITEM_FAIL,
  EDIT_DSP_ITEM_LOADING,
  EDIT_DSP_ITEM_RESET_STATE,
  EDIT_DSP_ITEM_SUCCESS,
  NEW_DSP_ITEM_FAIL,
  NEW_DSP_ITEM_LOADING,
  NEW_DSP_ITEM_SUCCESS,
  RESET_DISPLAY_ITEMS_STATE,
} from '../../../../store/actionTypes/labManagerActionTypes';
import { displayItemResponseData } from '../../../data/displayItemResponseData';

const mockStore = configureMockStore([thunk]);

describe('Lab Manager Caregories Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        token: localStorage.getItem('token'),
        user: loggedInLabManager,
      },
    });
  });

  describe('Fetch Display Items', () => {
    it('dispatches DISPLAY_ITEMS_LOADED action and returns data on success', async () => {
      const responseData = [displayItemResponseData];

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(
        fetchDisplayItems('8ff542b4-dbef-45c8-8853-27362fed664d'),
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
        fetchDisplayItems('8ff542b4-dbef-45c8-8853-27362fed664d'),
      );
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(DISPLAY_ITEMS_LOADING);
      expect(actions[1].type).toEqual(DISPLAY_ITEMS_ERROR);
    });
  });

  describe('Add Display Item', () => {
    it('dispatches NEW_DSP_ITEM_SUCCESS action and returns data on success', async () => {
      const responseData = {};

      mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(
        addDisplayItem(
          'name',
          'desc',
          '8ff542b4-dbef-45c8-8853-27362fed664d',
          null,
        ),
      );
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(NEW_DSP_ITEM_LOADING);
      expect(actions[1].type).toEqual(NEW_DSP_ITEM_SUCCESS);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches NEW_DSP_ITEM_FAIL action on faliure', async () => {
      mockAxios.post.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(
        addDisplayItem(
          'name',
          'desc',
          '8ff542b4-dbef-45c8-8853-27362fed664d',
          null,
        ),
      );
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(NEW_DSP_ITEM_LOADING);
      expect(actions[1].type).toEqual(NEW_DSP_ITEM_FAIL);
    });
  });

  describe('Edit Display Item', () => {
    it('dispatches EDIT_DSP_ITEM_SUCCESS action and returns data on success', async () => {
      const responseData = {};

      mockAxios.put.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(
        editDisplayItem('name', 'desc', '8ff542b4-dbef-45c8-8853-27362fed664d'),
      );
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(EDIT_DSP_ITEM_LOADING);
      expect(actions[1].type).toEqual(EDIT_DSP_ITEM_SUCCESS);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches EDIT_DSP_ITEM_FAIL action on faliure', async () => {
      mockAxios.put.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(
        editDisplayItem('name', 'desc', '8ff542b4-dbef-45c8-8853-27362fed664d'),
      );
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(EDIT_DSP_ITEM_LOADING);
      expect(actions[1].type).toEqual(EDIT_DSP_ITEM_FAIL);
    });
  });

  describe('Edit Category Reset State', () => {
    it('dispatches EDIT_DSP_ITEM_RESET_STATE action and reload state', () => {
      store.dispatch(editDisplayItemResetState(true));
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(EDIT_DSP_ITEM_RESET_STATE);
      expect(actions[0].isReload).toEqual(true);
    });
  });

  describe('Reset State', () => {
    it('dispatches RESET_DISPLAY_ITEMS_STATE action', () => {
      store.dispatch(resetDisplayItemsPageState());
      const actions = store.getActions();

      expect.assertions(1);
      expect(actions[0].type).toEqual(RESET_DISPLAY_ITEMS_STATE);
    });
  });
});
