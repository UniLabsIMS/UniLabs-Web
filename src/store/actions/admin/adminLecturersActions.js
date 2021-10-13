/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import httpHeaderConfig from '../../httpHeaderConfig';
import {
  LECTURERS_ERROR,
  LECTURERS_LOADED,
  LECTURERS_LOADING,
  LECTURER_BLOCK_UNBLOCK_ERROR,
  LECTURER_BLOCK_UNBLOCK_LOADING,
  LECTURER_BLOCK_UNBLOCK_SUCCESS,
  NEW_LECTURER_FAIL,
  NEW_LECTURER_LOADING,
  NEW_LECTURER_SUCCESS,
  RESET_LECTURER_STATE,
} from '../../actionTypes/adminActionTypes';
import {
  API_ADMIN_LECTURERS_URL,
  API_ADMIN_NEW_LECTURER_URL,
  API_BLOCK_UNBLOCK_USER,
} from '../../apiConfig';

/* Load lecturer */
export const fetchLecturers = () => (dispatch, getState) => {
  dispatch({ type: LECTURERS_LOADING });
  axios
    .get(API_ADMIN_LECTURERS_URL, httpHeaderConfig(getState))
    .then(res => {
      dispatch({
        type: LECTURERS_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: LECTURERS_ERROR,
      });
    });
};

/* Add lecturer */
export const addLecturer =
  (email, lecturerId, department, permittedLabs) => (dispatch, getState) => {
    dispatch({ type: NEW_LECTURER_LOADING });
    const formData = new FormData();
    formData.append('email', email);
    formData.append('lecturer_id', lecturerId);
    formData.append('department', department);
    formData.append('permitted_labs', permittedLabs);
    axios
      .post(API_ADMIN_NEW_LECTURER_URL, formData, httpHeaderConfig(getState))
      .then(res => {
        dispatch({
          type: NEW_LECTURER_SUCCESS,
          payload: res.data,
        });
      })
      .catch(err => {
        dispatch({
          type: NEW_LECTURER_FAIL,
        });
      });
  };

/* Block unblock lecturer */
export const blockUnblockLecturer =
  (userID, isBlocked) => (dispatch, getState) => {
    dispatch({ type: LECTURER_BLOCK_UNBLOCK_LOADING });
    const formData = new FormData();
    formData.append('blocked', isBlocked);
    axios
      .put(
        API_BLOCK_UNBLOCK_USER.concat(`${userID}`),
        formData,
        httpHeaderConfig(getState),
      )
      .then(res => {
        const updatedLecturers = getState().adminLecturers.lecturers.map(
          lecturer => {
            if (lecturer.id === userID) {
              return lecturer.updateBlocked(isBlocked);
            }
            return lecturer;
          },
        );
        dispatch({
          type: LECTURER_BLOCK_UNBLOCK_SUCCESS,
          payload: updatedLecturers,
        });
      })
      .catch(err => {
        dispatch({
          type: LECTURER_BLOCK_UNBLOCK_ERROR,
        });
      });
  };
/* Reset State */
export const resetAdminLecturerState = () => (dispatch, getState) => {
  dispatch({ type: RESET_LECTURER_STATE });
};
