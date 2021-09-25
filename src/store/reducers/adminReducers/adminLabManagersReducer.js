import LabManager from '../../../models/labManager';
import {
  LAB_MANAGERS_ERROR,
  LAB_MANAGERS_LOADED,
  LAB_MANAGERS_LOADING,
  NEW_LAB_MANAGER_FAIL,
  NEW_LAB_MANAGER_LOADING,
  NEW_LAB_MANAGER_SUCCESS,
  RESET_LAB_MANAGER_STATE,
} from '../../actionTypes/adminActionTypes';

const initialState = {
  labManagers: [],
  isLabManagersLoading: false,
  isLabManagersError: false,
  newLabManagerLoading: false,
  newLabManagerError: false,
  newLabManagerSuccess: false,
  reloadLabManagers: false,
};

const adminLabManagersReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_LAB_MANAGER_STATE:
      return initialState;
    case LAB_MANAGERS_LOADING:
      return {
        ...state,
        isLabManagersLoading: true,
        isLabManagersError: false,
        reloadLabManager: false,
      };
    case LAB_MANAGERS_LOADED:
      return {
        ...state,
        isLabManagersLoading: false,
        labManagers: action.payload.map(obj => new LabManager(obj)),
        isLabManagersError: false,
      };
    case LAB_MANAGERS_ERROR:
      return {
        ...state,
        isLabManagersLoading: false,
        labManagers: [],
        isLabManagersError: true,
      };
    case NEW_LAB_MANAGER_LOADING:
      return {
        ...state,
        newLabManagerLoading: true,
        isLabManagersError: false,
        newLabManagerError: false,
        newLabManagerSuccess: false,
        reloadLabManagers: false,
      };
    case NEW_LAB_MANAGER_SUCCESS:
      return {
        ...state,
        newLabManagerLoading: false,
        newLabManagerSuccess: true,
        reloadLabManagers: true,
      };
    case NEW_LAB_MANAGER_FAIL:
      return {
        ...state,
        newLabManagerLoading: false,
        newLabManagerError: true,
      };

    default:
      return state;
  }
};
export default adminLabManagersReducer;
