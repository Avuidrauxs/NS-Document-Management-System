module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Roles', [{
      description: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      description: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {}),
  down: queryInterface =>
    queryInterface.bulkDelete('Roles', null, {})
};
