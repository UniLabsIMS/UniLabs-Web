import LabReport from '../../../../models/labReport';
import {
  LAB_REPORT_LOADING,
  LAB_REPORT_LOADED,
  LAB_REPORT_ERROR,
} from '../../../../store/actionTypes/labManagerActionTypes';
import labManagerLabReportReducer from '../../../../store/reducers/labManagerReducers/labMangerLabReportReducer';

describe('labManager - CategoriesReducer', () => {
  const initialState = {
    labReport: null,
    islabReportLoading: false,
    labReportError: false,
    labReportSuccess: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const reducer = labManagerLabReportReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles LAB_REPORT_LOADING event as expected', () => {
    const testStartState = {
      ...initialState,
      islabReportLoading: false,
      labReportSuccess: true,
      labReportError: false,
    };
    const reducer = labManagerLabReportReducer(testStartState, {
      type: LAB_REPORT_LOADING,
    });

    expect(reducer).toEqual({
      ...testStartState,
      islabReportLoading: true,
      labReportSuccess: false,
      labReportError: false,
    });
  });

  it('handles LAB_REPORT_LOADED event as expected', () => {
    const testStartState = {
      ...initialState,
      islabReportLoading: true,
      labReportSuccess: false,
      labReportError: false,
    };
    const reducer = labManagerLabReportReducer(testStartState, {
      type: LAB_REPORT_LOADED,
      payload: {},
    });

    expect(reducer).toEqual({
      ...testStartState,
      islabReportLoading: false,
      labReport: new LabReport({}),
      labReportSuccess: true,
      labReportError: false,
    });
  });

  it('handles LAB_REPORT_ERROR event as expected', () => {
    const testStartState = {
      ...initialState,
      islabReportLoading: true,
      labReportSuccess: false,
      labReportError: false,
    };
    const reducer = labManagerLabReportReducer(testStartState, {
      type: LAB_REPORT_ERROR,
    });

    expect(reducer).toEqual({
      ...testStartState,
      labReport: null,
      islabReportLoading: false,
      labReportSuccess: true,
      labReportError: true,
    });
  });

  it('returns current state for invalid action type', () => {
    const reducer = labManagerLabReportReducer(initialState, {
      type: 'Invalid Type',
    });

    expect(reducer).toEqual(initialState);
  });
});
