/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  CATEGORIES_ERROR,
  CATEGORIES_LOADED,
  CATEGORIES_LOADING,
  RESET_CATEGORIES_STATE,
} from '../../actionTypes/labAssistantActionTypes';
import { API_LAB_ASSISTANT_ALL_CATEGORIES_URL } from '../../apiConfig';
import httpHeaderConfig from '../../httpHeaderConfig';

/* Load categories */
export const fetchLabAssistantCategories = () => (dispatch, getState) => {
  dispatch({ type: CATEGORIES_LOADING });
  axios
    .get(
      API_LAB_ASSISTANT_ALL_CATEGORIES_URL.concat(
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

/* Reset State */
export const resetLabAssistantCategoriesState = () => (dispatch, getState) => {
  dispatch({ type: RESET_CATEGORIES_STATE });
};
