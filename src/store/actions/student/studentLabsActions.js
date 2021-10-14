/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import httpHeaderConfig from '../../httpHeaderConfig';
import {
  LABS_ERROR,
  LABS_LOADED,
  LABS_LOADING,
} from '../../actionTypes/studentActionTypes';
import { API_STUDENT_LABS_URL } from '../../apiConfig';

/* Load labs */
export const fetchLabs = () => (dispatch, getState) => {
  dispatch({ type: LABS_LOADING });
  axios
    .get(API_STUDENT_LABS_URL, httpHeaderConfig(getState))
    .then(res => {
      dispatch({
        type: LABS_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: LABS_ERROR,
      });
    });
};
