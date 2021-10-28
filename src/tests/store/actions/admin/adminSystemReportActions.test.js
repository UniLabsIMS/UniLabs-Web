// import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  //   fetchSystemReport,
  //   fetchLabReport,
  resetSystemReportState,
} from '../../../../store/actions/admin/adminSystemReportActions';
import { loggedInAdmin } from '../../../data/loggedInUsers';
import {
  //   ADMIN_SYSTEM_REPORT_LOADING,
  //   ADMIN_SYSTEM_REPORT_LOADED,
  //   ADMIN_SYSTEM_REPORT_ERROR,
  ADMIN_SYSTEM_REPORT_RESET,
  //   ADMIN_LAB_REPORT_LOADING,
  //   ADMIN_LAB_REPORT_LOADED,
  //   ADMIN_LAB_REPORT_ERROR,
} from '../../../../store/actionTypes/adminActionTypes';
// import { studentResponseData } from '../../../data/studentResponseData';

const mockStore = configureMockStore([thunk]);

describe('Admin System Report Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        token: localStorage.getItem('token'),
        user: loggedInAdmin,
      },
    });
  });

  //   describe('Fetch System Report', () => {
  //     it('dispatches ADMIN_SYSTEM_REPORT_LOADED action and returns data on success', async () => {
  //       const responseData = [studentResponseData];

  //       mockAxios.get.mockImplementationOnce(() =>
  //         Promise.resolve({
  //           data: responseData,
  //         }),
  //       );

  //       await store.dispatch(fetchStudents());
  //       const actions = store.getActions();

  //       expect.assertions(3);
  //       expect(actions[0].type).toEqual(STUDENTS_LOADING);
  //       expect(actions[1].type).toEqual(STUDENTS_LOADED);
  //       expect(actions[1].payload).toEqual(responseData);
  //     });

  //     it('dispatches STUDENTS_ERROR action on faliure', async () => {
  //       mockAxios.get.mockRejectedValueOnce(new Error('Error'));

  //       await store.dispatch(fetchStudents());
  //       const actions = store.getActions();

  //       expect.assertions(2);
  //       expect(actions[0].type).toEqual(STUDENTS_LOADING);
  //       expect(actions[1].type).toEqual(STUDENTS_ERROR);
  //     });
  //   });

  describe('Reset Admin System Report State', () => {
    it('dispatches ADMIN_SYSTEM_REPORT_RESET action', () => {
      store.dispatch(resetSystemReportState());
      const actions = store.getActions();

      expect.assertions(1);
      expect(actions[0].type).toEqual(ADMIN_SYSTEM_REPORT_RESET);
    });
  });
});
