export const ADMIN_ROLE = 'Admin';
export const LAB_MANAGER_ROLE = 'Lab_Manager';
export const LAB_ASSISTANT_ROLE = 'Lab_Assistant';
export const STUDENT_ROLE = 'Student';
export const LECTURER_ROLE = 'Lecturer';

export const ADMIN_BASE_URL = '/admin';
export const LAB_MANAGER_BASE_URL = '/lab_manager';
export const LAB_ASSISTANT_BASE_URL = '/lab_assistant';
export const STUDENT_BASE_URL = '/student';
export const LECTURER_BASE_URL = '/lecturer';

// lab manager other
export const LAB_MANAGER_DISPLAY_ITEMS_URL =
  LAB_MANAGER_BASE_URL.concat('/category'); // add the id dynamically at the end
export const LAB_MANAGER_ITEMS_URL =
  LAB_MANAGER_BASE_URL.concat('/display_item'); // add the dsp id

// lab manager other
export const LAB_ASSISTANT_DISPLAY_ITEMS_URL =
  LAB_ASSISTANT_BASE_URL.concat('/category'); // add the id dynamically at the end
export const LAB_ASSISTANT_ITEMS_URL =
  LAB_ASSISTANT_BASE_URL.concat('/display_item'); // add the dsp id
