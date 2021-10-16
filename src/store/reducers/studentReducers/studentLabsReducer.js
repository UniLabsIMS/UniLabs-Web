import Lab from '../../../models/lab';
import Department from '../../../models/department';
import {
  STUDENT_LABS_ERROR,
  STUDENT_LABS_LOADED,
  STUDENT_LABS_LOADING,
} from '../../actionTypes/studentActionTypes';

const initialState = {
  labs: [],
  departments: [],
  isLabsLoading: false,
  isLabsError: false,
  reloadLabs: false,
};

const studentLabsReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT_LABS_LOADING:
      return {
        ...state,
        isLabsLoading: true,
        isLabsError: false,
        reloadLabs: false,
      };
    case STUDENT_LABS_LOADED:
      return {
        ...state,
        isLabsLoading: false,
        labs: action.payload.labs.map(obj => new Lab(obj)),
        departments: action.payload.departments.map(obj => new Department(obj)),
        isLabsError: false,
      };
    case STUDENT_LABS_ERROR:
      return {
        ...state,
        isLabsLoading: false,
        labs: [],
        departments: [],
        isLabsError: true,
      };
    default:
      return state;
  }
};
export default studentLabsReducer;
