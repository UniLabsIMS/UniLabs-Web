// ROLES
export const ADMIN_ROLE = 'Admin';
export const LAB_MANAGER_ROLE = 'Lab_Manager';
export const LAB_ASSISTANT_ROLE = 'Lab_Assistant';
export const STUDENT_ROLE = 'Student';
export const LECTURER_ROLE = 'Lecturer';

// ITEM STATES
export const ITEM_STATE_AVAILABLE = 'Available';
export const ITEM_STATE_BORROWED = 'Borrowed';
export const ITEM_STATE_TEMP_BORROWED = 'Temp_Borrowed';
export const ITEM_STATE_DAMAGED = 'Damaged';

// IN APP URLs
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

// student other urls
export const STUDENT_CATEGORIES_URL = STUDENT_BASE_URL.concat('/lab/'); // concat lab id
export const STUDENT_DISPLAY_ITEMS_URL =
  STUDENT_BASE_URL.concat('/lab/category/'); // concat cat id
export const STUDENT_LAB_BUCKET_URL = STUDENT_BASE_URL.concat('/lab-bucket/'); // concat lab id

// lecturer other urls
export const LECTURER_REQUEST_URL = LECTURER_BASE_URL.concat('/request/'); // concat request id

// Request Approve or Decline State

export const APPROVE_REQUEST = 'Approved';
export const DECLINE_REQUEST = 'Declined';
