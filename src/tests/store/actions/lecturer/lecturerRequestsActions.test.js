import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchLecturerRequests } from '../../../../store/actions/lecturer/lecturerRequestsActions';
import { loggedInLecturer } from '../../../data/loggedInUsers';
import {
  LECTURER_REQUESTS_LOADING,
  LECTURER_REQUESTS_LOADED,
  LECTURER_REQUESTS_ERROR,
} from '../../../../store/actionTypes/lecturerActionTypes';
import { lecturerRequestResponseData } from '../../../data/lecturerRequestResponseData';

const mockStore = configureMockStore([thunk]);

describe('Lecturer Requests Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        token: localStorage.getItem('token'),
        user: loggedInLecturer,
      },
    });
  });

  describe('Fetch Lecturer Requests', () => {
    it('dispatches LECTURER_REQUESTS_LOADED action and returns data on success', async () => {
      const responseData = [lecturerRequestResponseData];

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(fetchLecturerRequests());
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(LECTURER_REQUESTS_LOADING);
      expect(actions[1].type).toEqual(LECTURER_REQUESTS_LOADED);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches LECTURER_REQUESTS_ERROR action on faliure', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(fetchLecturerRequests());
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(LECTURER_REQUESTS_LOADING);
      expect(actions[1].type).toEqual(LECTURER_REQUESTS_ERROR);
    });
  });
});
