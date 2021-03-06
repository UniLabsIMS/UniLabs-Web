/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import httpHeaderConfig from '../../httpHeaderConfig';
import {
  LAB_ASSISTANTS_ERROR,
  LAB_ASSISTANTS_LOADED,
  LAB_ASSISTANTS_LOADING,
  NEW_LAB_ASSISTANT_FAIL,
  NEW_LAB_ASSISTANT_LOADING,
  NEW_LAB_ASSISTANT_SUCCESS,
  RESET_LAB_ASSISTANT_STATE,
  LAB_ASSISTANT_BLOCK_UNBLOCK_LOADING,
  LAB_ASSISTANT_BLOCK_UNBLOCK_SUCCESS,
  LAB_ASSISTANT_BLOCK_UNBLOCK_ERROR,
} from '../../actionTypes/adminActionTypes';
import {
  API_ADMIN_LAB_ASSISTANTS_URL,
  API_ADMIN_NEW_LAB_ASSISTANT_URL,
  API_BLOCK_UNBLOCK_USER,
} from '../../apiConfig';

/* Load labAssistants */
export const fetchLabAssistants = () => (dispatch, getState) => {
  dispatch({ type: LAB_ASSISTANTS_LOADING });
  axios.get(API_ADMIN_LAB_ASSISTANTS_URL, httpHeaderConfig(getState)).then(
    res => {
      dispatch({
        type: LAB_ASSISTANTS_LOADED,
        payload: res.data,
      });
    },
    err => {
      dispatch({
        type: LAB_ASSISTANTS_ERROR,
      });
    },
  );
};

/* Add labAssistant */
export const addLabAssistant = (email, lab) => (dispatch, getState) => {
  dispatch({ type: NEW_LAB_ASSISTANT_LOADING });
  const formData = new FormData();
  formData.append('email', email);
  formData.append('lab', lab);
  axios
    .post(API_ADMIN_NEW_LAB_ASSISTANT_URL, formData, httpHeaderConfig(getState))
    .then(
      res => {
        dispatch({
          type: NEW_LAB_ASSISTANT_SUCCESS,
          payload: res.data,
        });
      },
      err => {
        dispatch({
          type: NEW_LAB_ASSISTANT_FAIL,
        });
      },
    );
};
/* Block unblock lab assistant */
export const blockUnblockLabAssistant =
  (userID, isBlocked) => (dispatch, getState) => {
    dispatch({ type: LAB_ASSISTANT_BLOCK_UNBLOCK_LOADING });
    const formData = new FormData();
    formData.append('blocked', isBlocked);
    axios
      .put(
        API_BLOCK_UNBLOCK_USER.concat(`${userID}`),
        formData,
        httpHeaderConfig(getState),
      )
      .then(
        res => {
          const updatedLabAssistants =
            getState().adminLabAssistants.labAssistants.map(labAssistant => {
              if (labAssistant.id === userID) {
                return labAssistant.updateBlocked(isBlocked);
              }
              return labAssistant;
            });
          dispatch({
            type: LAB_ASSISTANT_BLOCK_UNBLOCK_SUCCESS,
            payload: updatedLabAssistants,
          });
        },
        err => {
          dispatch({
            type: LAB_ASSISTANT_BLOCK_UNBLOCK_ERROR,
          });
        },
      );
  };
/* Reset State */
export const resetAdminLabAssistantState = () => (dispatch, getState) => {
  dispatch({ type: RESET_LAB_ASSISTANT_STATE });
};
