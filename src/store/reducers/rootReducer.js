import { combineReducers } from 'redux';
import adminDepartmentsReducer from './adminReducers/adminDepartmentsReducer';
import authReducer from './authReducer';
import labAssistantCategoriesReducer from './labAssistantReducers/labAssistantCategoriesReducer';
import labManagerDashReducer from './labManagerReducers/labManagerDashBoardReducer';
import labManagerDisplayItemsReducer from './labManagerReducers/labManagerDisplayItemsReducer';
import labManagerItemsReducer from './labManagerReducers/labManagerItemsReducer';
import labAssistantDisplayItemsReducer from './labAssistantReducers/labAssistantDisplayItemsReducer';
import labAssistantItemsReducer from './labAssistantReducers/labAssistantItemsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  adminDepartments: adminDepartmentsReducer,
  labManagerDashboard: labManagerDashReducer,
  labManagerDisplayItems: labManagerDisplayItemsReducer,
  labManagerItems: labManagerItemsReducer,
  labAssistantCategories: labAssistantCategoriesReducer,
  labAssistantDisplayItems: labAssistantDisplayItemsReducer,
  labAssistantItems: labAssistantItemsReducer,
});

export default rootReducer;
