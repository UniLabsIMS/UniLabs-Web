import Lecturer from '../../../models/lecturer';
import {
  LECTURERS_ERROR,
  LECTURERS_LOADED,
  LECTURERS_LOADING,
  NEW_LECTURER_FAIL,
  NEW_LECTURER_LOADING,
  NEW_LECTURER_SUCCESS,
  RESET_LECTURER_STATE,
  LECTURER_BLOCK_UNBLOCK_LOADING,
  LECTURER_BLOCK_UNBLOCK_SUCCESS,
  LECTURER_BLOCK_UNBLOCK_ERROR,
} from '../../actionTypes/adminActionTypes';

const initialState = {
  lecturers: [],
  isLecturersLoading: false,
  isLecturersError: false,
  newLecturerLoading: false,
  newLecturerError: false,
  newLecturerSuccess: false,
  reloadLecturers: false,
  lecturerBlockUnblockLoading: false,
  lecturerBlockUnblockLSuccess: false,
  lecturerBlockUnblockError: false,
};

const adminLecturersReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_LECTURER_STATE:
      return initialState;
    case LECTURERS_LOADING:
      return {
        ...state,
        isLecturersLoading: true,
        isLecturersError: false,
        reloadLecturer: false,
        lecturerBlockUnblockLoading: false,
        lecturerBlockUnblockLSuccess: false,
        lecturerBlockUnblockError: false,
      };
    case LECTURERS_LOADED:
      return {
        ...state,
        isLecturersLoading: false,
        lecturers: action.payload.map(obj => new Lecturer(obj)),
        isLecturersError: false,
      };
    case LECTURERS_ERROR:
      return {
        ...state,
        isLecturersLoading: false,
        lecturers: [],
        isLecturersError: true,
      };
    case NEW_LECTURER_LOADING:
      return {
        ...state,
        newLecturerLoading: true,
        isLecturersError: false,
        newLecturerError: false,
        newLecturerSuccess: false,
        reloadLecturers: false,
        lecturerBlockUnblockLoading: false,
        lecturerBlockUnblockLSuccess: false,
        lecturerBlockUnblockError: false,
      };
    case NEW_LECTURER_SUCCESS:
      return {
        ...state,
        newLecturerLoading: false,
        newLecturerSuccess: true,
        reloadLecturers: true,
      };
    case NEW_LECTURER_FAIL:
      return {
        ...state,
        newLecturerLoading: false,
        newLecturerError: true,
      };
    case LECTURER_BLOCK_UNBLOCK_LOADING:
      return {
        ...state,
        lecturerBlockUnblockLoading: true,
        lecturerBlockUnblockLSuccess: false,
        lecturerBlockUnblockError: false,
        newLecturerLoading: false,
        newLecturerError: false,
        newLecturerSuccess: false,
      };
    case LECTURER_BLOCK_UNBLOCK_SUCCESS:
      return {
        ...state,
        lecturerBlockUnblockLoading: false,
        lecturerBlockUnblockLSuccess: true,
        lecturerBlockUnblockError: false,
      };
    case LECTURER_BLOCK_UNBLOCK_ERROR:
      return {
        ...state,
        lecturerBlockUnblockLoading: false,
        lecturerBlockUnblockLSuccess: false,
        lecturerBlockUnblockError: true,
      };
    default:
      return state;
  }
};
export default adminLecturersReducer;
