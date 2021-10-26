/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  DISPLAY_ITEMS_ERROR,
  DISPLAY_ITEMS_LOADED,
  DISPLAY_ITEMS_LOADING,
} from '../../actionTypes/studentActionTypes';
import { API_STUDENT_DISPLAY_ITEMS_URL } from '../../apiConfig';
import httpHeaderConfig from '../../httpHeaderConfig';

/* Load display items */
export const fetchDisplayItems = categoryId => (dispatch, getState) => {
  dispatch({ type: DISPLAY_ITEMS_LOADING });
  axios
    .get(
      API_STUDENT_DISPLAY_ITEMS_URL.concat(categoryId),
      httpHeaderConfig(getState),
    )
    .then(
      res => {
        dispatch({
          type: DISPLAY_ITEMS_LOADED,
          payload: res.data,
        });
      },
      err => {
        dispatch({
          type: DISPLAY_ITEMS_ERROR,
        });
      },
    );
};
