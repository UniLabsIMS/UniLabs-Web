// eslint-disable-next-line import/prefer-default-export
export const studentAddRequestResponseData = {
  id: '24616094-3cdb-4fbe-850c-562c99179075',
  student: {
    id: '533a6e07-bf99-4587-ae83-52f5e14c547b',
    student_id: '180542',
    email: 'testStudent4@example.com',
    first_name: '',
    last_name: '',
    contact_number: '',
    image: null,
    role: 'Student',
    blocked: false,
    department: {
      id: 'e0d06d86-9cbe-4a79-85e1-5954ea10c113',
      name: 'ENTC',
      code: '47282',
    },
  },
  lecturer: {
    id: 'cbe296d8-e3a9-404e-b4d7-5eee3c40434f',
    lecturer_id: '67340',
    email: 'testLecturer5@example.com',
    first_name: '',
    last_name: '',
    contact_number: '',
    image: null,
    role: 'Lecturer',
    blocked: false,
    department: {
      id: 'e0d06d86-9cbe-4a79-85e1-5954ea10c113',
      name: 'ENTC',
      code: '47282',
    },
    permitted_labs: [
      {
        id: '5a1e9140-e9be-4762-b6c9-e3f726337b28',
        name: 'ENTC Digital Electronics Lab 1',
        location: 'ENTC building',
        contact_no: '0916542349',
        contact_email: 'entcdl1@uom.lk',
        image: null,
        created_at: '2021-09-25T12:13:51.443681Z',
        department: 'e0d06d86-9cbe-4a79-85e1-5954ea10c113',
      },
    ],
  },
  lab: '086fc6e5-2d8f-4760-a7ea-b8781ae4ae86',
  reason: 'test reason',
  display_items_dict: {
    '19453063-c1ba-48f8-b9cb-4fd3778b4ced': 2,
    '287c4a97-b343-4071-ace0-01f978b6ca8a': 4,
  },
};
