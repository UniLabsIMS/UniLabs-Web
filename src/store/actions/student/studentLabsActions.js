/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import httpHeaderConfig from '../../httpHeaderConfig';
import {
  STUDENT_LABS_ERROR,
  STUDENT_LABS_LOADED,
  STUDENT_LABS_LOADING,
} from '../../actionTypes/studentActionTypes';
import { API_STUDENT_LABS_URL } from '../../apiConfig';

/* Load labs */
export const fetchLabsStudent = () => (dispatch, getState) => {
  dispatch({ type: STUDENT_LABS_LOADING });
  axios
    .get(API_STUDENT_LABS_URL, httpHeaderConfig(getState))
    .then(res => {
      dispatch({
        type: STUDENT_LABS_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: STUDENT_LABS_ERROR,
      });
    });
};
