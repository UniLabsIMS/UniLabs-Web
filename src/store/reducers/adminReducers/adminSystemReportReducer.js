import SystemReport from '../../../models/systemReport';
import {
  ADMIN_SYSTEM_REPORT_LOADING,
  ADMIN_SYSTEM_REPORT_ERROR,
  ADMIN_SYSTEM_REPORT_LOADED,
  ADMIN_SYSTEM_REPORT_RESET,
} from '../../actionTypes/adminActionTypes';

const initialState = {
  systemReport: null,
  isSystemReportLoading: false,
  systemReportSuccess: false,
  systemReportError: false,
};

const adminSystemReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_SYSTEM_REPORT_RESET:
      return initialState;
    case ADMIN_SYSTEM_REPORT_LOADING:
      return {
        ...state,
        isSystemReportLoading: true,
        systemReportSuccess: false,
        systemReportError: false,
      };
    case ADMIN_SYSTEM_REPORT_LOADED:
      return {
        ...state,
        systemReport: new SystemReport(action.payload),
        isSystemReportLoading: false,
        systemReportSuccess: true,
        systemReportError: false,
      };
    case ADMIN_SYSTEM_REPORT_ERROR:
      return {
        ...state,
        isSystemReportLoading: false,
        systemReportSuccess: false,
        systemReportError: true,
      };

    default:
      return state;
  }
};
export default adminSystemReportReducer;
