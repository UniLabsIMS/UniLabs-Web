import {
  LECTURER_REQUEST_APPROVE_OR_DECLINE_LOADING,
  LECTURER_REQUEST_APPROVE_OR_DECLINE_SUCCESS,
  LECTURER_REQUEST_APPROVE_OR_DECLINE_FAIL,
  LECTURER_REQUEST_APPROVE_OR_DECLINE_RESET,
} from '../../../../store/actionTypes/lecturerActionTypes';
import lecturerApproveOrDeclineRequestReducer from '../../../../store/reducers/lecturerReducers/lecturerApproveOrDeclineRequestReducer';

describe('Lecturer - Approve or Decline Reducer', () => {
  const initialState = {
    isApprovalOrDeclineLoading: false,
    isApprovalOrDeclineSuccess: false,
    isApprovalOrDeclineError: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const reducer = lecturerApproveOrDeclineRequestReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles LECTURER_REQUEST_APPROVE_OR_DECLINE_RESETSTATE event as expected', () => {
    const reducer = lecturerApproveOrDeclineRequestReducer(initialState, {
      type: LECTURER_REQUEST_APPROVE_OR_DECLINE_RESET,
    });

    expect(reducer).toEqual(initialState);
  });

  it('handles LECTURER_REQUEST_APPROVE_OR_DECLINE_LOADING STATE event as expected', () => {
    const reducer = lecturerApproveOrDeclineRequestReducer(initialState, {
      type: LECTURER_REQUEST_APPROVE_OR_DECLINE_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      isApprovalOrDeclineLoading: true,
      isApprovalOrDeclineSuccess: false,
      isApprovalOrDeclineError: false,
    });
  });

  it('handles LECTURER_REQUEST_APPROVE_OR_DECLINE_SUCCESS_STATE event as expected', () => {
    const testStartState = {
      ...initialState,
      isApprovalOrDeclineLoading: true,
      isApprovalOrDeclineSuccess: false,
      isApprovalOrDeclineError: false,
    };

    const reducer = lecturerApproveOrDeclineRequestReducer(testStartState, {
      type: LECTURER_REQUEST_APPROVE_OR_DECLINE_SUCCESS,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isApprovalOrDeclineLoading: false,
      isApprovalOrDeclineSuccess: true,
      isApprovalOrDeclineError: false,
    });
  });

  it('handles LECTURER_REQUEST_APPROVE_OR_DECLINE_FAIL event event as expected', () => {
    const testStartState = {
      ...initialState,
      isApprovalOrDeclineLoading: true,
      isApprovalOrDeclineSuccess: false,
      isApprovalOrDeclineError: false,
    };

    const reducer = lecturerApproveOrDeclineRequestReducer(testStartState, {
      type: LECTURER_REQUEST_APPROVE_OR_DECLINE_FAIL,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isApprovalOrDeclineLoading: false,
      isApprovalOrDeclineSuccess: false,
      isApprovalOrDeclineError: true,
    });
  });
});
