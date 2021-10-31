import {
  LECTURER_REQUESTS_LOADING,
  LECTURER_REQUESTS_LOADED,
  LECTURER_REQUESTS_ERROR,
} from '../../../../store/actionTypes/lecturerActionTypes';
import lecturerRequestsReducer from '../../../../store/reducers/lecturerReducers/lecturerRequestsReducer';

describe('Lecturer - Requests Reducer', () => {
  const initialState = {
    requests: [],
    isRequestsLoading: false,
    isRequestsError: false,
    reloadRequests: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const reducer = lecturerRequestsReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles LECTURER_REQUESTS_LOADING STATE event as expected', () => {
    const reducer = lecturerRequestsReducer(initialState, {
      type: LECTURER_REQUESTS_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      isRequestsLoading: true,
      isRequestsError: false,
      reloadRequests: false,
    });
  });

  it('handles LECTURER_REQUESTS_LOADED_STATE event as expected', () => {
    const testStartState = {
      ...initialState,
      isRequestsLoading: true,
      isRequestsError: false,
      reloadRequests: false,
    };

    const reducer = lecturerRequestsReducer(testStartState, {
      type: LECTURER_REQUESTS_LOADED,
      payload: [],
    });

    expect(reducer).toEqual({
      ...testStartState,
      isRequestsLoading: false,
      requests: [],
      isRequestsError: false,
    });
  });

  it('handles LECTURER_REQUESTS_ERROR event event as expected', () => {
    const testStartState = {
      ...initialState,
      isRequestsLoading: true,
      isRequestsError: false,
      reloadRequests: false,
    };

    const reducer = lecturerRequestsReducer(testStartState, {
      type: LECTURER_REQUESTS_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isRequestsLoading: false,
      requests: [],
      isRequestsError: true,
    });
  });
});
