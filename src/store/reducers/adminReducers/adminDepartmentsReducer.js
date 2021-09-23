import Department from '../../../models/department';
import {
  DEPARTMENTS_ERROR,
  DEPARTMENTS_LOADED,
  DEPARTMENTS_LOADING,
  NEW_DEPARTMENT_FAIL,
  NEW_DEPARTMENT_LOADING,
  NEW_DEPARTMENT_SUCCESS,
  RESET_DEPARTMENT_STATE,
} from '../../actionTypes/adminActionTypes';

const initialState = {
  departments: [],
  isDepartmentsLoading: false,
  isDepartmentsError: false,
  newDepartmentsLoading: false,
  newDepartmentsError: false,
  newDepartmentsSuccess: false,
  reloadDepartments: false,
};

const adminDepartmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_DEPARTMENT_STATE:
      return initialState;
    case DEPARTMENTS_LOADING:
      return {
        ...state,
        isDepartmentsLoading: true,
        isDepartmentsError: false,
        reloadDepartment: false,
      };
    case DEPARTMENTS_LOADED:
      return {
        ...state,
        isDepartmentsLoading: false,
        departments: action.payload.map(obj => new Department(obj)),
        isDepartmentsError: false,
      };
    case DEPARTMENTS_ERROR:
      return {
        ...state,
        isDepartmentsLoading: false,
        departments: [],
        isDepartmentsError: true,
      };
    case NEW_DEPARTMENT_LOADING:
      return {
        ...state,
        newDepartmentLoading: true,
        isDepartmentsError: false,
        newDepartmentError: false,
        newDepartmentSuccess: false,
        reloadDepartments: false,
      };
    case NEW_DEPARTMENT_SUCCESS:
      return {
        ...state,
        newDepartmentLoading: false,
        newDepartmentSuccess: true,
        reloadDepartments: true,
      };
    case NEW_DEPARTMENT_FAIL:
      return {
        ...state,
        newDepartmentLoading: false,
        newDepartmentError: true,
      };

    default:
      return state;
  }
};
export default adminDepartmentsReducer;
