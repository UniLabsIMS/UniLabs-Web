import axios from 'axios';
import httpHeaderConfig from '../../httpHeaderConfig';
import {
  ADMIN_SYSTEM_REPORT_LOADING,
  ADMIN_SYSTEM_REPORT_LOADED,
  ADMIN_SYSTEM_REPORT_ERROR,
  ADMIN_SYSTEM_REPORT_RESET,
  ADMIN_LAB_REPORT_LOADING,
  ADMIN_LAB_REPORT_LOADED,
  ADMIN_LAB_REPORT_ERROR,
} from '../../actionTypes/adminActionTypes';
import {
  API_ADMIN_LABS_URL,
  API_ADMIN_SYSTEM_REPORT_URL,
  API_ADMIN_LAB_REPORT_URL,
} from '../../apiConfig';

/* fetch system report */
export const fetchSystemReport = () => (dispatch, getState) => {
  dispatch({ type: ADMIN_SYSTEM_REPORT_LOADING });
  axios
    .get(API_ADMIN_SYSTEM_REPORT_URL, httpHeaderConfig(getState))
    .then(res => {
      axios
        .get(API_ADMIN_LABS_URL, httpHeaderConfig(getState))
        .then(labRes => {
          dispatch({
            type: ADMIN_SYSTEM_REPORT_LOADED,
            payload: { report: res.data, labs: labRes.data },
          });
        })
        .catch(err => {
          dispatch({
            type: ADMIN_SYSTEM_REPORT_ERROR,
          });
        });
    })
    .catch(err => {
      dispatch({
        type: ADMIN_SYSTEM_REPORT_ERROR,
      });
    });
};

/* fetch lab report */
export const fetchLabReport = labId => (dispatch, getState) => {
  dispatch({ type: ADMIN_LAB_REPORT_LOADING });
  axios
    .get(API_ADMIN_LAB_REPORT_URL.concat(labId), httpHeaderConfig(getState))
    .then(res => {
      dispatch({
        type: ADMIN_LAB_REPORT_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: ADMIN_LAB_REPORT_ERROR,
      });
    });
};

/* Reset State */
export const resetSystemReportState = () => (dispatch, getState) => {
  dispatch({ type: ADMIN_SYSTEM_REPORT_RESET });
};
