import Lab from '../../../models/lab';
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
} from '../../actionTypes/adminActionTypes';

const initialState = {
  labs: [],
  isLabsLoading: false,
  isLabsError: false,
  newLabLoading: false,
  newLabError: false,
  newLabSuccess: false,
  reloadLabs: false,
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
        labs: action.payload.map(obj => new Lab(obj)),
        isLabsError: false,
      };
    case LABS_ERROR:
      return {
        ...state,
        isLabsLoading: false,
        labs: [],
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
    default:
      return state;
  }
};
export default adminLabsReducer;
