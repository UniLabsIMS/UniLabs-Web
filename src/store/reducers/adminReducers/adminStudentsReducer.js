import Student from '../../../models/student';
import {
  STUDENTS_ERROR,
  STUDENTS_LOADED,
  STUDENTS_LOADING,
  NEW_STUDENT_FAIL,
  NEW_STUDENT_LOADING,
  NEW_STUDENT_SUCCESS,
  RESET_STUDENT_STATE,
  STUDENT_BLOCK_UNBLOCK_LOADING,
  STUDENT_BLOCK_UNBLOCK_SUCCESS,
  STUDENT_BLOCK_UNBLOCK_ERROR,
} from '../../actionTypes/adminActionTypes';

const initialState = {
  students: [],
  isStudentsLoading: false,
  isStudentsError: false,
  newStudentLoading: false,
  newStudentError: false,
  newStudentSuccess: false,
  reloadStudents: false,
  studentBlockUnblockLoading: false,
  studentBlockUnblockLSuccess: false,
  studentBlockUnblockError: false,
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
        studentBlockUnblockLoading: false,
        studentBlockUnblockLSuccess: false,
        studentBlockUnblockError: false,
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
        studentBlockUnblockLoading: false,
        studentBlockUnblockLSuccess: false,
        studentBlockUnblockError: false,
      };
    case NEW_STUDENT_SUCCESS:
      return {
        ...state,
        students: action.payload,
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
    case STUDENT_BLOCK_UNBLOCK_LOADING:
      return {
        ...state,
        studentBlockUnblockLoading: true,
        studentBlockUnblockLSuccess: false,
        studentBlockUnblockError: false,
        newStudentLoading: false,
        newStudentError: false,
        newStudentSuccess: false,
      };
    case STUDENT_BLOCK_UNBLOCK_SUCCESS:
      return {
        ...state,
        studentBlockUnblockLoading: false,
        studentBlockUnblockLSuccess: true,
        studentBlockUnblockError: false,
      };
    case STUDENT_BLOCK_UNBLOCK_ERROR:
      return {
        ...state,
        studentBlockUnblockLoading: false,
        studentBlockUnblockLSuccess: false,
        studentBlockUnblockError: true,
      };
    default:
      return state;
  }
};
export default adminStudentsReducer;
