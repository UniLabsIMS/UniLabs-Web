import { combineReducers } from 'redux';
import adminDepartmentsReducer from './adminReducers/adminDepartmentsReducer';
import adminLabsReducer from './adminReducers/adminLabsReducer';
import adminAdminsReducer from './adminReducers/adminAdminsReducer';
import adminStudentsReducer from './adminReducers/adminStudentsReducer';
import adminLecturersReducer from './adminReducers/adminLecturersReducer';
import adminLabManagersReducer from './adminReducers/adminLabManagersReducer';
import adminLabAssistantsReducer from './adminReducers/adminLabAssistantsReduer.js';
import studentLabsReducer from './studentReducers/studentLabsReducer';
import studentCategoriesReducer from './studentReducers/studentCategoriesReducer';
import studentDisplayItemsReducer from './studentReducers/studentDisplayItemsReducer';
import authReducer from './authReducer';
import labAssistantCategoriesReducer from './labAssistantReducers/labAssistantCategoriesReducer';
import labManagerDashReducer from './labManagerReducers/labManagerDashBoardReducer';
import labManagerDisplayItemsReducer from './labManagerReducers/labManagerDisplayItemsReducer';
import labManagerItemsReducer from './labManagerReducers/labManagerItemsReducer';
import labAssistantDisplayItemsReducer from './labAssistantReducers/labAssistantDisplayItemsReducer';
import labAssistantItemsReducer from './labAssistantReducers/labAssistantItemsReducer';
import labAssistantBorrowedItemsReducer from './labAssistantReducers/labAssistantBorrowedItemsReducer';
import labAssistantTempBorrowedItemsReducer from './labAssistantReducers/labAssistantTempBorrowedItemsReducer';
import studentLabBucketReducer from './studentReducers/studentBucketReducer';
import adminSystemReportReducer from './adminReducers/adminSystemReportReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  adminDepartments: adminDepartmentsReducer,
  adminLabs: adminLabsReducer,
  adminAdmins: adminAdminsReducer,
  adminStudents: adminStudentsReducer,
  adminLecturers: adminLecturersReducer,
  adminLabManagers: adminLabManagersReducer,
  adminLabAssistants: adminLabAssistantsReducer,
  adminSystemReport: adminSystemReportReducer,
  studentLabs: studentLabsReducer,
  studentCategories: studentCategoriesReducer,
  studentDisplayItems: studentDisplayItemsReducer,
  studentLabBucket: studentLabBucketReducer,
  labManagerDashboard: labManagerDashReducer,
  labManagerDisplayItems: labManagerDisplayItemsReducer,
  labManagerItems: labManagerItemsReducer,
  labAssistantCategories: labAssistantCategoriesReducer,
  labAssistantDisplayItems: labAssistantDisplayItemsReducer,
  labAssistantItems: labAssistantItemsReducer,
  labAssistantBorrowedItems: labAssistantBorrowedItemsReducer,
  labAssistantTempBorrowedItems: labAssistantTempBorrowedItemsReducer,
});

export default rootReducer;
