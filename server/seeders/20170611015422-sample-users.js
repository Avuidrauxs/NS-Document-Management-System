const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface =>
  queryInterface.bulkInsert('Users', [{
    username: 'admin',
    fullName: 'Admin Igwe',
    email: 'admin@nsdms.org',
    password: bcrypt.hashSync('admin', bcrypt.genSaltSync(8)),
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    username: 'PepperSoup',
    fullName: 'Pepper Soup',
    email: 'p.soup@nsdms.org',
    password: bcrypt.hashSync('soup', bcrypt.genSaltSync(8)),
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface =>
  queryInterface.bulkDelete('Users', null, {})
};
