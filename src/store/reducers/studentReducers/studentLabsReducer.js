import Lab from '../../../models/lab';
import {
  STUDENT_LABS_ERROR,
  STUDENT_LABS_LOADED,
  STUDENT_LABS_LOADING,
} from '../../actionTypes/studentActionTypes';

const initialState = {
  labs: [],
  isLabsLoading: false,
  isLabsError: false,
  reloadLabs: false,
};

const studentLabsReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT_LABS_LOADING:
      return {
        ...state,
        isLabsLoading: true,
        isLabsError: false,
        reloadLabs: false,
      };
    case STUDENT_LABS_LOADED:
      return {
        ...state,
        isLabsLoading: false,
        labs: action.payload.map(obj => new Lab(obj)),
        isLabsError: false,
      };
    case STUDENT_LABS_ERROR:
      return {
        ...state,
        isLabsLoading: false,
        labs: [],
        isLabsError: true,
      };
    default:
      return state;
  }
};
export default studentLabsReducer;
