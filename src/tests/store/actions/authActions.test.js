import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  refreshAuth,
  login,
  logout,
  forgotPassword,
  updateProfileDetails,
  changePassword,
  updateProfileImage,
} from '../../../store/actions/authActions';
import { loggedInLabManager } from '../../data/loggedInUsers';
import {
  AUTH_ERROR,
  AUTH_LOADED,
  AUTH_LOADING,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE_LOADING,
  UPDATE_PROFILE_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_LOADING,
  CHANGE_PASSWORD_SUCCESS,
  IMAGE_CHANGE_LOADING,
  IMAGE_CHANGE_SUCCESS,
  IMAGE_CHANGE_ERROR,
} from '../../../store/actionTypes/authActionTypes';
import { userLoginResponseData } from '../../data/userLoginResponseData';

const mockStore = configureMockStore([thunk]);

describe('Auth Actions', () => {
  let store;

  describe('Refresh User', () => {
    beforeEach(() => {
      store = mockStore({
        auth: {
          token: localStorage.getItem('token'),
        },
      });
    });

    it('dispatches AUTH_LOADED action and returns data on success', async () => {
      const responseData = userLoginResponseData;

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(refreshAuth());
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(AUTH_LOADING);
      expect(actions[1].type).toEqual(AUTH_LOADED);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches AUTH_ERROR action on faliure', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(refreshAuth());
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(AUTH_LOADING);
      expect(actions[1].type).toEqual(AUTH_ERROR);
    });
  });

  describe('Login User', () => {
    beforeEach(() => {
      store = mockStore({
        auth: {
          token: '',
        },
      });
    });

    it('dispatches LOGIN_SUCCESS action and returns data on success', async () => {
      const responseData = userLoginResponseData;

      mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(login('test@example.com', '#password'));
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(LOGIN_LOADING);
      expect(actions[1].type).toEqual(LOGIN_SUCCESS);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches LOGIN_FAIL action on faliure', async () => {
      mockAxios.post.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(login('test@example.com', '#password'));
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(LOGIN_LOADING);
      expect(actions[1].type).toEqual(LOGIN_FAIL);
    });
  });

  describe('Logout User', () => {
    beforeEach(() => {
      store = mockStore({
        auth: {
          token: localStorage.getItem('token'),
          user: loggedInLabManager,
        },
      });
    });

    it('dispatches LOGOUT_SUCCESS action and returns data on success', async () => {
      const responseData = userLoginResponseData;

      mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(logout());
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(AUTH_LOADING);
      expect(actions[1].type).toEqual(LOGOUT_SUCCESS);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches LOGOUT_FAIL action on faliure', async () => {
      mockAxios.post.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(logout());
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(AUTH_LOADING);
      expect(actions[1].type).toEqual(LOGOUT_FAIL);
    });
  });

  describe('Forgot Password', () => {
    beforeEach(() => {
      store = mockStore({
        auth: {
          token: localStorage.getItem('token'),
        },
      });
    });

    it('dispatches FORGOT_PASSWORD_SUCCESS action and returns data on success', async () => {
      const responseData = {};

      mockAxios.put.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(forgotPassword('test@example.com'));
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(FORGOT_PASSWORD_SUCCESS);
      expect(actions[0].payload).toEqual(responseData);
    });

    it('dispatches FORGOT_PASSWORD_ERROR action on faliure', async () => {
      mockAxios.put.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(forgotPassword('test@example.com'));
      const actions = store.getActions();

      expect.assertions(1);
      expect(actions[0].type).toEqual(FORGOT_PASSWORD_ERROR);
    });
  });

  describe('Update Profile Details', () => {
    beforeEach(() => {
      store = mockStore({
        auth: {
          token: localStorage.getItem('token'),
          user: loggedInLabManager,
        },
      });
    });

    it('dispatches UPDATE_PROFILE_SUCCESS action and returns data on success', async () => {
      const responseData = {};

      mockAxios.patch.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(
        updateProfileDetails('name', 'last_name', '0773546534'),
      );
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(UPDATE_PROFILE_LOADING);
      expect(actions[1].type).toEqual(UPDATE_PROFILE_SUCCESS);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches UPDATE_PROFILE_ERROR action on faliure', async () => {
      mockAxios.patch.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(
        updateProfileDetails('name', 'last_name', '0773546534'),
      );
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(UPDATE_PROFILE_LOADING);
      expect(actions[1].type).toEqual(UPDATE_PROFILE_ERROR);
    });
  });

  describe('Change Password', () => {
    beforeEach(() => {
      store = mockStore({
        auth: {
          token: localStorage.getItem('token'),
          user: loggedInLabManager,
        },
      });
    });

    it('dispatches CHANGE_PASSWORD_SUCCESS action and returns data on success', async () => {
      const responseData = {};

      mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(changePassword('old_pass', 'new_pass'));
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(CHANGE_PASSWORD_LOADING);
      expect(actions[1].type).toEqual(CHANGE_PASSWORD_SUCCESS);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches CHANGE_PASSWORD_ERROR action on faliure', async () => {
      mockAxios.post.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(changePassword('old_pass', 'new_pass'));
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(CHANGE_PASSWORD_LOADING);
      expect(actions[1].type).toEqual(CHANGE_PASSWORD_ERROR);
    });
  });

  describe('Update Profile Image', () => {
    beforeEach(() => {
      store = mockStore({
        auth: {
          token: localStorage.getItem('token'),
          user: loggedInLabManager,
        },
      });
    });

    it('dispatches IMAGE_CHANGE_SUCCESS action and returns data on success', async () => {
      const responseData = {};

      mockAxios.patch.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(updateProfileImage(null));
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(IMAGE_CHANGE_LOADING);
      expect(actions[1].type).toEqual(IMAGE_CHANGE_SUCCESS);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches IMAGE_CHANGE_ERROR action on faliure', async () => {
      mockAxios.patch.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(updateProfileImage(null));
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(IMAGE_CHANGE_LOADING);
      expect(actions[1].type).toEqual(IMAGE_CHANGE_ERROR);
    });
  });
});
