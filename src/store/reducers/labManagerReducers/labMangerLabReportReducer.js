import {
  LAB_REPORT_LOADING,
  LAB_REPORT_LOADED,
  LAB_REPORT_ERROR,
} from '../../actionTypes/labManagerActionTypes';
import LabReport from '../../../models/labReport';

const initialState = {
  labReport: null,
  islabReportLoading: false,
  labReportError: false,
  labReportSuccess: false,
};

const labManagerLabReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case LAB_REPORT_LOADING:
      return {
        ...state,
        islabReportLoading: true,
        labReportSuccess: false,
        labReportError: false,
      };
    case LAB_REPORT_LOADED:
      return {
        ...state,
        islabReportLoading: false,
        labReport: new LabReport(action.payload),
        labReportSuccess: true,
        labReportError: false,
      };
    case LAB_REPORT_ERROR:
      return {
        ...state,
        labReport: null,
        islabReportLoading: false,
        labReportSuccess: true,
        labReportError: true,
      };
    default:
      return state;
  }
};
export default labManagerLabReportReducer;
