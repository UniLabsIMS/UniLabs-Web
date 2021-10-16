/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  LAB_REPORT_LOADING,
  LAB_REPORT_LOADED,
  LAB_REPORT_ERROR,
} from '../../actionTypes/labManagerActionTypes';
import { API_LAB_MANAGER_LAB_REPORT_URL } from '../../apiConfig';
import httpHeaderConfig from '../../httpHeaderConfig';

/* Load categories */
export const fetchLabReport = () => (dispatch, getState) => {
  dispatch({ type: LAB_REPORT_LOADING });
  axios
    .get(
      API_LAB_MANAGER_LAB_REPORT_URL.concat(
        getState().auth.user.otherDetails.lab.id,
      ),
      httpHeaderConfig(getState),
    )
    .then(res => {
      dispatch({
        type: LAB_REPORT_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: LAB_REPORT_ERROR,
      });
    });
};
