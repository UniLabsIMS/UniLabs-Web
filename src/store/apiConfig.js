export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const API_LOGIN_URL = API_BASE_URL.concat('/auth/login/');
export const API_REFRESH_URL = API_BASE_URL.concat('/auth/refresh-auth/');
export const API_LOGOUT_URL = API_BASE_URL.concat('/auth/logout/');
export const API_FORGOT_PASSWORD_URL = API_BASE_URL.concat(
  '/auth/reset-password/',
);
export const API_EDIT_PROFILE_URL = API_BASE_URL.concat(
  '/auth/update-profile/',
);
export const API_CHANGE_PASSWORD_URL = API_BASE_URL.concat(
  '/auth/change-password/',
);
export const API_BLOCK_UNBLOCK_USER = API_BASE_URL.concat('/auth/block/'); // concat user id

// ------------------------ADMIN----------------------------------
export const API_ADMIN_DEPARTMENTS_URL = API_BASE_URL.concat('/departments/');
export const API_ADMIN_NEW_DEPARTMENT_URL = API_BASE_URL.concat(
  '/departments/create/',
);
export const API_ADMIN_LABS_URL = API_BASE_URL.concat('/labs/');
export const API_ADMIN_DEPT_LABS_URL = API_BASE_URL.concat(
  '/labs/of-department/',
);
export const API_ADMIN_NEW_LAB_URL = API_BASE_URL.concat('/labs/create/');
export const API_ADMIN_LAB_ASSIGN_LECTURER_URL = API_BASE_URL.concat(
  '/labs/assign-lecturers/',
);
export const API_ADMIN_ADMINS_URL = API_BASE_URL.concat('/admins/');
export const API_ADMIN_NEW_ADMIN_URL = API_BASE_URL.concat('/admins/register/');
export const API_ADMIN_STUDENTS_URL = API_BASE_URL.concat('/students/');
export const API_ADMIN_NEW_STUDENT_URL = API_BASE_URL.concat(
  '/students/register/',
);
export const API_ADMIN_LECTURERS_URL = API_BASE_URL.concat('/lecturers/');
export const API_ADMIN_NEW_LECTURER_URL = API_BASE_URL.concat(
  '/lecturers/register/',
);
export const API_ADMIN_LAB_MANAGERS_URL = API_BASE_URL.concat('/lab-managers/');
export const API_ADMIN_NEW_LAB_MANAGER_URL = API_BASE_URL.concat(
  '/lab-managers/register/',
);
export const API_ADMIN_LAB_ASSISTANTS_URL =
  API_BASE_URL.concat('/lab-assistants/');
export const API_ADMIN_NEW_LAB_ASSISTANT_URL = API_BASE_URL.concat(
  '/lab-assistants/register/',
);

export const API_ADMIN_SYSTEM_REPORT_URL = API_BASE_URL.concat(
  '/admins/system-report/',
);
export const API_ADMIN_LAB_REPORT_URL =
  API_BASE_URL.concat('/labs/lab-report/'); // concat lab id

// ------------------------STUDENT----------------------------------
export const API_STUDENT_LABS_URL = API_BASE_URL.concat('/labs/');
export const API_STUDENT_DEPARTMENTS_URL = API_BASE_URL.concat('/departments/');
export const API_STUDENT_CATEGORIES_URL = API_BASE_URL.concat(
  '/categories/of-lab/',
); // concat the lab id to this
export const API_STUDENT_DISPLAY_ITEMS_URL = API_BASE_URL.concat(
  '/display-items/of-item-category/',
); // concat the category id to this

export const API_STUDENT_NEW_REQUEST_URL =
  API_BASE_URL.concat('/requests/create/');
export const API_STUDENT_LECTURERS_OF_LAB_URL =
  API_BASE_URL.concat('/lecturers/of-lab/'); // concat lab id
export const API_STUDENT_CHECK_WHETHER_ACTIVE_REQUEST_IN_LAB_URL =
  API_BASE_URL.concat('/requests/check-student-active-request/'); // concat lab id
// ------------------------LECTURER----------------------------------
export const API_LECTURER_REQUESTS_URL = API_BASE_URL.concat(
  '/requests/lecturer-requests/',
);
export const API_LECTURER_REQUEST_URL = API_BASE_URL.concat('/requests/'); // concat req id
export const API_LECTURER_APPROVE_OR_DECLINE_REQUESTS_URL = API_BASE_URL.concat(
  '/requests/approve-or-decline/',
); // concat req id

// ---------------------LABMANAGER-------------------------------
export const API_LAB_MANAGER_ALL_CATEGORIES_URL = API_BASE_URL.concat(
  '/categories/of-lab/',
); // concat the lab id to this
export const API_LAB_MANAGER_NEW_CATEGORIES_URL = API_BASE_URL.concat(
  '/categories/create/',
);
export const API_LAB_MANAGER_EDIT_CATEGORIES_URL = API_BASE_URL.concat(
  '/categories/update/',
); // concat the category id to thi
export const API_LAB_MANAGER_ALL_DISPLAY_ITEMS_URL = API_BASE_URL.concat(
  '/display-items/of-item-category/',
); // concat the category id to this
export const API_LAB_MANAGER_NEW_DISPLAY_ITEM_URL = API_BASE_URL.concat(
  '/display-items/create/',
);
export const API_LAB_MANAGER_EDIT_DISPLAY_ITEM_URL = API_BASE_URL.concat(
  '/display-items/update/',
);
export const API_LAB_MANAGER_ALL_ITEMS_URL = API_BASE_URL.concat(
  '/items/of-display-item/',
); // concat the display item id to this
export const API_LAB_MANAGER_NEW_ITEM_URL =
  API_BASE_URL.concat('/items/create/');

export const API_LAB_MANAGER_ITEM_DELETED_URL =
  API_BASE_URL.concat('/items/delete/'); // concat item id

export const API_LAB_MANAGER_LAB_REPORT_URL =
  API_BASE_URL.concat('/labs/lab-report/'); // concat lab id

// ---------------------LABASSISTANT-------------------------------
export const API_LAB_ASSISTANT_ALL_CATEGORIES_URL = API_BASE_URL.concat(
  '/categories/of-lab/',
); // concat the lab id to this

export const API_LAB_ASSISTANT_ALL_DISPLAY_ITEMS_URL = API_BASE_URL.concat(
  '/display-items/of-item-category/',
); // concat the category id to this

export const API_LAB_ASSISTANT_ALL_ITEMS_URL = API_BASE_URL.concat(
  '/items/of-display-item/',
); // concat the display item id to this
export const API_LAB_ASSISTANT_NEW_ITEM_URL =
  API_BASE_URL.concat('/items/create/');

export const API_LAB_ASSISTANT_ITEM_DELETED_URL =
  API_BASE_URL.concat('/items/delete/'); // concat item id

export const API_LAB_ASSISTANT_BORROWED_ITEMS_URL = API_BASE_URL.concat(
  '/items/borrowed/from-lab/',
); // concat lab id
