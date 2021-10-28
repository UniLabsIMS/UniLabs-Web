import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchStudents,
  addStudent,
  blockUnblockStudent,
  resetAdminStudentState,
} from '../../../../store/actions/admin/adminStudentsActions';
import { loggedInAdmin } from '../../../data/loggedInUsers';
import {
  STUDENTS_ERROR,
  STUDENTS_LOADED,
  STUDENTS_LOADING,
  NEW_STUDENT_FAIL,
  NEW_STUDENT_LOADING,
  NEW_STUDENT_SUCCESS,
  RESET_STUDENT_STATE,
  STUDENT_BLOCK_UNBLOCK_LOADING,
  STUDENT_BLOCK_UNBLOCK_SUCCESS,
  STUDENT_BLOCK_UNBLOCK_ERROR,
} from '../../../../store/actionTypes/adminActionTypes';
import { studentResponseData } from '../../../data/studentResponseData';

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

  describe('Fetch Students', () => {
    it('dispatches STUDENTS_LOADED action and returns data on success', async () => {
      const responseData = [studentResponseData];

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(fetchStudents());
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(STUDENTS_LOADING);
      expect(actions[1].type).toEqual(STUDENTS_LOADED);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches STUDENTS_ERROR action on faliure', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(fetchStudents());
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(STUDENTS_LOADING);
      expect(actions[1].type).toEqual(STUDENTS_ERROR);
    });
  });

  describe('Add new Student', () => {
    it('dispatches NEW_STUDENT_SUCCESS action and returns data on success', async () => {
      const responseData = studentResponseData;

      mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(addStudent('test@testemail,com', null, null));
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(NEW_STUDENT_LOADING);
      expect(actions[1].type).toEqual(NEW_STUDENT_SUCCESS);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches NEW_STUDENT_FAIL action on faliure', async () => {
      mockAxios.post.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(addStudent('test@testemail,com', null, null));
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(NEW_STUDENT_LOADING);
      expect(actions[1].type).toEqual(NEW_STUDENT_FAIL);
    });
  });

  describe('Block Unblock Student', () => {
    beforeEach(() => {
      store = mockStore({
        auth: {
          token: localStorage.getItem('token'),
          user: loggedInAdmin,
        },
        adminStudents: {
          students: [],
        },
      });
    });
    it('dispatches STUDENT_BLOCK_UNBLOCK_SUCCESS action and returns data on success', async () => {
      const responseData = {};

      mockAxios.put.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
          payload: [],
        }),
      );

      await store.dispatch(
        blockUnblockStudent('533a6e07-bf99-4587-ae83-52f5e14c547b', true),
      );
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(STUDENT_BLOCK_UNBLOCK_LOADING);
      expect(actions[1].type).toEqual(STUDENT_BLOCK_UNBLOCK_SUCCESS);
      expect(actions[1].payload).toEqual([]);
    });

    it('dispatches NEW_STUDENT_FAIL action on faliure', async () => {
      mockAxios.put.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(
        blockUnblockStudent('533a6e07-bf99-4587-ae83-52f5e14c547b', true),
      );
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(STUDENT_BLOCK_UNBLOCK_LOADING);
      expect(actions[1].type).toEqual(STUDENT_BLOCK_UNBLOCK_ERROR);
    });
  });

  describe('Reset Admin Students State', () => {
    it('dispatches RESET_STUDENT_STATE action', () => {
      store.dispatch(resetAdminStudentState());
      const actions = store.getActions();

      expect.assertions(1);
      expect(actions[0].type).toEqual(RESET_STUDENT_STATE);
    });
  });
});
