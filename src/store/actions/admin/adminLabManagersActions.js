/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import httpHeaderConfig from '../../httpHeaderConfig';
import {
  LAB_MANAGERS_ERROR,
  LAB_MANAGERS_LOADED,
  LAB_MANAGERS_LOADING,
  LAB_MANAGER_BLOCK_UNBLOCK_ERROR,
  LAB_MANAGER_BLOCK_UNBLOCK_LOADING,
  LAB_MANAGER_BLOCK_UNBLOCK_SUCCESS,
  NEW_LAB_MANAGER_FAIL,
  NEW_LAB_MANAGER_LOADING,
  NEW_LAB_MANAGER_SUCCESS,
  RESET_LAB_MANAGER_STATE,
} from '../../actionTypes/adminActionTypes';
import {
  API_ADMIN_LAB_MANAGERS_URL,
  API_ADMIN_NEW_LAB_MANAGER_URL,
  API_BLOCK_UNBLOCK_USER,
} from '../../apiConfig';

/* Load labManagers */
export const fetchLabManagers = () => (dispatch, getState) => {
  dispatch({ type: LAB_MANAGERS_LOADING });
  axios
    .get(API_ADMIN_LAB_MANAGERS_URL, httpHeaderConfig(getState))
    .then(res => {
      dispatch({
        type: LAB_MANAGERS_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: LAB_MANAGERS_ERROR,
      });
    });
};

/* Add labManager */
export const addLabManager = (email, lab) => (dispatch, getState) => {
  dispatch({ type: NEW_LAB_MANAGER_LOADING });
  const formData = new FormData();
  formData.append('email', email);
  formData.append('lab', lab);
  axios
    .post(API_ADMIN_NEW_LAB_MANAGER_URL, formData, httpHeaderConfig(getState))
    .then(res => {
      dispatch({
        type: NEW_LAB_MANAGER_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: NEW_LAB_MANAGER_FAIL,
      });
    });
};
/* Block unblock lab manager */
export const blockUnblockLabManager =
  (userID, isBlocked) => (dispatch, getState) => {
    dispatch({ type: LAB_MANAGER_BLOCK_UNBLOCK_LOADING });
    const formData = new FormData();
    formData.append('blocked', isBlocked);
    axios
      .put(
        API_BLOCK_UNBLOCK_USER.concat(`${userID}`),
        formData,
        httpHeaderConfig(getState),
      )
      .then(res => {
        const updatedLabManagers = getState().adminLabManagers.labManagers.map(
          labManager => {
            if (labManager.id === userID) {
              return labManager.updateBlocked(isBlocked);
            }
            return labManager;
          },
        );
        dispatch({
          type: LAB_MANAGER_BLOCK_UNBLOCK_SUCCESS,
          payload: updatedLabManagers,
        });
      })
      .catch(err => {
        dispatch({
          type: LAB_MANAGER_BLOCK_UNBLOCK_ERROR,
        });
      });
  };
/* Reset State */
export const resetAdminLabManagerState = () => (dispatch, getState) => {
  dispatch({ type: RESET_LAB_MANAGER_STATE });
};
