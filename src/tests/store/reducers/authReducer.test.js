import User from '../../../models/user';
import {
  AUTH_ERROR,
  AUTH_LOADED,
  AUTH_LOADING,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE_LOADING,
  UPDATE_PROFILE_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_LOADING,
  CHANGE_PASSWORD_SUCCESS,
  IMAGE_CHANGE_LOADING,
  IMAGE_CHANGE_SUCCESS,
  IMAGE_CHANGE_ERROR,
} from '../../../store/actionTypes/authActionTypes';
import authReducer from '../../../store/reducers/authReducer';
import { userLoginResponseData } from '../../data/userLoginResponseData';

describe('Auth Reducer', () => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isAuthLoading: false,
    isLoginLoading: false,
    user: null,
    error: null,
    forgotPasswordSuccess: false,
    forgotPasswordError: false,
    isUpdateProfileLoading: false,
    updateProfileSuccess: false,
    updateProfileError: false,
    isChangePasswordLoading: false,
    changePasswordSuccess: false,
    changePasswordError: false,
    isImageChangeLoading: false,
    imageChangeSuccess: false,
    imageChangeError: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const reducer = authReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  // it('handles RESET_TEMP_BORROWED_ITEMS_STATE event as expected', () => {
  //   const reducer = authReducer(initialState, {
  //     type: RESET_TEMP_BORROWED_ITEMS_STATE,
  //   });

  //   expect(reducer).toEqual(initialState);
  // });

  it('handles AUTH_LOADING event as expected', () => {
    const reducer = authReducer(initialState, {
      type: AUTH_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      isAuthLoading: true,
      forgotPasswordSuccess: false,
      forgotPasswordError: false,
      isUpdateProfileLoading: false,
      updateProfileSuccess: false,
      updateProfileError: false,
      isChangePasswordLoading: false,
      changePasswordSuccess: false,
      changePasswordError: false,
      isImageChangeLoading: false,
      imageChangeSuccess: false,
      imageChangeError: false,
    });
  });

  it('handles LOGIN_LOADING event as expected', () => {
    const testStartState = {
      ...initialState,
    };

    const reducer = authReducer(testStartState, {
      type: LOGIN_LOADING,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isLoginLoading: true,
    });
  });

  it('handles AUTH_LOADED event as expected', () => {
    const testStartState = {
      ...initialState,
      isTempBorrowedItemsLoading: true,
      isTempBorrowedItemsError: false,
      reloadTempBorrowedItems: false,
    };

    const reducer = authReducer(testStartState, {
      type: AUTH_LOADED,
      payload: userLoginResponseData,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isAuthenticated: true,
      isAuthLoading: false,
      user: new User(userLoginResponseData),
      error: null,
    });
  });

  it('handles LOGIN_SUCCESS event as expected', () => {
    const testStartState = {
      ...initialState,
      isLoginLoading: true,
    };

    const reducer = authReducer(testStartState, {
      type: LOGIN_SUCCESS,
      payload: userLoginResponseData,
    });

    expect(reducer).toEqual({
      ...testStartState,
      token: userLoginResponseData.token,
      isAuthenticated: true,
      user: new User(userLoginResponseData),
      isLoginLoading: false,
      error: null,
    });
  });

  it('handles LOGIN_FAIL event as expected', () => {
    const testStartState = {
      ...initialState,
      isLoginLoading: true,
    };

    const reducer = authReducer(testStartState, {
      type: LOGIN_FAIL,
    });

    expect(reducer).toEqual({
      ...testStartState,
      token: null,
      user: null,
      isAuthenticated: false,
      isLoginLoading: false,
      error: 'Login Failed',
    });
  });

  it('handles LOGOUT_SUCCESS event as expected', () => {
    const testStartState = {
      ...initialState,
      token: userLoginResponseData.token,
      isAuthenticated: true,
      user: new User(userLoginResponseData),
      isLoginLoading: false,
      error: null,
    };

    const reducer = authReducer(testStartState, {
      type: LOGOUT_SUCCESS,
    });

    expect(reducer).toEqual({
      ...testStartState,
      token: null,
      user: null,
      isAuthenticated: false,
      isAuthLoading: false,
    });
  });

  it('handles AUTH_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      token: userLoginResponseData.token,
      isAuthenticated: true,
      user: new User(userLoginResponseData),
      isLoginLoading: false,
      error: null,
    };

    const reducer = authReducer(testStartState, {
      type: AUTH_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      token: null,
      user: null,
      isAuthenticated: false,
      isAuthLoading: false,
    });
  });

  it('handles LOGOUT_FAIL event as expected', () => {
    const testStartState = {
      ...initialState,
      isAuthLoading: true,
    };

    const reducer = authReducer(testStartState, {
      type: LOGOUT_FAIL,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isAuthLoading: false,
    });
  });
  it('handles FORGOT_PASSWORD_SUCCESS event as expected', () => {
    const testStartState = {
      ...initialState,
      forgotPasswordSuccess: false,
      forgotPasswordError: false,
    };

    const reducer = authReducer(testStartState, {
      type: FORGOT_PASSWORD_SUCCESS,
    });

    expect(reducer).toEqual({
      ...testStartState,
      forgotPasswordSuccess: true,
      forgotPasswordError: false,
    });
  });
  it('handles FORGOT_PASSWORD_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      forgotPasswordSuccess: false,
      forgotPasswordError: false,
    };

    const reducer = authReducer(testStartState, {
      type: FORGOT_PASSWORD_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      forgotPasswordSuccess: false,
      forgotPasswordError: true,
    });
  });
  it('handles UPDATE_PROFILE_LOADING event as expected', () => {
    const testStartState = {
      ...initialState,
      isUpdateProfileLoading: true,
      updateProfileError: false,
      updateProfileSuccess: true,
      isChangePasswordLoading: false,
      changePasswordSuccess: false,
      changePasswordError: true,
      isImageChangeLoading: false,
      imageChangeSuccess: false,
      imageChangeError: false,
    };

    const reducer = authReducer(testStartState, {
      type: UPDATE_PROFILE_LOADING,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isUpdateProfileLoading: true,
      updateProfileError: false,
      updateProfileSuccess: false,
      isChangePasswordLoading: false,
      changePasswordSuccess: false,
      changePasswordError: false,
      isImageChangeLoading: false,
      imageChangeSuccess: false,
      imageChangeError: false,
    });
  });
  it('handles UPDATE_PROFILE_SUCCESS event as expected', () => {
    const user = new User(userLoginResponseData);
    const testStartState = {
      ...initialState,
      user,
      isUpdateProfileLoading: true,
      updateProfileError: false,
      updateProfileSuccess: false,
      isChangePasswordLoading: false,
      changePasswordSuccess: false,
      changePasswordError: false,
      isImageChangeLoading: false,
      imageChangeSuccess: false,
      imageChangeError: false,
    };

    const data = {
      first_name: 'John',
      last_name: 'Doe',
      contact_number: 'xxxx',
    };

    const reducer = authReducer(testStartState, {
      type: UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    expect(reducer).toEqual({
      ...testStartState,
      user: user.update(data),
      isUpdateProfileLoading: false,
      updateProfileSuccess: true,
      updateProfileError: false,
    });
  });
  it('handles UPDATE_PROFILE_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      isUpdateProfileLoading: true,
      updateProfileError: false,
      updateProfileSuccess: true,
      isChangePasswordLoading: false,
      changePasswordSuccess: false,
      changePasswordError: true,
      isImageChangeLoading: false,
      imageChangeSuccess: false,
      imageChangeError: false,
    };

    const reducer = authReducer(testStartState, {
      type: UPDATE_PROFILE_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isUpdateProfileLoading: false,
      updateProfileSuccess: false,
      updateProfileError: true,
    });
  });
  it('handles CHANGE_PASSWORD_LOADING event as expected', () => {
    const testStartState = {
      ...initialState,
      isChangePasswordLoading: false,
      changePasswordSuccess: false,
      changePasswordError: true,
      isUpdateProfileLoading: false,
      updateProfileError: true,
      updateProfileSuccess: false,
      isImageChangeLoading: false,
      imageChangeSuccess: false,
      imageChangeError: false,
    };

    const reducer = authReducer(testStartState, {
      type: CHANGE_PASSWORD_LOADING,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isChangePasswordLoading: true,
      changePasswordSuccess: false,
      changePasswordError: false,
      isUpdateProfileLoading: false,
      updateProfileError: false,
      updateProfileSuccess: false,
      isImageChangeLoading: false,
      imageChangeSuccess: false,
      imageChangeError: false,
    });
  });
  it('handles CHANGE_PASSWORD_SUCCESS event as expected', () => {
    const user = new User(userLoginResponseData);
    const testStartState = {
      ...initialState,
      user,
      isChangePasswordLoading: true,
      changePasswordSuccess: false,
      changePasswordError: false,
      isUpdateProfileLoading: false,
      updateProfileError: false,
      updateProfileSuccess: false,
      isImageChangeLoading: false,
      imageChangeSuccess: false,
      imageChangeError: false,
    };

    const reducer = authReducer(testStartState, {
      type: CHANGE_PASSWORD_SUCCESS,
    });

    expect(reducer).toEqual({
      ...testStartState,
      user: user.removeDefaultPasswordFlag(),
      isChangePasswordLoading: false,
      changePasswordSuccess: true,
      changePasswordError: false,
    });
  });
  it('handles CHANGE_PASSWORD_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      isChangePasswordLoading: true,
      changePasswordSuccess: false,
      changePasswordError: false,
      isUpdateProfileLoading: false,
      updateProfileError: false,
      updateProfileSuccess: false,
      isImageChangeLoading: false,
      imageChangeSuccess: false,
      imageChangeError: false,
    };

    const reducer = authReducer(testStartState, {
      type: CHANGE_PASSWORD_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isChangePasswordLoading: false,
      changePasswordSuccess: false,
      changePasswordError: true,
    });
  });
  it('handles IMAGE_CHANGE_LOADING event as expected', () => {
    const testStartState = {
      ...initialState,
      isImageChangeLoading: true,
      imageChangeSuccess: false,
      imageChangeError: false,
      isUpdateProfileLoading: false,
      updateProfileError: true,
      updateProfileSuccess: false,
      isChangePasswordLoading: false,
      changePasswordSuccess: false,
      changePasswordError: true,
    };

    const reducer = authReducer(testStartState, {
      type: IMAGE_CHANGE_LOADING,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isImageChangeLoading: true,
      imageChangeSuccess: false,
      imageChangeError: false,
      isUpdateProfileLoading: false,
      updateProfileError: false,
      updateProfileSuccess: false,
      isChangePasswordLoading: false,
      changePasswordSuccess: false,
      changePasswordError: false,
    });
  });
  it('handles IMAGE_CHANGE_SUCCESS event as expected', () => {
    const user = new User(userLoginResponseData);
    const testStartState = {
      ...initialState,
      user,
      isImageChangeLoading: true,
      imageChangeSuccess: false,
      imageChangeError: false,
      isUpdateProfileLoading: false,
      updateProfileError: false,
      updateProfileSuccess: false,
      isChangePasswordLoading: false,
      changePasswordSuccess: false,
      changePasswordError: false,
    };

    const reducer = authReducer(testStartState, {
      type: IMAGE_CHANGE_SUCCESS,
      payload: 'http://image.com/xxx',
    });

    expect(reducer).toEqual({
      ...testStartState,
      user: user.updateImage('http://image.com/xxx'),
      isImageChangeLoading: false,
      imageChangeSuccess: true,
      imageChangeError: false,
    });
  });
  it('handles IMAGE_CHANGE_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      isImageChangeLoading: true,
      imageChangeSuccess: false,
      imageChangeError: false,
      isUpdateProfileLoading: false,
      updateProfileError: false,
      updateProfileSuccess: false,
      isChangePasswordLoading: false,
      changePasswordSuccess: false,
      changePasswordError: false,
    };

    const reducer = authReducer(testStartState, {
      type: IMAGE_CHANGE_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isImageChangeLoading: false,
      imageChangeSuccess: false,
      imageChangeError: true,
    });
  });
  it('return current state in case of invalid type', () => {
    const testStartState = {
      ...initialState,
      isImageChangeLoading: false,
      imageChangeSuccess: false,
      imageChangeError: true,
    };

    const reducer = authReducer(testStartState, {
      type: 'Invalid Type',
    });

    expect(reducer).toEqual(testStartState);
  });
});
