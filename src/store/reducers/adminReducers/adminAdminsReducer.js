import Admin from '../../../models/admin';
import {
  ADMINS_ERROR,
  ADMINS_LOADED,
  ADMINS_LOADING,
  NEW_ADMIN_FAIL,
  NEW_ADMIN_LOADING,
  NEW_ADMIN_SUCCESS,
  RESET_ADMIN_STATE,
} from '../../actionTypes/adminActionTypes';

const initialState = {
  admins: [],
  isAdminsLoading: false,
  isAdminsError: false,
  newAdminLoading: false,
  newAdminError: false,
  newAdminSuccess: false,
  reloadAdmins: false,
};

const adminAdminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_ADMIN_STATE:
      return initialState;
    case ADMINS_LOADING:
      return {
        ...state,
        isAdminsLoading: true,
        isAdminsError: false,
        reloadAdmins: false,
      };
    case ADMINS_LOADED:
      return {
        ...state,
        isAdminsLoading: false,
        admins: action.payload.map(obj => new Admin(obj)),
        isAdminsError: false,
      };
    case ADMINS_ERROR:
      return {
        ...state,
        isAdminsLoading: false,
        admins: [],
        isAdminsError: true,
      };
    case NEW_ADMIN_LOADING:
      return {
        ...state,
        newAdminLoading: true,
        isAdminsError: false,
        newAdminError: false,
        newAdminSuccess: false,
        reloadAdmins: false,
      };
    case NEW_ADMIN_SUCCESS:
      return {
        ...state,
        newAdminLoading: false,
        newAdminSuccess: true,
        reloadAdmins: true,
      };
    case NEW_ADMIN_FAIL:
      return {
        ...state,
        newAdminLoading: false,
        newAdminError: true,
      };

    default:
      return state;
  }
};
export default adminAdminsReducer;
