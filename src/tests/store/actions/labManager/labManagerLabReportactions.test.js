import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchLabReport } from '../../../../store/actions/labManager/labManagerLabReportActions';
import { loggedInLabManager } from '../../../data/loggedInUsers';
import {
  LAB_REPORT_LOADING,
  LAB_REPORT_LOADED,
  LAB_REPORT_ERROR,
} from '../../../../store/actionTypes/labManagerActionTypes';
import { labReportResponseData } from '../../../data/labReportResponseData';

const mockStore = configureMockStore([thunk]);

describe('Lab Manager Lab Report Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        token: localStorage.getItem('token'),
        user: loggedInLabManager,
      },
    });
  });

  describe('Fetch Lab Report', () => {
    it('dispatches LAB_REPORT_LOADED action and returns data on success', async () => {
      const responseData = labReportResponseData;

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: responseData,
        }),
      );

      await store.dispatch(fetchLabReport());
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual(LAB_REPORT_LOADING);
      expect(actions[1].type).toEqual(LAB_REPORT_LOADED);
      expect(actions[1].payload).toEqual(responseData);
    });

    it('dispatches LAB_REPORT_ERROR action on faliure', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Error'));

      await store.dispatch(fetchLabReport());
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual(LAB_REPORT_LOADING);
      expect(actions[1].type).toEqual(LAB_REPORT_ERROR);
    });
  });
});
