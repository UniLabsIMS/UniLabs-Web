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
} from '../../../../store/actionTypes/adminActionTypes';

import adminStudentsReducer from '../../../../store/reducers/adminReducers/adminStudentsReducer';

describe('Admin - Lecturers Reducer', () => {
  const initialState = {
    students: [],
    isStudentsLoading: false,
    isStudentsError: false,
    newStudentLoading: false,
    newStudentError: false,
    newStudentSuccess: false,
    reloadStudents: false,
    studentBlockUnblockLoading: false,
    studentBlockUnblockSuccess: false,
    studentBlockUnblockError: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const reducer = adminStudentsReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles RESET_STUDENT_STATE event as expected', () => {
    const reducer = adminStudentsReducer(initialState, {
      type: RESET_STUDENT_STATE,
    });

    expect(reducer).toEqual(initialState);
  });

  it('handles STUDENT_LOADING event as expected', () => {
    const reducer = adminStudentsReducer(initialState, {
      type: STUDENTS_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      isStudentsLoading: true,
      isStudentsError: false,
      reloadStudent: false,
      studentBlockUnblockLoading: false,
      studentBlockUnblockSuccess: false,
      studentBlockUnblockError: false,
    });
  });

  it('handles STUDENTS_LOADED event as expected', () => {
    const testStartState = {
      ...initialState,
      isStudentsLoading: true,
      isStudentsError: false,
      reloadStudent: false,
      studentBlockUnblockLoading: false,
      studentBlockUnblockSuccess: false,
      studentBlockUnblockError: false,
    };

    const reducer = adminStudentsReducer(testStartState, {
      type: STUDENTS_LOADED,
      payload: [],
    });

    expect(reducer).toEqual({
      ...testStartState,
      isStudentsLoading: false,
      students: [],
      isStudentsError: false,
    });
  });

  it('handles STUDENTS_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      isStudentsLoading: true,
      isStudentsError: false,
      reloadStudent: false,
      studentBlockUnblockLoading: false,
      studentBlockUnblockSuccess: false,
      studentBlockUnblockError: false,
    };

    const reducer = adminStudentsReducer(testStartState, {
      type: STUDENTS_ERROR,
      payload: [],
    });

    expect(reducer).toEqual({
      ...testStartState,
      isStudentsLoading: false,
      students: [],
      isStudentsError: true,
    });
  });

  it('handles NEW_STUDENT_LOADING event as expected', () => {
    const testStartState = {
      ...initialState,
      isStudentsError: false,
      newStudentError: true,
      newStudentSuccess: false,
    };

    const reducer = adminStudentsReducer(testStartState, {
      type: NEW_STUDENT_LOADING,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newStudentLoading: true,
      isStudentsError: false,
      newStudentError: false,
      newStudentSuccess: false,
      reloadStudents: false,
      studentBlockUnblockLoading: false,
      studentBlockUnblockLSuccess: false,
      studentBlockUnblockError: false,
    });
  });

  it('handles NEW_LECTURER_SUCCESS event as expected', () => {
    const testStartState = {
      ...initialState,
      newStudentLoading: true,
      isStudentsError: false,
      newStudentError: false,
      newStudentSuccess: false,
      reloadStudents: false,
      studentBlockUnblockLoading: false,
      studentBlockUnblockLSuccess: false,
      studentBlockUnblockError: false,
    };

    const reducer = adminStudentsReducer(testStartState, {
      type: NEW_STUDENT_SUCCESS,
      payload: [],
    });

    expect(reducer).toEqual({
      ...testStartState,
      students: [],
      newStudentLoading: false,
      newStudentSuccess: true,
      reloadStudents: true,
    });
  });

  it('handles NEW_STUDENT_FAIL event as expected', () => {
    const testStartState = {
      ...initialState,
      newStudentLoading: true,
      isStudentsError: false,
      newStudentError: false,
      newStudentSuccess: false,
      reloadStudents: false,
      studentBlockUnblockLoading: false,
      studentBlockUnblockLSuccess: false,
      studentBlockUnblockError: false,
    };

    const reducer = adminStudentsReducer(testStartState, {
      type: NEW_STUDENT_FAIL,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newStudentLoading: false,
      newStudentError: true,
    });
  });

  it('handles STUDENT_BLOCK_UNBLOCK_LOADING event as expected', () => {
    const reducer = adminStudentsReducer(initialState, {
      type: STUDENT_BLOCK_UNBLOCK_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      studentBlockUnblockLoading: true,
      studentBlockUnblockSuccess: false,
      studentBlockUnblockError: false,
      newStudentLoading: false,
      newStudentError: false,
      newStudentSuccess: false,
    });
  });

  it('handles LECTURER_BLOCK_UNBLOCK_SUCCESS event as expected', () => {
    const testStartState = {
      ...initialState,
      studentBlockUnblockLoading: true,
      studentBlockUnblockSuccess: false,
      studentBlockUnblockError: false,
      newStudentLoading: false,
      newStudentError: false,
      newStudentSuccess: false,
    };

    const reducer = adminStudentsReducer(testStartState, {
      type: STUDENT_BLOCK_UNBLOCK_SUCCESS,
      payload: [],
    });

    expect(reducer).toEqual({
      ...testStartState,
      students: [],
      studentBlockUnblockLoading: false,
      studentBlockUnblockSuccess: true,
      studentBlockUnblockError: false,
    });
  });

  it('handles LECTURER_BLOCK_UNBLOCK_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      studentBlockUnblockLoading: true,
      studentBlockUnblockSuccess: false,
      studentBlockUnblockError: false,
      newStudentLoading: false,
      newStudentError: false,
      newStudentSuccess: false,
    };

    const reducer = adminStudentsReducer(testStartState, {
      type: STUDENT_BLOCK_UNBLOCK_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      studentBlockUnblockLoading: false,
      studentBlockUnblockSuccess: false,
      studentBlockUnblockError: true,
    });
  });
});
