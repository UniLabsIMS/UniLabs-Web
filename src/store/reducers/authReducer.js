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
} from '../actionTypes/authActionTypes';
import User from '../../models/user';

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

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
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
      };
    case LOGIN_LOADING:
      return {
        ...state,
        isLoginLoading: true,
      };
    case AUTH_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isAuthLoading: false,
        user: new User(action.payload),
        error: null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);

      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        user: new User(action.payload),
        isLoginLoading: false,
        error: null,
      };
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoginLoading: false,
        error: 'Login Failed',
      };
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isAuthLoading: false,
      };
    case LOGOUT_FAIL:
      return { ...state, isAuthLoading: false };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordSuccess: true,
        forgotPasswordError: false,
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        forgotPasswordSuccess: false,
        forgotPasswordError: true,
      };
    case UPDATE_PROFILE_LOADING: {
      return {
        ...state,
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
    }
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: state.user.update(action.payload),
        isUpdateProfileLoading: false,
        updateProfileSuccess: true,
        updateProfileError: false,
      };
    case UPDATE_PROFILE_ERROR:
      return {
        ...state,
        isUpdateProfileLoading: false,
        updateProfileSuccess: false,
        updateProfileError: true,
      };
    case CHANGE_PASSWORD_LOADING: {
      return {
        ...state,
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
    }
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isChangePasswordLoading: false,
        changePasswordSuccess: true,
        changePasswordError: false,
      };
    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        isChangePasswordLoading: false,
        changePasswordSuccess: false,
        changePasswordError: true,
      };
    case IMAGE_CHANGE_LOADING: {
      return {
        ...state,
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
    }
    case IMAGE_CHANGE_SUCCESS:
      return {
        ...state,
        user: state.user.updateImage(action.payload),
        isImageChangeLoading: false,
        imageChangeSuccess: true,
        imageChangeError: false,
      };
    case IMAGE_CHANGE_ERROR:
      return {
        ...state,
        isImageChangeLoading: false,
        imageChangeSuccess: false,
        imageChangeError: true,
      };
    default:
      return state;
  }
};
export default authReducer;
