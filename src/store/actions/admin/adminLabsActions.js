/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import httpHeaderConfig from '../../httpHeaderConfig';
import {
  LABS_ERROR,
  LABS_LOADED,
  LABS_LOADING,
  NEW_LAB_FAIL,
  NEW_LAB_LOADING,
  NEW_LAB_SUCCESS,
  RESET_LAB_STATE,
  DEPT_LABS_ERROR,
  DEPT_LABS_LOADED,
  DEPT_LABS_LOADING,
  LAB_ASSIGN_LECTURER_LOADING,
  LAB_ASSIGN_LECTURER_SUCCESS,
  LAB_ASSIGN_LECTURER_ERROR,
  LAB_ASSIGN_LECTURER_RESET,
} from '../../actionTypes/adminActionTypes';
import {
  API_ADMIN_LABS_URL,
  API_ADMIN_NEW_LAB_URL,
  API_ADMIN_DEPT_LABS_URL,
  API_ADMIN_LECTURERS_URL,
  API_ADMIN_LAB_ASSIGN_LECTURER_URL,
} from '../../apiConfig';
import AssignedLecturer from '../../../models/assignedLecturer';

/* Load labs */
export const fetchLabs = () => (dispatch, getState) => {
  dispatch({ type: LABS_LOADING });
  axios
    .get(API_ADMIN_LABS_URL, httpHeaderConfig(getState))
    .then(res => {
      axios
        .get(API_ADMIN_LECTURERS_URL, httpHeaderConfig(getState))
        .then(resLecs => {
          dispatch({
            type: LABS_LOADED,
            payload: { labs: res.data, lecturers: resLecs.data },
          });
        })
        .catch(err => {
          dispatch({
            type: LABS_ERROR,
          });
        });
    })
    .catch(err => {
      dispatch({
        type: LABS_ERROR,
      });
    });
};

/* Load deptLabs */
export const fetchDeptLabs = deptID => (dispatch, getState) => {
  dispatch({ type: DEPT_LABS_LOADING });
  const API_ADMIN_DEPT_LABS_FINAL_URL = API_ADMIN_DEPT_LABS_URL.concat(deptID);
  axios
    .get(API_ADMIN_DEPT_LABS_FINAL_URL, httpHeaderConfig(getState))
    .then(res => {
      dispatch({
        type: DEPT_LABS_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: DEPT_LABS_ERROR,
      });
    });
};

/* Add lab */
export const addLab =
  (name, department, location, contactNo, contactEmail, image) =>
  (dispatch, getState) => {
    dispatch({ type: NEW_LAB_LOADING });
    const formData = new FormData();
    formData.append('name', name);
    formData.append('department', department);
    formData.append('location', location);
    formData.append('contact_no', contactNo);
    formData.append('contact_email', contactEmail);
    if (image) {
      formData.append('image', image);
    }
    axios
      .post(API_ADMIN_NEW_LAB_URL, formData, httpHeaderConfig(getState))
      .then(res => {
        dispatch({
          type: NEW_LAB_SUCCESS,
          payload: res.data,
        });
      })
      .catch(err => {
        dispatch({
          type: NEW_LAB_FAIL,
        });
      });
  };

/*
Assign lecturer */
export const assignLecturer = (labID, lecturer) => (dispatch, getState) => {
  dispatch({ type: LAB_ASSIGN_LECTURER_LOADING });
  const formData = new FormData();
  formData.append('lab', labID);
  formData.append('lecturers', [lecturer.id]); // need to pass as a list
  axios
    .post(
      API_ADMIN_LAB_ASSIGN_LECTURER_URL,
      formData,
      httpHeaderConfig(getState),
    )
    .then(res => {
      const updatedLabs = getState().adminLabs.labs.map(lab => {
        if (labID === lab.id) {
          lab.assignedLecturers.push(AssignedLecturer.fromLecturer(lecturer));
        }
        return lab;
      });
      dispatch({
        type: LAB_ASSIGN_LECTURER_SUCCESS,
        payload: updatedLabs,
      });
    })
    .catch(err => {
      dispatch({
        type: LAB_ASSIGN_LECTURER_ERROR,
      });
    });
};
/* Reset State */
export const resetAdminLabState = () => (dispatch, getState) => {
  dispatch({ type: RESET_LAB_STATE });
};
/* Reset Lecturer Assign State */
export const resetLabLecturerAssignState = () => (dispatch, getState) => {
  dispatch({ type: LAB_ASSIGN_LECTURER_RESET });
};
