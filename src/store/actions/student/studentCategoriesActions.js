/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  CATEGORIES_ERROR,
  CATEGORIES_LOADED,
  CATEGORIES_LOADING,
} from '../../actionTypes/studentActionTypes';
import { API_STUDENT_CATEGORIES_URL } from '../../apiConfig';
import httpHeaderConfig from '../../httpHeaderConfig';

/* Load categories */
export const fetchCategories = labId => (dispatch, getState) => {
  dispatch({ type: CATEGORIES_LOADING });
  axios
    .get(
      API_STUDENT_CATEGORIES_URL.concat(labId.toString()),
      httpHeaderConfig(getState),
    )
    .then(res => {
      dispatch({
        type: CATEGORIES_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: CATEGORIES_ERROR,
      });
    });
};
