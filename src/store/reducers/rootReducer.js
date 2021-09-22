import { combineReducers } from 'redux';
import authReducer from './authReducer';
import labManagerDashReducer from './labManagerReducers/labManagerDashBoardReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  labManagerDashboard: labManagerDashReducer,
});

export default rootReducer;
