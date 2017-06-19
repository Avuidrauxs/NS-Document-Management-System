import chai from 'chai';
import http from 'chai-http';
import app from '../../app';
import models from '../../models/';
import data from '../mockData';

const expect = chai.expect;
chai.use(http);

const { admin, user, roleOne } = data;
let userToken, adminToken;


describe('Role', () => {
  before((done) => {
    chai.request(app)
      .post('/users/login')
      .send(admin)
      .end((err, res) => {
        adminToken = res.body.token;
        done();
      });
  });
  before((done) => {
    chai.request(app)
      .post('/users/login')
      .send(user)
      .end((err, res) => {
        userToken = res.body.token;
        done();
      });
  });


  describe('Adding a role', () => {
    it('should allow an admin to create a new role', (done) => {
      chai.request(app)
      .post('/roles')
      .set({ 'x-access-token': adminToken })
      .send(roleOne)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.keys(
          ['id', 'description', 'message']
        );
        expect(res.body.description).to.eql('editor');
        expect(res.body.message).to.eql('Role inserted');
        roleOne.roleId = res.body.id;
        done();
      });
    });

    // it('should fail if role alreay exists', (done) => {
    //   chai.request(app)
    //   .post('/roles')
    //   .set({ 'x-access-token': adminToken })
    //   .send(roleOne)
    //   .end((err, res) => {
    //     expect(res.status).to.equal(400);
    //     expect(res.body.message).to.eql('Role already exist');
    //     done();
    //   });
    // });

    it('should deny access if user is not admin', (done) => {
      chai.request(app)
      .post('/roles')
      .set({ 'x-access-token': userToken })
      .send({ description: 'user' })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('You dont have privileges');
        done();
      });
    });
  });

  describe('Fetching all roles', () => {
    it('should return all roles', (done) => {
      chai.request(app)
        .get('/roles')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.be.greaterThan(0);
          done();
        });
    });
  });


  describe('Fetching a role based on id', () => {
    it('should return a role given an id', (done) => {
      chai.request(app)
        .get('/roles/2')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.eql({
            id: 2,
            description: 'user'
          });
          done();
        });
    });

    it('should send "Role not found" for invalid id', (done) => {
      chai.request(app)
      .get('/roles/250')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Role not found');
        done();
      });
    });

    it('should fail if the provided id is out of range',
    (done) => {
      chai.request(app)
      .get('/roles/3000000000')
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


  describe('Updating a role', () => {
    it('should allow an admin to edit a role', (done) => {
      chai.request(app)
      .put(`/roles/${roleOne.roleId}`)
      .set({ 'x-access-token': adminToken })
      .send({ description: 'editor' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.description).to.eql('editor');
        done();
      });
    });

    it('should deny access if user is not an admin', (done) => {
      chai.request(app)
      .put(`/roles/${roleOne.roleId}`)
      .set({ 'x-access-token': userToken })
      .send({ description: 'Super Admin' })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('You dont have privileges');
        done();
      });
    });

    // it('should not allow a user to use an existing role name',
    // (done) => {
    //   chai.request(app)
    //   .put('/roles/2')
    //   .set({ 'x-access-token': adminToken })
    //   .send({ description: 'admin' })
    //   .end((err, res) => {
    //     expect(res.status).to.equal(400);
    //     expect(res.body).to.be.a('object');
    //     expect(res.body.message).to.eql('Role already exist');
    //     done();
    //   });
    // });

    it('should send "Role not found" for invalid id', (done) => {
      chai.request(app)
      .put('/roles/250')
      .set({ 'x-access-token': adminToken })
      .send({ description: 'Gimli-Team' })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Non existent role');
        done();
      });
    });

    it('should fail if the provided id is out of range',
    (done) => {
      chai.request(app)
      .put('/roles/3000000000')
      .set({ 'x-access-token': adminToken })
      .send({ description: 'Gimli-Team' })
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


    describe('Deleting a role', () => {
      it('should allow admin to delete a role', (done) => {
        chai.request(app)
        .delete(`/roles/${roleOne.roleId}`)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(203);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('Role deleted');
          done();
        });
      });

      it('should send "Role not found" for invalid id', (done) => {
        chai.request(app)
        .delete('/roles/250')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('Role not found');
          done();
        });
      });

      it('should fail if the provided id is out of range',
      (done) => {
        chai.request(app)
        .delete('/roles/3000000000')
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
