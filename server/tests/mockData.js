import faker from 'faker';
import bcrypt from 'bcrypt';

export default {
  sampleUser1: {
    username: 'jojo',
    fullName: 'Jonathan Joestar',
    email: 'jojo@hot.com',
    password: bcrypt.hashSync('StarPlatinum', bcrypt.genSaltSync(8)),
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  sampleUser2: {
    username: 'dio',
    fullName: 'Dio Brando',
    email: 'dio@hot.com',
    password: bcrypt.hashSync('ZaWarudo', bcrypt.genSaltSync(8)),
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  sampleUser3: {
    fullName: 'Falayi',
    email: 'efalayi@hot.com',
    password: bcrypt.hashSync('poundedYam', bcrypt.genSaltSync(8)),
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  sampleUser4: {
    username: faker.internet.userName(),
    fullName: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  sampleAdmin: {
    username: 'Mark',
    fullName: 'Edom',
    email: 'edom@hot.com',
    password: bcrypt.hashSync('mafia', bcrypt.genSaltSync(8)),
    roleId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  privateDoc: {
    title: 'Life is tasty',
    body: 'Like Aluguntungui',
    access: 'private',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  roleDoc: {
    title: 'Wei de3 aluguntungui',
    body: 'gui gui gui !!!',
    access: 'role',
    authorId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  publicDoc: {
    title: faker.lorem.words(),
    body: faker.lorem.paragraph(),
    access: 'public',
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  author: {
    username: 'audax',
    fullName: faker.name.findName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync('banana', bcrypt.genSaltSync(8)),
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  publisher: {
    username: faker.internet.userName(),
    fullName: faker.name.findName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync('banana', bcrypt.genSaltSync(8)),
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  fakeUserDetails: {
    username: faker.internet.userName(),
    fullName: faker.name.findName(),
    email: 'pop',
    password: faker.internet.password(),
    roleId: 2
  },
  invalidToken: 'Im a banana',
  adminToken: 'Bonanza',
  userToken: 'Beetlejuice',
  fakeDocument: {
    title: faker.lorem.words(),
    body: faker.lorem.paragraph(),
    access: 'public',
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  roleOne: {
    description: 'editor',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  roleTwo: {
    description: 'publisher',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  admin: {
    username: 'admin',
    password: 'admin'
  },
  user: {
    username: 'PepperSoup',
    password: 'soup'
  },
  pepper: {
    id: 2,
    username: 'PepperSoup',
    fullName: 'Pepper Soup',
    email: 'p.soup@nsdms.org',
    roleId: 2
  }
};
