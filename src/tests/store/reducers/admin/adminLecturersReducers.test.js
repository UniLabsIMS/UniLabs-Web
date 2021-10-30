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
} from '../../../../store/actionTypes/adminActionTypes';

import adminLecturersReducer from '../../../../store/reducers/adminReducers/adminLecturersReducer';

describe('Admin - Lecturers Reducer', () => {
  const initialState = {
    lecturers: [],
    isLecturersLoading: false,
    isLecturersError: false,
    newLecturerLoading: false,
    newLecturerError: false,
    newLecturerSuccess: false,
    reloadLecturers: false,
    lecturerBlockUnblockLoading: false,
    lecturerBlockUnblockSuccess: false,
    lecturerBlockUnblockError: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const reducer = adminLecturersReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles RESET_LECTURER_STATE event as expected', () => {
    const reducer = adminLecturersReducer(initialState, {
      type: RESET_LECTURER_STATE,
    });

    expect(reducer).toEqual(initialState);
  });

  it('handles LECTURER_LOADING event as expected', () => {
    const reducer = adminLecturersReducer(initialState, {
      type: LECTURERS_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      isLecturersLoading: true,
      isLecturersError: false,
      reloadLecturer: false,
      lecturerBlockUnblockLoading: false,
      lecturerBlockUnblockSuccess: false,
      lecturerBlockUnblockError: false,
    });
  });

  it('handles LECTURERS_LOADED event as expected', () => {
    const testStartState = {
      ...initialState,
      isLecturersLoading: true,
      isLecturersError: false,
      reloadLecturer: false,
      lecturerBlockUnblockLoading: false,
      lecturerBlockUnblockSuccess: false,
      lecturerBlockUnblockError: false,
    };

    const reducer = adminLecturersReducer(testStartState, {
      type: LECTURERS_LOADED,
      payload: [],
    });

    expect(reducer).toEqual({
      ...testStartState,
      isLecturersLoading: false,
      lecturers: [],
      isLecturersError: false,
    });
  });

  it('handles LECTURERS_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      isLecturersLoading: true,
      isLecturersError: false,
      reloadLecturer: false,
      lecturerBlockUnblockLoading: false,
      lecturerBlockUnblockSuccess: false,
      lecturerBlockUnblockError: false,
    };

    const reducer = adminLecturersReducer(testStartState, {
      type: LECTURERS_ERROR,
      payload: [],
    });

    expect(reducer).toEqual({
      ...testStartState,
      isLecturersLoading: false,
      lecturers: [],
      isLecturersError: true,
    });
  });

  it('handles NEW_LECTURER_LOADING event as expected', () => {
    const testStartState = {
      ...initialState,
      isLecturersError: false,
      newLecturerError: true,
      newLecturerSuccess: false,
    };

    const reducer = adminLecturersReducer(testStartState, {
      type: NEW_LECTURER_LOADING,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newLecturerLoading: true,
      isLecturersError: false,
      newLecturerError: false,
      newLecturerSuccess: false,
      reloadLecturers: false,
      lecturerBlockUnblockLoading: false,
      lecturerBlockUnblockSuccess: false,
      lecturerBlockUnblockError: false,
    });
  });

  it('handles NEW_LECTURER_SUCCESS event as expected', () => {
    const testStartState = {
      ...initialState,
      newLecturerLoading: true,
      isLecturersError: false,
      newLecturerError: false,
      newLecturerSuccess: false,
      reloadLecturers: false,
      lecturerBlockUnblockLoading: false,
      lecturerBlockUnblockSuccess: false,
      lecturerBlockUnblockError: false,
    };

    const reducer = adminLecturersReducer(testStartState, {
      type: NEW_LECTURER_SUCCESS,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newLecturerLoading: false,
      newLecturerSuccess: true,
      reloadLecturers: true,
    });
  });

  it('handles NEW_LECTURER_FAIL event as expected', () => {
    const testStartState = {
      ...initialState,
      newLecturerLoading: true,
      isLecturersError: false,
      newLecturerError: false,
      newLecturerSuccess: false,
      reloadLecturers: false,
      lecturerBlockUnblockLoading: false,
      lecturerBlockUnblockSuccess: false,
      lecturerBlockUnblockError: false,
    };

    const reducer = adminLecturersReducer(testStartState, {
      type: NEW_LECTURER_FAIL,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newLecturerLoading: false,
      newLecturerError: true,
    });
  });

  it('handles LECTURER_BLOCK_UNBLOCK_LOADING event as expected', () => {
    const reducer = adminLecturersReducer(initialState, {
      type: LECTURER_BLOCK_UNBLOCK_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      lecturerBlockUnblockLoading: true,
      lecturerBlockUnblockSuccess: false,
      lecturerBlockUnblockError: false,
      newLecturerLoading: false,
      newLecturerError: false,
      newLecturerSuccess: false,
    });
  });

  it('handles LECTURER_BLOCK_UNBLOCK_SUCCESS event as expected', () => {
    const testStartState = {
      ...initialState,
      lecturerBlockUnblockLoading: true,
      lecturerBlockUnblockSuccess: false,
      lecturerBlockUnblockError: false,
      newLecturerLoading: false,
      newLecturerError: false,
      newLecturerSuccess: false,
    };

    const reducer = adminLecturersReducer(testStartState, {
      type: LECTURER_BLOCK_UNBLOCK_SUCCESS,
      payload: [],
    });

    expect(reducer).toEqual({
      ...testStartState,
      lecturers: [],
      lecturerBlockUnblockLoading: false,
      lecturerBlockUnblockSuccess: true,
      lecturerBlockUnblockError: false,
    });
  });

  it('handles LECTURER_BLOCK_UNBLOCK_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      lecturerBlockUnblockLoading: true,
      lecturerBlockUnblockSuccess: false,
      lecturerBlockUnblockError: false,
      newLecturerLoading: false,
      newLecturerError: false,
      newLecturerSuccess: false,
    };

    const reducer = adminLecturersReducer(testStartState, {
      type: LECTURER_BLOCK_UNBLOCK_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      lecturerBlockUnblockLoading: false,
      lecturerBlockUnblockSuccess: false,
      lecturerBlockUnblockError: true,
    });
  });
});
