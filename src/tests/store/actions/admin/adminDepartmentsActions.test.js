import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchDepartments,
  addDepartment,
  resetAdminDepartmentState,
} from '../../../../store/actions/admin/adminDepartmentsActions';
import { loggedInAdmin } from '../../../data/loggedInUsers';
import {
  DEPARTMENTS_ERROR,
  DEPARTMENTS_LOADED,
  DEPARTMENTS_LOADING,
  NEW_DEPARTMENT_FAIL,
  NEW_DEPARTMENT_LOADING,
  NEW_DEPARTMENT_SUCCESS,
  RESET_DEPARTMENT_STATE,
} from '../../../../store/actionTypes/adminActionTypes';
import { departmentResponseData } from '../../../data/departmentResponseData';

const mockStore = configureMockStore([thunk]);

describe('Admin departments Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        token: localStorage.getItem('token'),
        user: loggedInAdmin,
      },
    });
  });

  describe('Fetch Departments', () => {
    it('dispatches DEPARTMENTS_LOADED action and returns data on success', async () => {
      const responseData = [departmentResponseData];

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(fetchDepartments());
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(DEPARTMENTS_LOADING);
      expect(actions[1].type).toEqual(DEPARTMENTS_LOADED);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches DEPARTMENTS_ERROR action on faliure', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(fetchDepartments());
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(DEPARTMENTS_LOADING);
      expect(actions[1].type).toEqual(DEPARTMENTS_ERROR);
    });
  });

  describe('Add new Department', () => {
    it('dispatches NEW_DEPARTMENT_SUCCESS action and returns data on success', async () => {
      const responseData = departmentResponseData;

      mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(addDepartment('test dept name', 'test dept code'));
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(NEW_DEPARTMENT_LOADING);
      expect(actions[1].type).toEqual(NEW_DEPARTMENT_SUCCESS);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches NEW_DEPARTMENT_FAIL action on faliure', async () => {
      mockAxios.post.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(addDepartment('test dept name', 'test dept code'));
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(NEW_DEPARTMENT_LOADING);
      expect(actions[1].type).toEqual(NEW_DEPARTMENT_FAIL);
    });
  });

  describe('Reset Admin Departments State', () => {
    it('dispatches RESET_DEPARTMENT_STATE action', () => {
      store.dispatch(resetAdminDepartmentState());
      const actions = store.getActions();

      expect.assertions(1);
      expect(actions[0].type).toEqual(RESET_DEPARTMENT_STATE);
    });
  });
});
