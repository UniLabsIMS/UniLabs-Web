import LecturerRequest from '../../../models/lecturerRequest';
import {
  LECTURER_REQUEST_LOADING,
  LECTURER_REQUEST_LOADED,
  LECTURER_REQUEST_ERROR,
} from '../../actionTypes/lecturerActionTypes';

const initialState = {
  request: null,
  isRequestLoading: false,
  isRequestError: false,
  reloadRequest: false,
};

const lecturerRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case LECTURER_REQUEST_LOADING:
      return {
        ...state,
        isRequestLoading: true,
        isRequestError: false,
        reloadRequest: false,
      };
    case LECTURER_REQUEST_LOADED:
      return {
        ...state,
        isRequestLoading: false,
        request: new LecturerRequest(action.payload),
        isRequestError: false,
      };
    case LECTURER_REQUEST_ERROR:
      return {
        ...state,
        isRequestLoading: false,
        request: null,
        isRequestError: true,
      };
    default:
      return state;
  }
};
export default lecturerRequestReducer;
