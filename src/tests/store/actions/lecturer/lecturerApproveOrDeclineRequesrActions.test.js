import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  ApproveorDeclineStudentRequest,
  resetApproveorDeclineState,
} from '../../../../store/actions/lecturer/lecturerApproveOrDeclineRequesrActions';
import { loggedInLecturer } from '../../../data/loggedInUsers';
import {
  LECTURER_REQUEST_APPROVE_OR_DECLINE_LOADING,
  LECTURER_REQUEST_APPROVE_OR_DECLINE_SUCCESS,
  LECTURER_REQUEST_APPROVE_OR_DECLINE_FAIL,
  LECTURER_REQUEST_APPROVE_OR_DECLINE_RESET,
} from '../../../../store/actionTypes/lecturerActionTypes';

const mockStore = configureMockStore([thunk]);

describe('Lecturer Approve or Decline Request Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        token: localStorage.getItem('token'),
        user: loggedInLecturer,
      },
    });
  });

  describe('Approve or Decline Student Request', () => {
    it('dispatches LECTURER_REQUEST_APPROVE_OR_DECLINE_SUCCESS action and returns data on success', async () => {
      const responseData = { state: 'Approved' };

      mockAxios.put.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
          payload: [],
        }),
      );

      await store.dispatch(
        ApproveorDeclineStudentRequest(
          '24616094-3cdb-4fbe-850c-562c99179075',
          true,
        ),
      );
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(
        LECTURER_REQUEST_APPROVE_OR_DECLINE_LOADING,
      );
      expect(actions[1].type).toEqual(
        LECTURER_REQUEST_APPROVE_OR_DECLINE_SUCCESS,
      );
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches LECTURER_REQUEST_APPROVE_OR_DECLINE_FAIL action on faliure', async () => {
      mockAxios.put.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(
        ApproveorDeclineStudentRequest(
          '24616094-3cdb-4fbe-850c-562c99179075',
          true,
        ),
      );
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(
        LECTURER_REQUEST_APPROVE_OR_DECLINE_LOADING,
      );
      expect(actions[1].type).toEqual(LECTURER_REQUEST_APPROVE_OR_DECLINE_FAIL);
    });
  });

  describe('Reset Approve or Decline State', () => {
    it('dispatches LECTURER_REQUEST_APPROVE_OR_DECLINE_RESET action', () => {
      store.dispatch(resetApproveorDeclineState());
      const actions = store.getActions();

      expect.assertions(1);
      expect(actions[0].type).toEqual(
        LECTURER_REQUEST_APPROVE_OR_DECLINE_RESET,
      );
    });
  });
});
