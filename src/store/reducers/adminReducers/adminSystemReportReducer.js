import Lab from '../../../models/lab';
import SystemReport from '../../../models/systemReport';
import LabReport from '../../../models/labReport';
import {
  ADMIN_SYSTEM_REPORT_LOADING,
  ADMIN_SYSTEM_REPORT_ERROR,
  ADMIN_SYSTEM_REPORT_LOADED,
  ADMIN_SYSTEM_REPORT_RESET,
  ADMIN_LAB_REPORT_LOADING,
  ADMIN_LAB_REPORT_ERROR,
  ADMIN_LAB_REPORT_LOADED,
} from '../../actionTypes/adminActionTypes';

const initialState = {
  systemReport: null,
  labReport: null,
  labs: [],
  isSystemReportLoading: false,
  systemReportSuccess: false,
  systemReportError: false,
  isLabReportLoading: false,
  labReportSuccess: false,
  labReportError: false,
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
        systemReport: new SystemReport(action.payload.report),
        labs: action.payload.labs.map(obj => new Lab(obj)),
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
    case ADMIN_LAB_REPORT_LOADING:
      return {
        ...state,
        isLabReportLoading: true,
        labReportSuccess: false,
        labReportError: false,
      };
    case ADMIN_LAB_REPORT_LOADED:
      return {
        ...state,
        labReport: new LabReport(action.payload),
        isLabReportLoading: false,
        labReportSuccess: true,
        labReportError: false,
      };
    case ADMIN_LAB_REPORT_ERROR:
      return {
        ...state,
        isLabReportLoading: false,
        labReportSuccess: false,
        labReportError: true,
      };
    default:
      return state;
  }
};
export default adminSystemReportReducer;
