/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import httpHeaderConfig from '../../httpHeaderConfig';
import {
  LECTURER_REQUEST_LOADING,
  LECTURER_REQUEST_LOADED,
  LECTURER_REQUEST_ERROR,
} from '../../actionTypes/lecturerActionTypes';
import { API_LECTURER_REQUEST_URL } from '../../apiConfig';

/* Load request */
export const fetchLecturerRequest = requestId => (dispatch, getState) => {
  dispatch({ type: LECTURER_REQUEST_LOADING });
  axios
    .get(API_LECTURER_REQUEST_URL.concat(requestId), httpHeaderConfig(getState))
    .then(
      res => {
        dispatch({
          type: LECTURER_REQUEST_LOADED,
          payload: res.data,
        });
      },
      err => {
        dispatch({
          type: LECTURER_REQUEST_ERROR,
        });
      },
    );
};
