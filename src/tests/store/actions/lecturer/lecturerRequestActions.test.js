import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchLecturerRequest } from '../../../../store/actions/lecturer/lecturerRequestActions';
import { loggedInLecturer } from '../../../data/loggedInUsers';
import {
  LECTURER_REQUEST_LOADING,
  LECTURER_REQUEST_LOADED,
  LECTURER_REQUEST_ERROR,
} from '../../../../store/actionTypes/lecturerActionTypes';
import { lecturerRequestResponseData } from '../../../data/lecturerRequestResponseData';

const mockStore = configureMockStore([thunk]);

describe('Lecturer Request Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        token: localStorage.getItem('token'),
        user: loggedInLecturer,
      },
    });
  });

  describe('Fetch Lecturer Request', () => {
    it('dispatches LECTURER_REQUEST_LOADED action and returns data on success', async () => {
      const responseData = [lecturerRequestResponseData];

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(
        fetchLecturerRequest('086fc6e5-2d8f-4760-a7ea-b8781ae4ae86'),
      );
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(LECTURER_REQUEST_LOADING);
      expect(actions[1].type).toEqual(LECTURER_REQUEST_LOADED);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches LECTURER_REQUEST_ERROR action on faliure', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(
        fetchLecturerRequest('086fc6e5-2d8f-4760-a7ea-b8781ae4ae86'),
      );
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(LECTURER_REQUEST_LOADING);
      expect(actions[1].type).toEqual(LECTURER_REQUEST_ERROR);
    });
  });
});
