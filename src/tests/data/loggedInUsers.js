import User from '../../models/user';

export const loggedInLabManager = new User({
  id: '68053243-45ba-4a4c-8a5f-f2bcd0d8d5d3',
  token: '4092d5c0d58ac7efa906c0c43fd6ce9c961d03d2e0993911bf78bfd1c93446de',
  email: 'lab_manager@example.com',
  role: 'Lab_Manager',
  first_name: 'Avishka',
  last_name: 'Shamendra',
  contact_number: '07774536425',
  image: 'http://127.0.0.1:8000/media/users/profile_img.jpg',
  is_default_password: false,
  blocked: false,
  other_details: {
    lab: {
      id: '7ad9f009-bd00-48c5-bea7-85cf77754267',
      name: 'string',
      location: '',
      contact_no: '',
      contact_email: '',
      image: null,
      created_at: '2021-08-20T03:07:38.376806Z',
      department: 'c0362f47-3d88-4712-a934-6899c8584ee1',
    },
    department: {
      id: 'c0362f47-3d88-4712-a934-6899c8584ee1',
      name: 'test_2',
      code: 'TM',
    },
  },
});

export const loggedInLabAssistant = new User({
  id: '68053243-45ba-4a4c-8a5f-f2bcd0d8d5d3',
  token: '4092d5c0d58ac7efa906c0c43fd6ce9c961d03d2e0993911bf78bfd1c93446de',
  email: 'lab_assistant@example.com',
  role: 'Lab_Assistant',
  first_name: 'Avishka',
  last_name: 'Shamendra',
  contact_number: '07774536425',
  image: 'http://127.0.0.1:8000/media/users/profile_img.jpg',
  is_default_password: false,
  blocked: false,
  other_details: {
    lab: {
      id: '7ad9f009-bd00-48c5-bea7-85cf77754267',
      name: 'string',
      location: '',
      contact_no: '',
      contact_email: '',
      image: null,
      created_at: '2021-08-20T03:07:38.376806Z',
      department: 'c0362f47-3d88-4712-a934-6899c8584ee1',
    },
    department: {
      id: 'c0362f47-3d88-4712-a934-6899c8584ee1',
      name: 'test_2',
      code: 'TM',
    },
  },
});

export const loggedInAdmin = new User({
  id: 'c1aed5b6-6144-41e7-a060-e659a7e2ca1d',
  token: '9fe53469894f5b57f9ca6900cae69cab273c07279cde8c4bbd7e26eb36684ea7',
  email: 'fristsecAdmin@example.com',
  role: 'Admin',
  first_name: '',
  last_name: '',
  contact_number: '',
  image: null,
  is_default_password: true,
  blocked: false,
  other_details: null,
});

export const loggedInStudent = new User({
  id: 'b4745f69-fbb8-4010-aa91-f73745d58a90',
  token: '786755987aeef15095da523f424fd0062b9569dc108c4f7bc700c0c1ddd7cd66',
  email: 'student@example.com',
  role: 'Student',
  first_name: '',
  last_name: '',
  contact_number: '',
  image: null,
  is_default_password: true,
  blocked: false,
  other_details: {
    student_id: '180123',
    department: {
      id: 'd4b7f05c-82ef-4187-b407-e19a6e574d19',
      name: 'CSE',
      code: '123',
    },
  },
});
