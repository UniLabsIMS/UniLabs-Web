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
