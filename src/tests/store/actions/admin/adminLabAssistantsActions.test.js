import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchLabAssistants,
  addLabAssistant,
  blockUnblockLabAssistant,
  resetAdminLabAssistantState,
} from '../../../../store/actions/admin/adminLabAssistantsActions';
import { loggedInAdmin } from '../../../data/loggedInUsers';
import {
  LAB_ASSISTANTS_ERROR,
  LAB_ASSISTANTS_LOADED,
  LAB_ASSISTANTS_LOADING,
  NEW_LAB_ASSISTANT_FAIL,
  NEW_LAB_ASSISTANT_LOADING,
  NEW_LAB_ASSISTANT_SUCCESS,
  RESET_LAB_ASSISTANT_STATE,
  LAB_ASSISTANT_BLOCK_UNBLOCK_LOADING,
  LAB_ASSISTANT_BLOCK_UNBLOCK_SUCCESS,
  LAB_ASSISTANT_BLOCK_UNBLOCK_ERROR,
} from '../../../../store/actionTypes/adminActionTypes';
import { labAssistantResponseData } from '../../../data/labAssistantResponseData';

const mockStore = configureMockStore([thunk]);

describe('Admin Lab Assistants Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        token: localStorage.getItem('token'),
        user: loggedInAdmin,
      },
    });
  });

  describe('Fetch LabAssistants', () => {
    it('dispatches LAB_ASSISTANTS_LOADED action and returns data on success', async () => {
      const responseData = [labAssistantResponseData];

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(fetchLabAssistants());
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(LAB_ASSISTANTS_LOADING);
      expect(actions[1].type).toEqual(LAB_ASSISTANTS_LOADED);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches LAB_ASSISTANTS_ERROR action on faliure', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(fetchLabAssistants());
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(LAB_ASSISTANTS_LOADING);
      expect(actions[1].type).toEqual(LAB_ASSISTANTS_ERROR);
    });
  });

  describe('Add new LabAssistant', () => {
    it('dispatches NEW_LAB_ASSISTANT_SUCCESS action and returns data on success', async () => {
      const responseData = labAssistantResponseData;

      mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(addLabAssistant('test@testemail,com', null));
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(NEW_LAB_ASSISTANT_LOADING);
      expect(actions[1].type).toEqual(NEW_LAB_ASSISTANT_SUCCESS);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches NEW_LAB_ASSISTANT_FAIL action on faliure', async () => {
      mockAxios.post.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(addLabAssistant('test@testemail,com', null));
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(NEW_LAB_ASSISTANT_LOADING);
      expect(actions[1].type).toEqual(NEW_LAB_ASSISTANT_FAIL);
    });
  });

  describe('Block Unblock LabAssistant', () => {
    beforeEach(() => {
      store = mockStore({
        auth: {
          token: localStorage.getItem('token'),
          user: loggedInAdmin,
        },
        adminLabAssistants: {
          labAssistants: [],
        },
      });
    });
    it('dispatches LAB_ASSISTANT_BLOCK_UNBLOCK_SUCCESS action and returns data on success', async () => {
      const responseData = {};

      mockAxios.put.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
          payload: [],
        }),
      );

      await store.dispatch(
        blockUnblockLabAssistant('24616094-3cdb-4fbe-850c-562c99179075', true),
      );
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(LAB_ASSISTANT_BLOCK_UNBLOCK_LOADING);
      expect(actions[1].type).toEqual(LAB_ASSISTANT_BLOCK_UNBLOCK_SUCCESS);
      expect(actions[1].payload).toEqual([]);
    });

    it('dispatches NEW_LAB_ASSISTANT_FAIL action on faliure', async () => {
      mockAxios.put.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(
        blockUnblockLabAssistant('24616094-3cdb-4fbe-850c-562c99179075', true),
      );
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(LAB_ASSISTANT_BLOCK_UNBLOCK_LOADING);
      expect(actions[1].type).toEqual(LAB_ASSISTANT_BLOCK_UNBLOCK_ERROR);
    });
  });

  describe('Reset Admin LabAssistants State', () => {
    it('dispatches RESET_LAB_ASSISTANT_STATE action', () => {
      store.dispatch(resetAdminLabAssistantState());
      const actions = store.getActions();

      expect.assertions(1);
      expect(actions[0].type).toEqual(RESET_LAB_ASSISTANT_STATE);
    });
  });
});
