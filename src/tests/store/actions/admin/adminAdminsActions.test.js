import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchAdmins,
  addAdmin,
  resetAdminAdminState,
} from '../../../../store/actions/admin/adminAdminsActions';
import { loggedInAdmin } from '../../../data/loggedInUsers';
import {
  ADMINS_ERROR,
  ADMINS_LOADED,
  ADMINS_LOADING,
  NEW_ADMIN_FAIL,
  NEW_ADMIN_LOADING,
  NEW_ADMIN_SUCCESS,
  RESET_ADMIN_STATE,
} from '../../../../store/actionTypes/adminActionTypes';
import { adminResponseData } from '../../../data/adminResponseData';

const mockStore = configureMockStore([thunk]);

describe('Admin admins Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        token: localStorage.getItem('token'),
        user: loggedInAdmin,
      },
    });
  });

  describe('Fetch Admins', () => {
    it('dispatches ADMINS_LOADED action and returns data on success', async () => {
      const responseData = [adminResponseData];

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(fetchAdmins());
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(ADMINS_LOADING);
      expect(actions[1].type).toEqual(ADMINS_LOADED);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches ADMINS_ERROR action on faliure', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(fetchAdmins());
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(ADMINS_LOADING);
      expect(actions[1].type).toEqual(ADMINS_ERROR);
    });
  });

  describe('Add new Admin', () => {
    it('dispatches NEW_ADMIN_SUCCESS action and returns data on success', async () => {
      const responseData = adminResponseData;

      mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(addAdmin('testadmin@testadminemail.com'));
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(NEW_ADMIN_LOADING);
      expect(actions[1].type).toEqual(NEW_ADMIN_SUCCESS);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches NEW_ADMIN_FAIL action on faliure', async () => {
      mockAxios.post.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(addAdmin('testadmin@testadminemail.com'));
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(NEW_ADMIN_LOADING);
      expect(actions[1].type).toEqual(NEW_ADMIN_FAIL);
    });
  });

  describe('Reset Admin Admins State', () => {
    it('dispatches RESET_ADMIN_STATE action', () => {
      store.dispatch(resetAdminAdminState());
      const actions = store.getActions();

      expect.assertions(1);
      expect(actions[0].type).toEqual(RESET_ADMIN_STATE);
    });
  });
});
