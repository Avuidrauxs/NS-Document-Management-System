import chai from 'chai';
import models from '../../models/';
import data from '../mockData';

const expect = chai.expect;

const { roleOne } = data;

let dummyId;

describe('Role Model', () => {
  describe('Create Role', () => {
    it('should create a role', (done) => {
      models.Role.create(roleOne)
        .then((role) => {
          expect(role.dataValues.description).to.equal(roleOne.description);
          dummyId = role.dataValues.id;
          done();
        });
    });

    // it('should fail when role description already exist', (done) => {
    //   models.Role.create({ description: 'editor' })
    //     .then()
    //     .catch((error) => {
    //       expect(error.errors[0].message).to.equal('Role description already exist');
    //       expect(error.errors[0].type).to.equal('unique violation');
    //       done();
    //     });
    // });

    it('should fail if description was not provided', (done) => {
      models.Role.create({ description: '' })
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Set a role description');
          done();
        });
    });

    it('should fail when the description of a role is null', (done) => {
      models.Role.create({ description: null })
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('description cannot be null');
          expect(error.errors[0].type).to.equal('notNull Violation');
          expect(error.errors[0].value).to.equal(null);
          done();
        });
    });
  });


  describe('Update Role', () => {
    it('should update a role based on id', (done) => {
      models.Role.findById(dummyId)
          .then((role) => {
            role.update({ description: 'Super_Admin' })
              .then((updatedRole) => {
                expect(updatedRole.dataValues.id).to.equal(dummyId);
                expect(role.dataValues.description).to.equal('Super_Admin');
                done();
              });
          });
    });
  });

  describe('Delete role', () => {
    it('should delete a role based on id', (done) => {
      models.Role.destroy({ where: { id: dummyId } })
          .then(() => {
            models.Role.findById(dummyId)
              .then((res) => {
                expect(res).to.equal(null);
                done();
              });
          });
    });
  });
});
