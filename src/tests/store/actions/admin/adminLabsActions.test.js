import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { waitFor } from '@testing-library/react';
import {
  fetchLabs,
  fetchDeptLabs,
  addLab,
  assignLecturer,
  resetAdminLabState,
  resetLabLecturerAssignState,
} from '../../../../store/actions/admin/adminLabsActions';
import { loggedInAdmin } from '../../../data/loggedInUsers';
import {
  LABS_ERROR,
  LABS_LOADED,
  LABS_LOADING,
  NEW_LAB_FAIL,
  NEW_LAB_LOADING,
  NEW_LAB_SUCCESS,
  RESET_LAB_STATE,
  DEPT_LABS_ERROR,
  DEPT_LABS_LOADED,
  DEPT_LABS_LOADING,
  LAB_ASSIGN_LECTURER_LOADING,
  LAB_ASSIGN_LECTURER_SUCCESS,
  LAB_ASSIGN_LECTURER_ERROR,
  LAB_ASSIGN_LECTURER_RESET,
} from '../../../../store/actionTypes/adminActionTypes';
import { labResponseData } from '../../../data/labResponseData';
import { lecturerResponseData } from '../../../data/lecturerResponseData';
import Lab from '../../../../models/lab';

const mockStore = configureMockStore([thunk]);

describe('Admin Labs Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        token: localStorage.getItem('token'),
        user: loggedInAdmin,
      },
    });
  });

  describe('Fetch Labs', () => {
    it('dispatches LABS_LOADED action and returns data on success', async () => {
      const responseData = [labResponseData];
      const lecturersResponseData = [lecturerResponseData];

      mockAxios.get
        .mockImplementationOnce(() => Promise.resolve({ data: responseData }))
        .mockImplementationOnce(() =>
          Promise.resolve({ data: lecturersResponseData }),
        );

      await store.dispatch(fetchLabs());

      await waitFor(() => {
        // as we have nested get requests
        const actions = store.getActions();
        expect.assertions(5); // +1 for timeout
        expect(actions[0].type).toEqual(LABS_LOADING);
        expect(actions[1].type).toEqual(LABS_LOADED);
        expect(actions[1].payload.labs).toEqual(responseData);
        expect(actions[1].payload.lecturers).toEqual(lecturersResponseData);
      });
    });

    it('dispatches LABS_ERROR action on faliure', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(fetchLabs());
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(LABS_LOADING);
      expect(actions[1].type).toEqual(LABS_ERROR);
    });
  });

  describe('Add new Lab', () => {
    it('dispatches NEW_LAB_SUCCESS action and returns data on success', async () => {
      const responseData = labResponseData;

      mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(
        addLab(
          'name',
          'department',
          'location',
          'contactNo',
          'contactEmail',
          'image',
        ),
      );
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(NEW_LAB_LOADING);
      expect(actions[1].type).toEqual(NEW_LAB_SUCCESS);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches NEW_LAB_FAIL action on faliure', async () => {
      mockAxios.post.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(
        addLab(
          'name',
          'department',
          'location',
          'contactNo',
          'contactEmail',
          'image',
        ),
      );
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(NEW_LAB_LOADING);
      expect(actions[1].type).toEqual(NEW_LAB_FAIL);
    });
  });

  describe('Block Unblock Lab', () => {
    it('dispatches DEPT_LABS_LOADED action and returns data on success', async () => {
      const responseData = [labResponseData];

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(fetchDeptLabs(labResponseData.id));
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(DEPT_LABS_LOADING);
      expect(actions[1].type).toEqual(DEPT_LABS_LOADED);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches DEPT_LABS_ERROR action on faliure', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(fetchDeptLabs(labResponseData.id));
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(DEPT_LABS_LOADING);
      expect(actions[1].type).toEqual(DEPT_LABS_ERROR);
    });
  });

  describe('Assign Lecturer to Lab', () => {
    beforeEach(() => {
      store = mockStore({
        auth: {
          token: localStorage.getItem('token'),
          user: loggedInAdmin,
        },
        adminLabs: { labs: [labResponseData].map(obj => new Lab(obj)) },
      });
    });
    it('dispatches LAB_ASSIGN_LECTURER_SUCCESS action and returns data on success', async () => {
      const responseData = lecturerResponseData;

      mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(
        assignLecturer(labResponseData.id, lecturerResponseData.id),
      );
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(LAB_ASSIGN_LECTURER_LOADING);
      expect(actions[1].type).toEqual(LAB_ASSIGN_LECTURER_SUCCESS);
      expect(actions[1].payload[0].assignedLecturers.length).toEqual(4); // new lecturer added to list
    });

    it('dispatches LAB_ASSIGN_LECTURER_ERROR action on faliure', async () => {
      mockAxios.post.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(
        assignLecturer(labResponseData.id, lecturerResponseData.id),
      );
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(LAB_ASSIGN_LECTURER_LOADING);
      expect(actions[1].type).toEqual(LAB_ASSIGN_LECTURER_ERROR);
    });
  });
  describe('Reset Admin Labs State', () => {
    it('dispatches RESET_LAB_STATE action', () => {
      store.dispatch(resetAdminLabState());
      const actions = store.getActions();

      expect.assertions(1);
      expect(actions[0].type).toEqual(RESET_LAB_STATE);
    });
  });
  describe('Reset Admin Lecturer Assign State', () => {
    it('dispatches LAB_ASSIGN_LECTURER_RESET action', () => {
      store.dispatch(resetLabLecturerAssignState());
      const actions = store.getActions();

      expect.assertions(1);
      expect(actions[0].type).toEqual(LAB_ASSIGN_LECTURER_RESET);
    });
  });
});
