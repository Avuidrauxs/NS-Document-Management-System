import chai from 'chai';
import models from '../../models/';
import data from '../mockData';

const expect = chai.expect;

const { sampleUser1 } = data;

let dummyId;


describe('User Model', () => {
  describe('Create a new User', () => {
    it('should create a user', (done) => {
      models.User.create(sampleUser1)
      .then((user) => {
        expect(user.dataValues.title).to.equal(sampleUser1.title);
        dummyId = user.dataValues.id;
        done();
      });
    });

  // it('should fail if username already exist', (done) => {
  //   models.User.create(sampleUser1)
  //     .then()
  //     .catch((error) => {
  //       expect(error.errors[0].message).to.equal('Username already exist');
  //       expect(error.errors[0].type).to.equal('unique violation');
  //       done();
  //     });
  // });

    it('should fail if username was not provided', (done) => {
      sampleUser1.username = '';
      models.User.create(sampleUser1)
      .then()
      .catch((error) => {
        expect(error.errors[0].message).to.equal('Please enter username');
        done();
      });
    });

    it('should fail if username is invalid', (done) => {
      sampleUser1.username = 'po   op';
      models.User.create(sampleUser1)
      .then()
      .catch((error) => {
        expect(error.errors[0].message).to.equal('Use a valid username');
        done();
      });
    });

    it('should fail if email already exist', (done) => {
      sampleUser1.username = 'Poop';
      models.User.create(sampleUser1)
    .then()
    .catch((error) => {
      expect(error.errors[0].message).to.equal('Email already exist');
      expect(error.errors[0].type).to.equal('unique violation');
      done();
    });
    });

    it('should fail if email is invalid', (done) => {
      sampleUser1.username = 'Poop';
      sampleUser1.email = 'I am an email';
      models.User.create(sampleUser1)
    .then()
    .catch((error) => {
      expect(error.errors[0].message).to.equal('Please enter a valid email');
      done();
    });
    });


    it('should fail if password is null', (done) => {
      sampleUser1.username = 'Poop';
      sampleUser1.email = 'I am an email';
      sampleUser1.password = null;
      models.User.create(sampleUser1)
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
