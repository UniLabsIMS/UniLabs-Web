import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchLecturers,
  addLecturer,
  blockUnblockLecturer,
  resetAdminLecturerState,
} from '../../../../store/actions/admin/adminLecturersActions';
import { loggedInAdmin } from '../../../data/loggedInUsers';
import {
  LECTURERS_ERROR,
  LECTURERS_LOADED,
  LECTURERS_LOADING,
  NEW_LECTURER_FAIL,
  NEW_LECTURER_LOADING,
  NEW_LECTURER_SUCCESS,
  RESET_LECTURER_STATE,
  LECTURER_BLOCK_UNBLOCK_LOADING,
  LECTURER_BLOCK_UNBLOCK_SUCCESS,
  LECTURER_BLOCK_UNBLOCK_ERROR,
} from '../../../../store/actionTypes/adminActionTypes';
import { lecturerResponseData } from '../../../data/lecturerResponseData';

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

  describe('Fetch Lecturers', () => {
    it('dispatches LECTURERS_LOADED action and returns data on success', async () => {
      const responseData = [lecturerResponseData];

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(fetchLecturers());
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(LECTURERS_LOADING);
      expect(actions[1].type).toEqual(LECTURERS_LOADED);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches LECTURERS_ERROR action on faliure', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(fetchLecturers());
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(LECTURERS_LOADING);
      expect(actions[1].type).toEqual(LECTURERS_ERROR);
    });
  });

  describe('Add new Lecturer', () => {
    it('dispatches NEW_LECTURER_SUCCESS action and returns data on success', async () => {
      const responseData = lecturerResponseData;

      mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(addLecturer('test@testemail,com', null, null, null));
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(NEW_LECTURER_LOADING);
      expect(actions[1].type).toEqual(NEW_LECTURER_SUCCESS);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches NEW_LECTURER_FAIL action on faliure', async () => {
      mockAxios.post.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(addLecturer('test@testemail,com', null, null, null));
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(NEW_LECTURER_LOADING);
      expect(actions[1].type).toEqual(NEW_LECTURER_FAIL);
    });
  });

  describe('Block Unblock Lecturer', () => {
    beforeEach(() => {
      store = mockStore({
        auth: {
          token: localStorage.getItem('token'),
          user: loggedInAdmin,
        },
        adminLecturers: {
          lecturers: [],
        },
      });
    });
    it('dispatches LECTURER_BLOCK_UNBLOCK_SUCCESS action and returns data on success', async () => {
      const responseData = {};

      mockAxios.put.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
          payload: [],
        }),
      );

      await store.dispatch(
        blockUnblockLecturer('cbe296d8-e3a9-404e-b4d7-5eee3c40434f', true),
      );
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(LECTURER_BLOCK_UNBLOCK_LOADING);
      expect(actions[1].type).toEqual(LECTURER_BLOCK_UNBLOCK_SUCCESS);
      expect(actions[1].payload).toEqual([]);
    });

    it('dispatches NEW_LECTURER_FAIL action on faliure', async () => {
      mockAxios.put.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(
        blockUnblockLecturer('cbe296d8-e3a9-404e-b4d7-5eee3c40434f', true),
      );
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(LECTURER_BLOCK_UNBLOCK_LOADING);
      expect(actions[1].type).toEqual(LECTURER_BLOCK_UNBLOCK_ERROR);
    });
  });

  describe('Reset Admin Lecturers State', () => {
    it('dispatches RESET_LECTURER_STATE action', () => {
      store.dispatch(resetAdminLecturerState());
      const actions = store.getActions();

      expect.assertions(1);
      expect(actions[0].type).toEqual(RESET_LECTURER_STATE);
    });
  });
});
