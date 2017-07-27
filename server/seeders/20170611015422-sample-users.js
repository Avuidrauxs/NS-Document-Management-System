const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = {
  up: queryInterface =>
  queryInterface.bulkInsert('Users', [{
    username: 'admin',
    fullName: 'Admin Igwe',
    email: 'admin@nsdms.org',
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD,
      bcrypt.genSaltSync(8)),
    roleId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    username: 'PepperSoup',
    fullName: 'Pepper Soup',
    email: 'p.soup@nsdms.org',
    password: bcrypt.hashSync(process.env.USER_PASSWORD, bcrypt.genSaltSync(8)),
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface =>
  queryInterface.bulkDelete('Users', null, {})
};
