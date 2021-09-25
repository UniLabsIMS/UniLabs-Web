import Student from '../../../models/student';
import {
  STUDENTS_ERROR,
  STUDENTS_LOADED,
  STUDENTS_LOADING,
  NEW_STUDENT_FAIL,
  NEW_STUDENT_LOADING,
  NEW_STUDENT_SUCCESS,
  RESET_STUDENT_STATE,
} from '../../actionTypes/adminActionTypes';

const initialState = {
  students: [],
  isStudentsLoading: false,
  isStudentsError: false,
  newStudentLoading: false,
  newStudentError: false,
  newStudentSuccess: false,
  reloadStudents: false,
};

const adminStudentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STUDENT_STATE:
      return initialState;
    case STUDENTS_LOADING:
      return {
        ...state,
        isStudentsLoading: true,
        isStudentsError: false,
        reloadStudent: false,
      };
    case STUDENTS_LOADED:
      return {
        ...state,
        isStudentsLoading: false,
        students: action.payload.map(obj => new Student(obj)),
        isStudentsError: false,
      };
    case STUDENTS_ERROR:
      return {
        ...state,
        isStudentsLoading: false,
        students: [],
        isStudentsError: true,
      };
    case NEW_STUDENT_LOADING:
      return {
        ...state,
        newStudentLoading: true,
        isStudentsError: false,
        newStudentError: false,
        newStudentSuccess: false,
        reloadStudents: false,
      };
    case NEW_STUDENT_SUCCESS:
      return {
        ...state,
        newStudentLoading: false,
        newStudentSuccess: true,
        reloadStudents: true,
      };
    case NEW_STUDENT_FAIL:
      return {
        ...state,
        newStudentLoading: false,
        newStudentError: true,
      };

    default:
      return state;
  }
};
export default adminStudentsReducer;
