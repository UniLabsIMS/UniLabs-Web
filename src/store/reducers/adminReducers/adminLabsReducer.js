import Lab from '../../../models/lab';
import Lecturer from '../../../models/lecturer';
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

const initialState = {
  labs: [],
  lecturers: [], // needed to assign lecturers
  isLabsLoading: false,
  isLabsError: false,
  newLabLoading: false,
  newLabError: false,
  newLabSuccess: false,
  reloadLabs: false,
  assignLecturerLoading: false,
  assignLecturerSuccess: false,
  assignLecturerError: false,
};

const adminLabsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_LAB_STATE:
      return initialState;
    case LABS_LOADING:
      return {
        ...state,
        isLabsLoading: true,
        isLabsError: false,
        reloadLab: false,
      };
    case LABS_LOADED:
      return {
        ...state,
        isLabsLoading: false,
        labs: action.payload.labs.map(obj => new Lab(obj)),
        lecturers: action.payload.lecturers.map(obj => new Lecturer(obj)),
        isLabsError: false,
      };
    case LABS_ERROR:
      return {
        ...state,
        isLabsLoading: false,
        labs: [],
        lecturers: [],
        isLabsError: true,
      };
    case NEW_LAB_LOADING:
      return {
        ...state,
        newLabLoading: true,
        isLabsError: false,
        newLabError: false,
        newLabSuccess: false,
        reloadLabs: false,
      };
    case NEW_LAB_SUCCESS:
      return {
        ...state,
        newLabLoading: false,
        newLabSuccess: true,
        reloadLabs: true,
      };
    case NEW_LAB_FAIL:
      return {
        ...state,
        newLabLoading: false,
        newLabError: true,
      };
    case DEPT_LABS_LOADING:
      return {
        ...state,
        isLabsLoading: true,
        isLabsError: false,
        reloadLab: false,
      };
    case DEPT_LABS_LOADED:
      return {
        ...state,
        isLabsLoading: false,
        labs: action.payload.map(obj => new Lab(obj)),
        isLabsError: false,
      };
    case DEPT_LABS_ERROR:
      return {
        ...state,
        isLabsLoading: false,
        labs: [],
        isLabsError: true,
      };
    case LAB_ASSIGN_LECTURER_LOADING:
      return {
        ...state,
        assignLecturerLoading: true,
        assignLecturerSuccess: false,
        assignLecturerError: false,
      };
    case LAB_ASSIGN_LECTURER_SUCCESS:
      return {
        ...state,
        labs: action.payload,
        assignLecturerLoading: false,
        assignLecturerSuccess: true,
        assignLecturerError: false,
      };
    case LAB_ASSIGN_LECTURER_ERROR:
      return {
        ...state,
        assignLecturerLoading: false,
        assignLecturerSuccess: false,
        assignLecturerError: true,
      };
    case LAB_ASSIGN_LECTURER_RESET:
      return {
        ...state,
        assignLecturerLoading: false,
        assignLecturerSuccess: false,
        assignLecturerError: false,
      };
    default:
      return state;
  }
};
export default adminLabsReducer;
