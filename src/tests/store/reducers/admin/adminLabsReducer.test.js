import {
  LABS_ERROR,
  LABS_LOADED,
  LABS_LOADING,
  NEW_LAB_FAIL,
  NEW_LAB_LOADING,
  NEW_LAB_SUCCESS,
  RESET_LAB_STATE,
  DEPT_LABS_ERROR,
  DEPT_LABS_LOADED,
  DEPT_LABS_LOADING,
  LAB_ASSIGN_LECTURER_LOADING,
  LAB_ASSIGN_LECTURER_SUCCESS,
  LAB_ASSIGN_LECTURER_ERROR,
  LAB_ASSIGN_LECTURER_RESET,
} from '../../../../store/actionTypes/adminActionTypes';

import adminLabsReducer from '../../../../store/reducers/adminReducers/adminLabsReducer';

describe('Admin - Lab Reducer', () => {
  const initialState = {
    labs: [],
    lecturers: [], // needed to assign lecturers
    isLabsLoading: false,
    isLabsError: false,
    newLabLoading: false,
    newLabError: false,
    newLabSuccess: false,
    reloadLabs: false,
    assignLecturerLoading: false,
    assignLecturerSuccess: false,
    assignLecturerError: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const reducer = adminLabsReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles RESET_LAB_STATE event as expected', () => {
    const reducer = adminLabsReducer(initialState, {
      type: RESET_LAB_STATE,
    });

    expect(reducer).toEqual(initialState);
  });

  it('handles LABS_LOADING event as expected', () => {
    const reducer = adminLabsReducer(initialState, {
      type: LABS_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      isLabsLoading: true,
      isLabsError: false,
      reloadLabs: false,
    });
  });

  it('handles LABS_LOADED event as expected', () => {
    const testStartState = {
      ...initialState,
      isLabsLoading: true,
      isLabsError: false,
      reloadLabs: false,
    };

    const reducer = adminLabsReducer(testStartState, {
      type: LABS_LOADED,
      payload: { labs: [], lecturers: [] },
    });

    expect(reducer).toEqual({
      ...testStartState,
      isLabsLoading: false,
      labs: [],
      lecturers: [],
      isLabsError: false,
    });
  });

  it('handles LABS_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      isLabsLoading: true,
      isLabsError: false,
      reloadLabs: false,
    };

    const reducer = adminLabsReducer(testStartState, {
      type: LABS_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isLabsLoading: false,
      labs: [],
      lecturers: [],
      isLabsError: true,
    });
  });

  it('handles NEW_LAB_LOADING event as expected', () => {
    const testStartState = {
      ...initialState,
      isLabsError: false,
      newLabError: true,
      newLabSuccess: false,
    };

    const reducer = adminLabsReducer(testStartState, {
      type: NEW_LAB_LOADING,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newLabLoading: true,
      isLabsError: false,
      newLabError: false,
      newLabSuccess: false,
      reloadLabs: false,
    });
  });

  it('handles NEW_LAB_SUCCESS event as expected', () => {
    const testStartState = {
      ...initialState,
      newLabLoading: true,
      isLabsError: false,
      newLabError: false,
      newLabSuccess: false,
      reloadLabs: false,
    };

    const reducer = adminLabsReducer(testStartState, {
      type: NEW_LAB_SUCCESS,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newLabLoading: false,
      newLabSuccess: true,
      reloadLabs: true,
    });
  });

  it('handles NEW_LAB_MANAGER_FAIL event as expected', () => {
    const testStartState = {
      ...initialState,
      newLabLoading: true,
      isLabsError: false,
      newLabError: false,
      newLabSuccess: false,
      reloadLabs: false,
    };

    const reducer = adminLabsReducer(testStartState, {
      type: NEW_LAB_FAIL,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newLabLoading: false,
      newLabError: true,
    });
  });

  it('handles DEPT_LABS_LOADING event as expected', () => {
    const reducer = adminLabsReducer(initialState, {
      type: DEPT_LABS_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      isLabsLoading: true,
      isLabsError: false,
      reloadLabs: false,
    });
  });

  it('handles DEPT_LABS_LOADED event as expected', () => {
    const testStartState = {
      ...initialState,
      isLabsLoading: true,
      isLabsError: false,
      reloadLabs: false,
    };

    const reducer = adminLabsReducer(testStartState, {
      type: DEPT_LABS_LOADED,
      payload: [],
    });

    expect(reducer).toEqual({
      ...testStartState,
      isLabsLoading: false,
      labs: [],
      isLabsError: false,
    });
  });

  it('handles DEPT_LABS_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      isLabsLoading: true,
      isLabsError: false,
      reloadLabs: false,
    };

    const reducer = adminLabsReducer(testStartState, {
      type: DEPT_LABS_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isLabsLoading: false,
      labs: [],
      isLabsError: true,
    });
  });

  it('handles LABS_ASSIGN_LECTURER_LOADING event as expected', () => {
    const reducer = adminLabsReducer(initialState, {
      type: LAB_ASSIGN_LECTURER_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      assignLecturerLoading: true,
      assignLecturerSuccess: false,
      assignLecturerError: false,
    });
  });

  it('handles LAB_ASSIGN_LECTURER_SUCCESS event as expected', () => {
    const testStartState = {
      ...initialState,
      assignLecturerLoading: true,
      assignLecturerSuccess: false,
      assignLecturerError: false,
    };

    const reducer = adminLabsReducer(testStartState, {
      type: LAB_ASSIGN_LECTURER_SUCCESS,
      payload: [],
    });

    expect(reducer).toEqual({
      ...testStartState,
      labs: [],
      assignLecturerLoading: false,
      assignLecturerSuccess: true,
      assignLecturerError: false,
    });
  });

  it('handles LAB_ASSIGN_LECTURER_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      assignLecturerLoading: true,
      assignLecturerSuccess: false,
      assignLecturerError: false,
    };

    const reducer = adminLabsReducer(testStartState, {
      type: LAB_ASSIGN_LECTURER_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      assignLecturerLoading: false,
      assignLecturerSuccess: false,
      assignLecturerError: true,
    });
  });

  it('handles LAB_ASSIGN_LECTURER_RESET event as expected', () => {
    const reducer = adminLabsReducer(initialState, {
      type: LAB_ASSIGN_LECTURER_RESET,
    });

    expect(reducer).toEqual({
      ...initialState,
      assignLecturerLoading: false,
      assignLecturerSuccess: false,
      assignLecturerError: false,
    });
  });
});
