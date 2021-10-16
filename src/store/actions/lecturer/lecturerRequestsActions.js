/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import httpHeaderConfig from '../../httpHeaderConfig';
import {
  LECTURER_REQUESTS_LOADING,
  LECTURER_REQUESTS_LOADED,
  LECTURER_REQUESTS_ERROR,
} from '../../actionTypes/lecturerActionTypes';
import { API_LECTURER_REQUESTS_URL } from '../../apiConfig';

/* Load requests */
export const fetchLecturerRequests = () => (dispatch, getState) => {
  dispatch({ type: LECTURER_REQUESTS_LOADING });
  axios
    .get(API_LECTURER_REQUESTS_URL, httpHeaderConfig(getState))
    .then(res => {
      dispatch({
        type: LECTURER_REQUESTS_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: LECTURER_REQUESTS_ERROR,
      });
    });
};
