import {
  LECTURER_REQUEST_APPROVE_OR_DECLINE_LOADING,
  LECTURER_REQUEST_APPROVE_OR_DECLINE_SUCCESS,
  LECTURER_REQUEST_APPROVE_OR_DECLINE_FAIL,
  LECTURER_REQUEST_APPROVE_OR_DECLINE_RESET,
} from '../../actionTypes/lecturerActionTypes';

const initialState = {
  isApprovalOrDeclineLoading: false,
  isApprovalOrDeclineSuccess: false,
  isApprovalOrDeclineError: false,
};

const lecturerRequestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LECTURER_REQUEST_APPROVE_OR_DECLINE_RESET:
      return initialState;
    case LECTURER_REQUEST_APPROVE_OR_DECLINE_LOADING:
      return {
        ...state,
        isApprovalOrDeclineLoading: true,
        isApprovalOrDeclineSuccess: false,
        isApprovalOrDeclineError: false,
      };
    case LECTURER_REQUEST_APPROVE_OR_DECLINE_SUCCESS:
      return {
        ...state,
        isApprovalOrDeclineLoading: false,
        isApprovalOrDeclineSuccess: true,
        isApprovalOrDeclineError: false,
      };
    case LECTURER_REQUEST_APPROVE_OR_DECLINE_FAIL:
      return {
        ...state,
        isApprovalOrDeclineLoading: false,
        isApprovalOrDeclineSuccess: false,
        isApprovalOrDeclineError: true,
      };
    default:
      return state;
  }
};
export default lecturerRequestsReducer;
