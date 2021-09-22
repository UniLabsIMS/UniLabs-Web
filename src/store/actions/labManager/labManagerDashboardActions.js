/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  CATEGORIES_ERROR,
  CATEGORIES_LOADED,
  CATEGORIES_LOADING,
} from '../../actionTypes/labManagerActionTypes';
import { API_LAB_MANAGER_ALL_CATEGORIES_URL } from '../../apiConfig';
import httpHeaderConfig from '../../httpHeaderConfig';

/* Load categories */
export const fetchCategories = () => (dispatch, getState) => {
  dispatch({ type: CATEGORIES_LOADING });
  axios
    .get(
      API_LAB_MANAGER_ALL_CATEGORIES_URL.concat(
        getState().auth.user.other_details.lab.id,
      ),
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
