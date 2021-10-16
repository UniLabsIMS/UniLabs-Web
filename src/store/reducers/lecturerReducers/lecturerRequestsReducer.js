import LecturerRequest from '../../../models/lecturerRequest';
import {
  LECTURER_REQUESTS_LOADING,
  LECTURER_REQUESTS_LOADED,
  LECTURER_REQUESTS_ERROR,
} from '../../actionTypes/lecturerActionTypes';

const initialState = {
  requests: [],
  isRequestsLoading: false,
  isRequestsError: false,
  reloadRequests: false,
};

const lecturerRequestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LECTURER_REQUESTS_LOADING:
      return {
        ...state,
        isRequestsLoading: true,
        isRequestsError: false,
        reloadRequests: false,
      };
    case LECTURER_REQUESTS_LOADED:
      return {
        ...state,
        isRequestsLoading: false,
        requests: action.payload.map(obj => new LecturerRequest(obj)),
        isRequestsError: false,
      };
    case LECTURER_REQUESTS_ERROR:
      return {
        ...state,
        isRequestsLoading: false,
        requests: [],
        isRequestsError: true,
      };
    default:
      return state;
  }
};
export default lecturerRequestsReducer;
