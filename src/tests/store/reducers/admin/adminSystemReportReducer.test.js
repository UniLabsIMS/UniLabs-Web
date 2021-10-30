import LabReport from '../../../../models/labReport';
import SystemReport from '../../../../models/systemReport';
import {
  ADMIN_SYSTEM_REPORT_LOADING,
  ADMIN_SYSTEM_REPORT_ERROR,
  ADMIN_SYSTEM_REPORT_LOADED,
  ADMIN_SYSTEM_REPORT_RESET,
  ADMIN_LAB_REPORT_LOADING,
  ADMIN_LAB_REPORT_ERROR,
  ADMIN_LAB_REPORT_LOADED,
} from '../../../../store/actionTypes/adminActionTypes';

import adminSystemReportReducer from '../../../../store/reducers/adminReducers/adminSystemReportReducer';

describe('Admin - System Report Reducer', () => {
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

  it('returns the initial state when an action type is not passed', () => {
    const reducer = adminSystemReportReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles RESET_SYSTEM_REPORT_STATE event as expected', () => {
    const reducer = adminSystemReportReducer(initialState, {
      type: ADMIN_SYSTEM_REPORT_RESET,
    });

    expect(reducer).toEqual(initialState);
  });

  it('handles ADMIN_SYSTEM_REPORT_LOADING event as expected', () => {
    const reducer = adminSystemReportReducer(initialState, {
      type: ADMIN_SYSTEM_REPORT_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      isSystemReportLoading: true,
      systemReportSuccess: false,
      systemReportError: false,
    });
  });

  it('handles ADMIN_SYSTEM_REPORT_LOADED event as expected', () => {
    const testStartState = {
      ...initialState,
      isSystemReportLoading: true,
      systemReportSuccess: false,
      systemReportError: false,
    };

    const reducer = adminSystemReportReducer(testStartState, {
      type: ADMIN_SYSTEM_REPORT_LOADED,
      payload: { report: [], labs: [] },
    });

    expect(reducer).toEqual({
      ...testStartState,
      systemReport: new SystemReport([]),
      labs: [],
      isSystemReportLoading: false,
      systemReportSuccess: true,
      systemReportError: false,
    });
  });

  it('handles ADMIN_SYSTEM_REPORT_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      isSystemReportLoading: true,
      systemReportSuccess: false,
      systemReportError: false,
    };

    const reducer = adminSystemReportReducer(testStartState, {
      type: ADMIN_SYSTEM_REPORT_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isSystemReportLoading: false,
      systemReportSuccess: false,
      systemReportError: true,
    });
  });

  it('handles ADMIN_LAB_REPORT_LOADING event as expected', () => {
    const reducer = adminSystemReportReducer(initialState, {
      type: ADMIN_LAB_REPORT_LOADING,
    });

    expect(reducer).toEqual({
      ...initialState,
      isLabReportLoading: true,
      labReportSuccess: false,
      labReportError: false,
    });
  });

  it('handles ADMIN_LAB_REPORT_LOADED event as expected', () => {
    const testStartState = {
      ...initialState,
      isLabReportLoading: true,
      labReportSuccess: false,
      labReportError: false,
    };

    const reducer = adminSystemReportReducer(testStartState, {
      type: ADMIN_LAB_REPORT_LOADED,
      payload: [],
    });

    expect(reducer).toEqual({
      ...testStartState,
      labReport: new LabReport([]),
      isLabReportLoading: false,
      labReportSuccess: true,
      labReportError: false,
    });
  });

  it('handles ADMIN_LAB_REPORT_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      isLabReportLoading: true,
      labReportSuccess: false,
      labReportError: false,
    };

    const reducer = adminSystemReportReducer(testStartState, {
      type: ADMIN_LAB_REPORT_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      isLabReportLoading: false,
      labReportSuccess: false,
      labReportError: true,
    });
  });
});
