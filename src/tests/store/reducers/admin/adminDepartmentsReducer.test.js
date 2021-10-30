import {
  DEPARTMENTS_ERROR,
  DEPARTMENTS_LOADED,
  DEPARTMENTS_LOADING,
  NEW_DEPARTMENT_FAIL,
  NEW_DEPARTMENT_LOADING,
  NEW_DEPARTMENT_SUCCESS,
  RESET_DEPARTMENT_STATE,
} from '../../../../store/actionTypes/adminActionTypes';

import adminDepartmentsReducer from '../../../../store/reducers/adminReducers/adminDepartmentsReducer';

describe('Admin - Department Reducer', () => {
  const initialState = {
    departments: [],
    isDepartmentsLoading: false,
    isDepartmentsError: false,
    newDepartmentLoading: false,
    newDepartmentError: false,
    newDepartmentSuccess: false,
    reloadDepartments: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const reducer = adminDepartmentsReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles RESET_DEPARTMENT_STATE event as expected', () => {
    const reducer = adminDepartmentsReducer(initialState, {
      type: RESET_DEPARTMENT_STATE,
    });

    expect(reducer).toEqual(initialState);
  });

  it('handles DEPARTMENTS_LOADING event as expected', () => {
    const reducer = adminDepartmentsReducer(initialState, {
      type: DEPARTMENTS_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      isDepartmentsLoading: true,
      isDepartmentsError: false,
      reloadDepartments: false,
    });
  });

  it('handles DEPARTMENT_LOADED event as expected', () => {
    const testStartState = {
      ...initialState,
      isDepartmentsLoading: true,
      isDepartmentsError: false,
      reloadDepartments: false,
    };

    const reducer = adminDepartmentsReducer(testStartState, {
      type: DEPARTMENTS_LOADED,
      payload: [],
    });

    expect(reducer).toEqual({
      ...testStartState,
      isDepartmentsLoading: false,
      departments: [],
      isDepartmentsError: false,
    });
  });

  it('handles Departments_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      isDepartmentsLoading: true,
      isDepartmentsError: false,
      reloadDepartments: false,
    };

    const reducer = adminDepartmentsReducer(testStartState, {
      type: DEPARTMENTS_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isDepartmentsLoading: false,
      departments: [],
      isDepartmentsError: true,
    });
  });

  it('handles NEW_DEPARTMENT_LOADING event as expected', () => {
    const testStartState = {
      ...initialState,
      isDepartmentsError: false,
      newDepartmentError: true,
      newDepartmentSuccess: false,
    };

    const reducer = adminDepartmentsReducer(testStartState, {
      type: NEW_DEPARTMENT_LOADING,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newDepartmentLoading: true,
      isDepartmentsError: false,
      newDepartmentError: false,
      newDepartmentSuccess: false,
      reloadDepartments: false,
    });
  });

  it('handles NEW_DEPARTMENT_SUCCESS event as expected', () => {
    const testStartState = {
      ...initialState,
      newDepartmentLoading: true,
      isDepartmentsError: false,
      newDepartmentError: false,
      newDepartmentSuccess: false,
      reloadDepartments: false,
    };

    const reducer = adminDepartmentsReducer(testStartState, {
      type: NEW_DEPARTMENT_SUCCESS,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newDepartmentLoading: false,
      newDepartmentSuccess: true,
      reloadDepartments: true,
    });
  });

  it('handles NEW_ADMIN_FAIL event as expected', () => {
    const testStartState = {
      ...initialState,
      newDepartmentLoading: true,
      isDepartmentsError: false,
      newDepartmentError: false,
      newDepartmentSuccess: false,
      reloadDepartments: false,
    };

    const reducer = adminDepartmentsReducer(testStartState, {
      type: NEW_DEPARTMENT_FAIL,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newDepartmentLoading: false,
      newDepartmentError: true,
    });
  });
});
