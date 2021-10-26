/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import httpHeaderConfig from '../../httpHeaderConfig';
import {
  LECTURER_REQUEST_APPROVE_OR_DECLINE_LOADING,
  LECTURER_REQUEST_APPROVE_OR_DECLINE_SUCCESS,
  LECTURER_REQUEST_APPROVE_OR_DECLINE_FAIL,
  LECTURER_REQUEST_APPROVE_OR_DECLINE_RESET,
} from '../../actionTypes/lecturerActionTypes';
import { API_LECTURER_APPROVE_OR_DECLINE_REQUESTS_URL } from '../../apiConfig';

/* Apporve Or Decline Request */
export const ApproveorDeclineStudentRequest =
  (requestId, reqState) => (dispatch, getState) => {
    dispatch({ type: LECTURER_REQUEST_APPROVE_OR_DECLINE_LOADING });
    const formData = new FormData();
    formData.append('state', reqState);
    axios
      .put(
        API_LECTURER_APPROVE_OR_DECLINE_REQUESTS_URL.concat(requestId),
        formData,
        httpHeaderConfig(getState),
      )
      .then(
        res => {
          dispatch({
            type: LECTURER_REQUEST_APPROVE_OR_DECLINE_SUCCESS,
            payload: res.data,
          });
        },
        err => {
          dispatch({
            type: LECTURER_REQUEST_APPROVE_OR_DECLINE_FAIL,
          });
        },
      );
  };

export const resetApproveorDeclineState = () => (dispatch, getState) => {
  dispatch({ type: LECTURER_REQUEST_APPROVE_OR_DECLINE_RESET });
};
