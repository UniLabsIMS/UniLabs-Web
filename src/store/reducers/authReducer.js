import {
  AUTH_ERROR,
  AUTH_LOADED,
  AUTH_LOADING,
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
} from '../actionTypes/authActionTypes';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isAuthLoading: false,
  isLoginLoading: false,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        isAuthLoading: true,
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
        user: action.payload,
        error: null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);

      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
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
    default:
      return state;
  }
};
export default authReducer;
