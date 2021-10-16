import axios from 'axios';
import {
  STUDENT_BORROWED_ITEMS_ERROR,
  STUDENT_BORROWED_ITEMS_LOADED,
  STUDENT_BORROWED_ITEMS_LOADING,
  RESET_STUDENT_BORROWED_ITEMS_STATE,
} from '../../actionTypes/studentActionTypes';
import { API_STUDENT_CURRENTLY_BORROWED_ITEMS_URL } from '../../apiConfig';
import httpHeaderConfig from '../../httpHeaderConfig';

/* Load borrowed items */
export const fetchStudentBorrowedItems = () => (dispatch, getState) => {
  dispatch({ type: STUDENT_BORROWED_ITEMS_LOADING });
  axios
    .get(
      API_STUDENT_CURRENTLY_BORROWED_ITEMS_URL.concat(getState().auth.user.id),
      httpHeaderConfig(getState),
    )
    .then(res => {
      dispatch({
        type: STUDENT_BORROWED_ITEMS_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: STUDENT_BORROWED_ITEMS_ERROR,
      });
    });
};

/* Reset State */
export const resetStudentBorrowedItemsState = () => (dispatch, getState) => {
  dispatch({ type: RESET_STUDENT_BORROWED_ITEMS_STATE });
};
