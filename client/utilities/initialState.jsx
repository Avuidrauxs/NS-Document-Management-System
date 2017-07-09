export default {
  documents: [],
  roles: [],
  document: {},
  auth: { loggedIn: false, user: {} },
  users: {
    users: [],
    profile: { username: '', fullName: '', email: '' }
  },
  pagination: { page: 1, pageCount: 1, pageSize: 0, totalCount: 0, offset: 0, query: '', },
};
