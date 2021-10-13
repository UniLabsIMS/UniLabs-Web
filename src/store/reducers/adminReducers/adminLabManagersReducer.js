import LabManager from '../../../models/labManager';
import {
  LAB_MANAGERS_ERROR,
  LAB_MANAGERS_LOADED,
  LAB_MANAGERS_LOADING,
  NEW_LAB_MANAGER_FAIL,
  NEW_LAB_MANAGER_LOADING,
  NEW_LAB_MANAGER_SUCCESS,
  RESET_LAB_MANAGER_STATE,
  LAB_MANAGER_BLOCK_UNBLOCK_LOADING,
  LAB_MANAGER_BLOCK_UNBLOCK_SUCCESS,
  LAB_MANAGER_BLOCK_UNBLOCK_ERROR,
} from '../../actionTypes/adminActionTypes';

const initialState = {
  labManagers: [],
  isLabManagersLoading: false,
  isLabManagersError: false,
  newLabManagerLoading: false,
  newLabManagerError: false,
  newLabManagerSuccess: false,
  reloadLabManagers: false,
  labManagerBlockUnblockLoading: false,
  labManagerBlockUnblockSuccess: false,
  labManagerBlockUnblockError: false,
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
        labManagerBlockUnblockLoading: false,
        labManagerBlockUnblockSuccess: false,
        labManagerBlockUnblockError: false,
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
        labManagerBlockUnblockLoading: false,
        labManagerBlockUnblockSuccess: false,
        labManagerBlockUnblockError: false,
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
    case LAB_MANAGER_BLOCK_UNBLOCK_LOADING:
      return {
        ...state,
        labManagerBlockUnblockLoading: true,
        labManagerBlockUnblockSuccess: false,
        labManagerBlockUnblockError: false,
        newLabManagerLoading: false,
        newLabManagerError: false,
        newLabManagerSuccess: false,
      };
    case LAB_MANAGER_BLOCK_UNBLOCK_SUCCESS:
      return {
        ...state,
        labManagers: action.payload,
        labManagerBlockUnblockLoading: false,
        labManagerBlockUnblockSuccess: true,
        labManagerBlockUnblockError: false,
      };
    case LAB_MANAGER_BLOCK_UNBLOCK_ERROR:
      return {
        ...state,
        labManagerBlockUnblockLoading: false,
        labManagerBlockUnblockSuccess: false,
        labManagerBlockUnblockError: true,
      };

    default:
      return state;
  }
};
export default adminLabManagersReducer;
