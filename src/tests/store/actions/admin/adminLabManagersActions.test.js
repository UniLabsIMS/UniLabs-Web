import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchLabManagers,
  addLabManager,
  blockUnblockLabManager,
  resetAdminLabManagerState,
} from '../../../../store/actions/admin/adminLabManagersActions';
import { loggedInAdmin } from '../../../data/loggedInUsers';
import {
  LAB_MANAGERS_ERROR,
  LAB_MANAGERS_LOADED,
  LAB_MANAGERS_LOADING,
  NEW_LAB_MANAGER_FAIL,
  NEW_LAB_MANAGER_LOADING,
  NEW_LAB_MANAGER_SUCCESS,
  RESET_LAB_MANAGER_STATE,
  LAB_MANAGER_BLOCK_UNBLOCK_LOADING,
  LAB_MANAGER_BLOCK_UNBLOCK_SUCCESS,
  LAB_MANAGER_BLOCK_UNBLOCK_ERROR,
} from '../../../../store/actionTypes/adminActionTypes';
import { labManagerResponseData } from '../../../data/labManagerResponseData';

const mockStore = configureMockStore([thunk]);

describe('Admin Lab Managers Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        token: localStorage.getItem('token'),
        user: loggedInAdmin,
      },
    });
  });

  describe('Fetch LabManagers', () => {
    it('dispatches LAB_MANAGERS_LOADED action and returns data on success', async () => {
      const responseData = [labManagerResponseData];

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(fetchLabManagers());
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(LAB_MANAGERS_LOADING);
      expect(actions[1].type).toEqual(LAB_MANAGERS_LOADED);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches LAB_MANAGERS_ERROR action on faliure', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(fetchLabManagers());
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(LAB_MANAGERS_LOADING);
      expect(actions[1].type).toEqual(LAB_MANAGERS_ERROR);
    });
  });

  describe('Add new LabManager', () => {
    it('dispatches NEW_LAB_MANAGER_SUCCESS action and returns data on success', async () => {
      const responseData = labManagerResponseData;

      mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(addLabManager('test@testemail,com', null));
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(NEW_LAB_MANAGER_LOADING);
      expect(actions[1].type).toEqual(NEW_LAB_MANAGER_SUCCESS);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches NEW_LAB_MANAGER_FAIL action on faliure', async () => {
      mockAxios.post.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(addLabManager('test@testemail,com', null));
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(NEW_LAB_MANAGER_LOADING);
      expect(actions[1].type).toEqual(NEW_LAB_MANAGER_FAIL);
    });
  });

  describe('Block Unblock LabManager', () => {
    beforeEach(() => {
      store = mockStore({
        auth: {
          token: localStorage.getItem('token'),
          user: loggedInAdmin,
        },
        adminLabManagers: {
          labManagers: [],
        },
      });
    });
    it('dispatches LAB_MANAGER_BLOCK_UNBLOCK_SUCCESS action and returns data on success', async () => {
      const responseData = {};

      mockAxios.put.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
          payload: [],
        }),
      );

      await store.dispatch(
        blockUnblockLabManager('fb6d2ceb-775e-4706-be4b-161f745014c0', true),
      );
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(LAB_MANAGER_BLOCK_UNBLOCK_LOADING);
      expect(actions[1].type).toEqual(LAB_MANAGER_BLOCK_UNBLOCK_SUCCESS);
      expect(actions[1].payload).toEqual([]);
    });

    it('dispatches NEW_LAB_MANAGER_FAIL action on faliure', async () => {
      mockAxios.put.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(
        blockUnblockLabManager('fb6d2ceb-775e-4706-be4b-161f745014c0', true),
      );
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(LAB_MANAGER_BLOCK_UNBLOCK_LOADING);
      expect(actions[1].type).toEqual(LAB_MANAGER_BLOCK_UNBLOCK_ERROR);
    });
  });

  describe('Reset Admin LabManagers State', () => {
    it('dispatches RESET_LAB_MANAGER_STATE action', () => {
      store.dispatch(resetAdminLabManagerState());
      const actions = store.getActions();

      expect.assertions(1);
      expect(actions[0].type).toEqual(RESET_LAB_MANAGER_STATE);
    });
  });
});
