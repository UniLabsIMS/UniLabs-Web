import axios from 'axios';
import httpHeaderConfig from '../../httpHeaderConfig';
import {
  ADMIN_SYSTEM_REPORT_LOADING,
  ADMIN_SYSTEM_REPORT_LOADED,
  ADMIN_SYSTEM_REPORT_ERROR,
  ADMIN_SYSTEM_REPORT_RESET,
} from '../../actionTypes/adminActionTypes';
import { API_ADMIN_SYSTEM_REPORT_URL } from '../../apiConfig';

/* Load departments */
export const fetchSystemReport = () => (dispatch, getState) => {
  dispatch({ type: ADMIN_SYSTEM_REPORT_LOADING });
  axios
    .get(API_ADMIN_SYSTEM_REPORT_URL, httpHeaderConfig(getState))
    .then(res => {
      dispatch({
        type: ADMIN_SYSTEM_REPORT_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: ADMIN_SYSTEM_REPORT_ERROR,
      });
    });
};

/* Reset State */
export const resetSystemReportState = () => (dispatch, getState) => {
  dispatch({ type: ADMIN_SYSTEM_REPORT_RESET });
};
