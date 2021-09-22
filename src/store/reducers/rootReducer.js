import { combineReducers } from 'redux';
import authReducer from './authReducer';
import labManagerDashReducer from './labManagerReducers/labManagerDashBoardReducer';
import labManagerDisplayItemsReducer from './labManagerReducers/labManagerDisplayItemsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  labManagerDashboard: labManagerDashReducer,
  labManagerDisplayItems: labManagerDisplayItemsReducer,
});

export default rootReducer;
