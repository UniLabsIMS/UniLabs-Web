import LecturerRequest from '../../../../models/lecturerRequest';
import {
  LECTURER_REQUEST_LOADING,
  LECTURER_REQUEST_LOADED,
  LECTURER_REQUEST_ERROR,
} from '../../../../store/actionTypes/lecturerActionTypes';
import lecturerRequestReducer from '../../../../store/reducers/lecturerReducers/lecturerRequestReducer';
import lecturerRequestResponseData from '../../../data/lecturerRequestResponseData';

describe('Lecturer - Request Reducer', () => {
  const initialState = {
    request: null,
    isRequestLoading: false,
    isRequestError: false,
    reloadRequest: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const reducer = lecturerRequestReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles LECTURER_REQUEST_LOADING STATE event as expected', () => {
    const reducer = lecturerRequestReducer(initialState, {
      type: LECTURER_REQUEST_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      isRequestLoading: true,
      isRequestError: false,
      reloadRequest: false,
    });
  });

  // it('handles LECTURER_REQUEST_LOADED_STATE event as expected', () => {
  //   const testStartState = {
  //     ...initialState,
  //     isRequestLoading: true,
  //     isRequestError: false,
  //     reloadRequest: false,
  //   };

  //   const reducer = lecturerRequestReducer(testStartState, {
  //     type: LECTURER_REQUEST_LOADED,
  //     payload: [lecturerRequestResponseData],
  //   });

  //   expect(reducer).toEqual({
  //     ...testStartState,
  //     isRequestLoading: false,
  //     request: new LecturerRequest([lecturerRequestResponseData]),
  //     isRequestError: false,
  //   });
  // });

  it('handles LECTURER_REQUEST_ERROR event event as expected', () => {
    const testStartState = {
      ...initialState,
      isRequestLoading: true,
      isRequestError: false,
      reloadRequest: false,
    };

    const reducer = lecturerRequestReducer(testStartState, {
      type: LECTURER_REQUEST_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isRequestLoading: false,
      request: null,
      isRequestError: true,
    });
  });
});
