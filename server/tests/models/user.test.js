import chai from 'chai';
import models from '../../models/';
import data from '../mockData';

const expect = chai.expect;

const { fakeJojo } = data;

let dummyId;


describe('User Model', () => {
  describe('Create a new User', () => {
    it('should create a user', (done) => {
      models.User.create(fakeJojo)
      .then((user) => {
        expect(user.dataValues.title).to.equal(fakeJojo.title);
        dummyId = user.dataValues.id;
        done();
      });
    });

  // it('should fail if username already exist', (done) => {
  //   models.User.create(fakeJojo)
  //     .then()
  //     .catch((error) => {
  //       expect(error.errors[0].message).to.equal('Username already exist');
  //       expect(error.errors[0].type).to.equal('unique violation');
  //       done();
  //     });
  // });

    it('should fail if username was not provided', (done) => {
      fakeJojo.username = '';
      models.User.create(fakeJojo)
      .then()
      .catch((error) => {
        expect(error.errors[0].message).to.equal('Please enter username');
        done();
      });
    });

    it('should fail if username is invalid', (done) => {
      fakeJojo.username = 'po   op';
      models.User.create(fakeJojo)
      .then()
      .catch((error) => {
        expect(error.errors[0].message).to.equal('Use a valid username');
        done();
      });
    });

    it('should fail if email already exist', (done) => {
      fakeJojo.username = 'Poop';
      models.User.create(fakeJojo)
    .then()
    .catch((error) => {
      expect(error.errors[0].message).to.equal('Email already exist');
      expect(error.errors[0].type).to.equal('unique violation');
      done();
    });
    });

    it('should fail if email is invalid', (done) => {
      fakeJojo.username = 'Poop';
      fakeJojo.email = 'I am an email';
      models.User.create(fakeJojo)
    .then()
    .catch((error) => {
      expect(error.errors[0].message).to.equal('Please enter a valid email');
      done();
    });
    });


    it('should fail if password is null', (done) => {
      fakeJojo.username = 'Poop';
      fakeJojo.email = 'I am an email';
      fakeJojo.password = null;
      models.User.create(fakeJojo)
    .then()
    .catch((error) => {
      expect(error.errors[0].message).to.equal('password cannot be null');
      done();
    });
    });
  });

  describe('Update User', () => {
    it('should update a user', (done) => {
      models.User.findById(dummyId)
      .then((user) => {
        user.update({ username: 'Scofeild' })
          .then((updatedUser) => {
            expect(updatedUser.dataValues.id).to.equal(dummyId);
            expect(user.dataValues.username).to.equal('Scofeild');
            done();
          });
      });
    });
  });

  describe('Delete User', () => {
    it('should delete a user', (done) => {
      models.User.destroy({ where: { id: dummyId } })
      .then(() => {
        models.User.findById(dummyId)
          .then((res) => {
            expect(res).to.equal(null);
            done();
          });
      });
    });
  });
});
