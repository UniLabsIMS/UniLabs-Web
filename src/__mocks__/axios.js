// axios.js
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: jest.fn(() => Promise.resolve({ data: 'mocked' })),
  post: jest.fn(() => Promise.resolve({ data: 'mocked' })),
  put: jest.fn(() => Promise.resolve({ data: 'mocked' })),
  patch: jest.fn(() => Promise.resolve({ data: 'mocked' })),
  delete: jest.fn(() => Promise.resolve({ data: 'mocked' })),
};
