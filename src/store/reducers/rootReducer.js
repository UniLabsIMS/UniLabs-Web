import { combineReducers } from 'redux';
import adminDepartmentsReducer from './adminReducers/adminDepartmentsReducer';
import adminLabsReducer from './adminReducers/adminLabsReducer';
import adminAdminsReducer from './adminReducers/adminAdminsReducer';
import adminStudentsReducer from './adminReducers/adminStudentsReducer';
import adminLecturersReducer from './adminReducers/adminLecturersReducer';
import adminLabManagersReducer from './adminReducers/adminLabManagersReducer';
import adminLabAssistantsReducer from './adminReducers/adminLabAssistantsReduer.js';
import authReducer from './authReducer';
import labManagerDashReducer from './labManagerReducers/labManagerDashBoardReducer';
import labManagerDisplayItemsReducer from './labManagerReducers/labManagerDisplayItemsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  adminDepartments: adminDepartmentsReducer,
  adminLabs: adminLabsReducer,
  adminAdmins: adminAdminsReducer,
  adminStudents: adminStudentsReducer,
  adminLecturers: adminLecturersReducer,
  adminLabManagers: adminLabManagersReducer,
  adminLabAssistants: adminLabAssistantsReducer,
  labManagerDashboard: labManagerDashReducer,
  labManagerDisplayItems: labManagerDisplayItemsReducer,
});

export default rootReducer;
