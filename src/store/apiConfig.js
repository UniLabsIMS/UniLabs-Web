/* eslint-disable import/prefer-default-export */
// export const API_BASE_URL = 'https://unilabs-api.herokuapp.com';
export const API_BASE_URL = 'http://127.0.0.1:8000';
export const API_LOGIN_URL = API_BASE_URL.concat('/auth/login/');
export const API_REFRESH_URL = API_BASE_URL.concat('/auth/refresh-auth/');
export const API_LOGOUT_URL = API_BASE_URL.concat('/auth/logout/');

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

// ---------------------LABMANAGER-------------------------------
export const API_LAB_MANAGER_ALL_CATEGORIES_URL = API_BASE_URL.concat(
  '/categories/of-lab/',
); // concat the lab id to this
export const API_LAB_MANAGER_NEW_CATEGORIES_URL = API_BASE_URL.concat(
  '/categories/create/',
);
export const API_LAB_MANAGER_ALL_DISPLAY_ITEMS_URL = API_BASE_URL.concat(
  '/display-items/of-item-category/',
); // concat the category id to this
export const API_LAB_MANAGER_NEW_DISPLAY_ITEM_URL = API_BASE_URL.concat(
  '/display-items/create/',
);
