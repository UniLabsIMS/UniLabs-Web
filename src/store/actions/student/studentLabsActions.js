/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import httpHeaderConfig from '../../httpHeaderConfig';
import {
  STUDENT_LABS_ERROR,
  STUDENT_LABS_LOADED,
  STUDENT_LABS_LOADING,
} from '../../actionTypes/studentActionTypes';
import {
  API_STUDENT_DEPARTMENTS_URL,
  API_STUDENT_LABS_URL,
} from '../../apiConfig';

/* Load labs */
export const fetchLabsStudent = () => (dispatch, getState) => {
  dispatch({ type: STUDENT_LABS_LOADING });
  axios
    .get(API_STUDENT_LABS_URL, httpHeaderConfig(getState))
    .then(res => {
      axios
        .get(API_STUDENT_DEPARTMENTS_URL, httpHeaderConfig(getState))
        .then(depRes => {
          dispatch({
            type: STUDENT_LABS_LOADED,
            payload: { labs: res.data, departments: depRes.data },
          });
        })
        .catch(err => {
          dispatch({
            type: STUDENT_LABS_ERROR,
          });
        });
    })
    .catch(err => {
      dispatch({
        type: STUDENT_LABS_ERROR,
      });
    });
};
