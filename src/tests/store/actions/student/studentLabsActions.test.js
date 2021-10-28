import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { waitFor } from '@testing-library/react';
import { fetchLabsStudent } from '../../../../store/actions/student/studentLabsActions';
import { loggedInStudent } from '../../../data/loggedInUsers';
import {
  STUDENT_LABS_ERROR,
  STUDENT_LABS_LOADED,
  STUDENT_LABS_LOADING,
} from '../../../../store/actionTypes/studentActionTypes';
import { labResponseData } from '../../../data/labResponseData';
import { departmentResponseData } from '../../../data/departmentResponseData';

const mockStore = configureMockStore([thunk]);

describe('Student Display Items Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        token: localStorage.getItem('token'),
        user: loggedInStudent,
      },
    });
  });

  describe('Fetch Labs', () => {
    it('dispatches STUDENT_LABS_LOADED action and returns data on success', async () => {
      const responseData = [labResponseData];
      const departmentsResponseData = [departmentResponseData];

      mockAxios.get
        .mockImplementationOnce(() => Promise.resolve({ data: responseData }))
        .mockImplementationOnce(() =>
          Promise.resolve({ data: departmentsResponseData }),
        );

      await store.dispatch(
        fetchLabsStudent('b946f0b4-958a-4a2a-910a-a783dbc2d993'),
      );

      await waitFor(() => {
        // as we have nested get requests
        const actions = store.getActions();
        expect.assertions(5); // +1 for timeout
        expect(actions[0].type).toEqual(STUDENT_LABS_LOADING);
        expect(actions[1].type).toEqual(STUDENT_LABS_LOADED);
        expect(actions[1].payload.labs).toEqual(responseData);
        expect(actions[1].payload.departments).toEqual(departmentsResponseData);
      });
    });

    it('dispatches STUDENT_LABS_ERROR action on faliure', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(
        fetchLabsStudent('b946f0b4-958a-4a2a-910a-a783dbc2d993'),
      );
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(STUDENT_LABS_LOADING);
      expect(actions[1].type).toEqual(STUDENT_LABS_ERROR);
    });
  });
});
