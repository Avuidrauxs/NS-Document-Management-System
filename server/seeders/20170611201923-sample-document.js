module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Documents', [{
      title: 'Non-Sucking Document Management System',
      body: `Just like the name suggests this app doesn't suck like aother documents
      Management systems`,
      authorId: 1,
      access: 'private',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Taken Epic Liam Neeson Monologue',
      body: `If you are looking for ransom I can tell you I don't have money,
      but what I do have are a very particular set of skills.
      Skills I have acquired over a very long career.
      Skills that make me a nightmare for people like you.
      If you let my daughter go now that'll be the end of it.`,
      authorId: 2,
      access: 'public',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Audax',
      body: 'I am a banana',
      authorId: 1,
      access: 'role',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {}),
  down: queryInterface =>
  queryInterface.bulkDelete('Documents', null, {})
};
