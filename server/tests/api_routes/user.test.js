import chai from 'chai';
import http from 'chai-http';
import app from '../../app';
import models from '../../models/';
import data from '../mockData';

const expect = chai.expect;
chai.use(http);
let adminToken, userToken, fakeId;
const { pepper, fakeUserDetails, sampleAdmin,
  sampleUser1, sampleUser2, sampleUser3,
  sampleUser4, admin, user } = data;

describe('Users', () => {
  after((done) => {
    models.User.destroy({ where: { id: { $notIn: [1, 2] } } });
    done();
  });

  describe('Users login route', () => {
    it('should log in a user and return a token', (done) => {
      chai.request(app)
        .post('/api/users/login')
        .send(admin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.keys(['token', 'message']);
          expect(res.body.message).to.eql('Successfully logged in');
          done();
        });
    });

    it('should deny access for wrong credentials', (done) => {
      chai.request(app)
        .post('/api/users/login')
        .send({ username: admin.username, password: 'soup' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('Invalid password or username');
          done();
        });
    });
  });

  before((done) => {
    chai.request(app)
        .post('/api/users/login')
        .send(admin)
        .end((err, res) => {
          adminToken = res.body.token;
          done();
        });
  });

  before((done) => {
    chai.request(app)
    .post('/api/users/login')
    .send(user)
    .end((err, res) => {
      userToken = res.body.token;
      done();
    });
  });


  describe('Create new users route ', () => {
    it('should be able to create and add a new user', (done) => {
      chai.request(app)
      .post('/api/users')
      .send(sampleUser1)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.keys(
          ['id', 'username', 'fullName', 'email',
            'roleId', 'message', 'token']
        );
        expect(res.body.message).to.eql(`Created ${sampleUser1.username}`);
        sampleUser1.userId = res.body.id;
        done();
      });
    });

    it('should fail if email alreay exists', (done) => {
      sampleUser2.email = sampleUser1.email;
      chai.request(app)
      .post('/api/users')
      .send(sampleUser2)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.eql('Email already exist');
        done();
      });
    });

    it('should not allow the creation of a user with admin role', (done) => {
      chai.request(app)
      .post('/api/users')
      .send(sampleAdmin)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.eql('Invalid Privilege');
        done();
      });
    });

    it('should return a token after successfully creating a user', (done) => {
      chai.request(app)
      .post('/api/users')
      .send(sampleUser4)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.token).to.not.be.undefined;
        expect(res.body.message).to.eql(`Created ${sampleUser4.username}`);
        sampleUser4.userId = res.body.id;
        done();
      });
    });

    it('should fail for fake user details', (done) => {
      chai.request(app)
      .post('/api/users')
      .send(fakeUserDetails)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.eql('Validation error: Please enter a valid email');
        done();
      });
    });
  });


  describe('Fetching Users', () => {
    it('should return all users', (done) => {
      chai.request(app)
        .get('/api/users')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.rows).to.be.a('array');
          expect(res.body.rows.length).to.be.greaterThan(2);
          done();
        });
    });

    it('should deny access if user is not admin', (done) => {
      chai.request(app)
      .get('/api/users')
      .set({ 'x-access-token': userToken })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('You dont have privileges');
        done();
      });
    });

    it('should deny access if no token was provided', (done) => {
      chai.request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('No token provided');
        done();
      });
    });

    it('should return correct user(s) for a query', (done) => {
      chai.request(app)
        .get('/api/users?q=admin')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.rows).to.be.a('array');
          expect(res.body.rows[0].username).to.eql('admin');
          done();
        });
    });

    it('can limit the number of users returned', (done) => {
      chai.request(app)
        .get('/api/users?limit=2')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.rows).to.be.a('array');
          expect(res.body.rows.length).to.equal(2);
          fakeId = res.body.rows[1].id;
          done();
        });
    });

    it('can offset the starting position of returned data', (done) => {
      chai.request(app)
        .get('/api/users?offset=1')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.rows).to.be.a('array');
          expect(res.body.rows[0].id).to.eql(fakeId);
          done();
        });
    });
  });


  describe('Fetching user by id', () => {
    it('should return a user based on id', (done) => {
      chai.request(app)
          .get('/api/users/2')
          .set({ 'x-access-token': userToken })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.eql({
              id: 2,
              username: 'PepperSoup',
              fullName: 'Pepper Soup',
              email: 'p.soup@nsdms.org',
              roleId: 2
            });
            done();
          });
    });

    it('should deny access if no token was provided', (done) => {
      chai.request(app)
        .get('/api/users/2')
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('No token provided');
          done();
        });
    });

    it('should send "User not found" for invalid id', (done) => {
      chai.request(app)
        .get('/api/users/250')
        .set({ 'x-access-token': userToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('User not found');
          done();
        });
    });

    it('should fail if the provided id is out of range',
      (done) => {
        chai.request(app)
        .get('/api/users/3000000000')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql(
            'value "3000000000" is out of range for type integer'
          );
          done();
        });
      });
  });


  describe('Updating User details', () => {
    it('should allow a user to update his/her details', (done) => {
      chai.request(app)
      .put('/api/users/2')
      .set({ 'x-access-token': userToken })
      .send({ fullName: 'Pito Soup' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.eql({
          id: 2,
          username: 'PepperSoup',
          fullName: 'Pito Soup',
          email: 'p.soup@nsdms.org',
          roleId: 2
        });
        done();
      });
    });

    it("should allow admin to update a user's details", (done) => {
      chai.request(app)
      .put('/api/users/2')
      .set({ 'x-access-token': adminToken })
      .send({ fullName: 'Pepper Soup' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.eql({
          id: 2,
          username: 'PepperSoup',
          fullName: 'Pepper Soup',
          email: 'p.soup@nsdms.org',
          roleId: 2
        });
        done();
      });
    });

    it('should not allow a user to use an existing email',
    (done) => {
      chai.request(app)
      .put('/api/users/2')
      .set({ 'x-access-token': userToken })
      .send({ email: 'admin@nsdms.org' })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Email already exist');
        done();
      });
    });

    it('should not allow a user to upgrade his/her role to admin', (done) => {
      chai.request(app)
      .put('/api/users/2')
      .set({ 'x-access-token': userToken })
      .send({ roleId: 1 })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql(
          'You dont have that kinda privilege'
        );
        done();
      });
    });

    it("should deny access if a user tries to update another user's profile",
    (done) => {
      chai.request(app)
      .put(`/api/users/${sampleUser1.userId}`)
      .set({ 'x-access-token': userToken })
      .send({ fullName: 'Al Tahir' })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('You dont have privileges yet!');
        done();
      });
    });
  });


  describe('Logging out a User', () => {
    it('should logout a user', (done) => {
      chai.request(app)
      .post('/api/users/logout')
      .send(admin)
      .end((err, res) => {
        expect(res.status).to.equal(203);
        expect(res.body).to.be.a('object');
        expect(res.body.message)
          .to.eql('Successfully logged out');
        done();
      });
    });
  });


  // DELETE /api/users/:id
  describe('Deleting a User', () => {
    let dummyToken;
    before((done) => {
      chai.request(app)
        .post('/api/users/login')
        .send(sampleUser4)
        .end((err, res) => {
          dummyToken = res.body.token;
          done();
        });
    });

    it("should deny access if a user tries to delete another user's profile",
    (done) => {
      chai.request(app)
      .delete(`/api/users/${sampleUser1.userId}`)
      .set({ 'x-access-token': userToken })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('You dont have privileges yet!');
        done();
      });
    });


    it('should allow a user to delete his/her profile', (done) => {
      chai.request(app)
      .delete(`/api/users/${sampleUser4.userId}`)
      .set({ 'x-access-token': dummyToken })
      .end((err, res) => {
        expect(res.status).to.equal(203);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('User deleted');
        done();
      });
    });

    it('should send "User not found" for invalid id', (done) => {
      chai.request(app)
      .delete('/api/users/250')
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('User not found');
        done();
      });
    });
  });


  describe('Fetching a user\'s documnets', () => {
  it("should return a user's document(s) given the user's id", (done) => {
    chai.request(app)
      .get('/api/users/1/documents')
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.be.greaterThan(0);
        done();
      });
  });

  it('should send "User not found" for invalid id', (done) => {
    chai.request(app)
    .get('/api/users/250/documents')
    .set({ 'x-access-token': adminToken })
    .end((err, res) => {
      expect(res.status).to.equal(404);
      expect(res.body).to.be.a('object');
      expect(res.body.message).to.eql('User not found');
      done();
    });
  });

  it('should fail if the provided id is out of range',
  (done) => {
    chai.request(app)
    .get('/api/users/3000000000/documents')
    .set({ 'x-access-token': adminToken })
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body).to.be.a('object');
      expect(res.body.message).to.eql(
        'value "3000000000" is out of range for type integer'
      );
      done();
    });
  });
  });
});
