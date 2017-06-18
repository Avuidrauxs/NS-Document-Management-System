import chai from 'chai';
import models from '../../models/';
import data from '../mockData';

const expect = chai.expect;

const { fakeDocument } = data;

let dummyId;

describe('Documents Model', () => {
  describe('Create Document', () => {
    it('should create a document', (done) => {
      models.Document.create(fakeDocument)
        .then((document) => {
          expect(document.dataValues.title).to.equal(fakeDocument.title);
          expect(document.dataValues.body).to.equal(fakeDocument.body);
          dummyId = document.dataValues.id;
          done();
        });
    });

    // it('should fail if title already exist', (done) => {
    //   models.Document.create(fakeDocument)
    //     .then()
    //     .catch((error) => {
    //       expect(error.errors[0].message).to.equal('Title already exist');
    //       expect(error.errors[0].type).to.equal('unique violation');
    //       done();
    //     });
    // });

    it('should fail if title was not provided', (done) => {
      fakeDocument.title = '';
      models.Document.create(fakeDocument)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Title cant be empty');
          done();
        });
    });

    it('should fail if body was not provided', (done) => {
      fakeDocument.title = 'sample title';
      fakeDocument.body = '';
      models.Document.create(fakeDocument)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Body can\'t be empty');
          done();
        });
    });

    it('should fail if access is not public, private or role', (done) => {
      fakeDocument.body = 'perfect body';
      fakeDocument.access = 'wrong_hole';
      models.Document.create(fakeDocument)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Use a valid privilege');
          done();
        });
    });
  });


  describe('Update Document', () => {
    it('should update a document based on id', (done) => {
      models.Document.findById(dummyId)
        .then((document) => {
          document.update({ title: 'Chinazor' })
            .then((updatedDocument) => {
              expect(updatedDocument.dataValues.id).to.equal(dummyId);
              expect(document.dataValues.title).to.equal('Chinazor');
              done();
            });
        });
    });
  });

  describe('Delete Document', () => {
    it('should delete a document based on id', (done) => {
      models.Document.destroy({ where: { id: dummyId } })
        .then(() => {
          models.Document.findById(dummyId)
            .then((res) => {
              expect(res).to.equal(null);
              done();
            });
        });
    });
  });
});
