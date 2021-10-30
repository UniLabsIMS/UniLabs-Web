import {
  ADMINS_ERROR,
  ADMINS_LOADED,
  ADMINS_LOADING,
  NEW_ADMIN_FAIL,
  NEW_ADMIN_LOADING,
  NEW_ADMIN_SUCCESS,
  RESET_ADMIN_STATE,
} from '../../../../store/actionTypes/adminActionTypes';

import adminAdminsReducer from '../../../../store/reducers/adminReducers/adminAdminsReducer';

describe('Admin - Admins Reducer', () => {
  const initialState = {
    admins: [],
    isAdminsLoading: false,
    isAdminsError: false,
    newAdminLoading: false,
    newAdminError: false,
    newAdminSuccess: false,
    reloadAdmins: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const reducer = adminAdminsReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles RESET_ADMIN_STATE event as expected', () => {
    const reducer = adminAdminsReducer(initialState, {
      type: RESET_ADMIN_STATE,
    });

    expect(reducer).toEqual(initialState);
  });

  it('handles ADMIN_LOADING event as expected', () => {
    const reducer = adminAdminsReducer(initialState, {
      type: ADMINS_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      isAdminsLoading: true,
      isAdminsError: false,
      reloadAdmins: false,
    });
  });

  it('handles ADMIN_LOADED event as expected', () => {
    const testStartState = {
      ...initialState,
      isAdminsLoading: true,
      isAdminsError: false,
      reloadAdmins: false,
    };

    const reducer = adminAdminsReducer(testStartState, {
      type: ADMINS_LOADED,
      payload: [],
    });

    expect(reducer).toEqual({
      ...testStartState,
      isAdminsLoading: false,
      admins: [],
      isAdminsError: false,
    });
  });

  it('handles AdminS_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      isAdminsLoading: true,
      isAdminsError: false,
      reloadAdmins: false,
    };

    const reducer = adminAdminsReducer(testStartState, {
      type: ADMINS_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isAdminsLoading: false,
      admins: [],
      isAdminsError: true,
    });
  });

  it('handles NEW_ADMIN_LOADING event as expected', () => {
    const testStartState = {
      ...initialState,
      isAdminsError: false,
      newAdminError: true,
      newAdminSuccess: false,
    };

    const reducer = adminAdminsReducer(testStartState, {
      type: NEW_ADMIN_LOADING,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newAdminLoading: true,
      isAdminsError: false,
      newAdminError: false,
      newAdminSuccess: false,
      reloadAdmins: false,
    });
  });

  it('handles NEW_ADMIN_SUCCESS event as expected', () => {
    const testStartState = {
      ...initialState,
      newAdminLoading: true,
      isAdminsError: false,
      newAdminError: false,
      newAdminSuccess: false,
      reloadAdmins: false,
    };

    const reducer = adminAdminsReducer(testStartState, {
      type: NEW_ADMIN_SUCCESS,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newAdminLoading: false,
      newAdminSuccess: true,
      reloadAdmins: true,
    });
  });

  it('handles NEW_ADMIN_FAIL event as expected', () => {
    const testStartState = {
      ...initialState,
      newAdminLoading: true,
      isAdminsError: false,
      newAdminError: false,
      newAdminSuccess: false,
      reloadAdmins: false,
    };

    const reducer = adminAdminsReducer(testStartState, {
      type: NEW_ADMIN_FAIL,
    });

    expect(reducer).toEqual({
      ...testStartState,
      newAdminLoading: false,
      newAdminError: true,
    });
  });
});
