import chai from 'chai';
import http from 'chai-http';
import app from '../../app';
import models from '../../models/';
import data from '../mockData';

const expect = chai.expect;
chai.use(http);

const { author, publisher, admin, user, roleOne,
  privateDoc, roleDoc } = data;

let userToken, adminToken, authorToken, dummyId;

describe('Documents', () => {
    before((done) => {
      models.Role.create(roleOne)
      .then((role) => {
        author.roleId = role.id;
        publisher.roleId = role.id;
        models.User.bulkCreate([
          author, publisher
        ])
        .then(() => {
          chai.request(app)
            .post('/api/users/login')
            .send({ username: author.username, password: 'banana' })
            .end((err, res) => {
              authorToken = res.body.token;
              done();
            });
        });
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
    before((done) => {
      chai.request(app)
        .post('/api/users/login')
        .send(admin)
        .end((err, res) => {
          adminToken = res.body.token;
          done();
        });
    });
    after((done) => {
      models.Role.destroy({
        where: { id: { $notIn: [1, 2] } }
      })
      .then(() => models.User.destroy({
        where: { id: { $notIn: [1, 2] } }
      }))
        .then(() => done());
    });


  describe('Creating a new document ', () => {
    it('should actually create a new document', (done) => {
      chai.request(app)
      .post('/api/documents')
      .send(privateDoc)
      .set({ 'x-access-token': userToken })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.keys(
          ['id', 'title', 'body', 'access', 'createdAt', 'message', 'authorId', 'User']
        );
        expect(res.body.authorId).to.equal(2);
        expect(res.body.title).to.equal(privateDoc.title);
        expect(res.body.message).to.eql(`"${privateDoc.title}" created`);
        privateDoc.docId = res.body.id;
        done();
      });
    });

    // it('should fail if document title already exists', (done) => {
    //   privateDoc.title = 'Non-Sucking Document Management System';
    //   chai.request(app)
    //   .post('/documents')
    //   .send(privateDoc)
    //   .set({ 'x-access-token': userToken })
    //   .end((err, res) => {
    //     expect(res.status).to.equal(400);
    //     expect(res.body.message).to.eql('Title already exist');
    //     done();
    //   });
    // });

    it('can create a new document and store the correct author', (done) => {
      chai.request(app)
      .post('/api/documents')
      .send(roleDoc)
      .set({ 'x-access-token': authorToken })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.keys(
          ['id', 'title', 'body', 'access', 'createdAt', 'message', 'authorId', 'User']
        );
        expect(res.body.User.roleId).to.equal(author.roleId);
        expect(res.body.message).to.eql(`"${roleDoc.title}" created`);
        roleDoc.docId = res.body.id;
        done();
      });
    });
  });


  describe('Fetching all documents', () => {
    it('should return all documents if the user is an admin', (done) => {
      chai.request(app)
        .get('/api/documents')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.rows).to.be.a('array');
          expect(res.body.rows.length).to.equal(5);
          done();
        });
    });

    it('should return only public documents for an anonymous user', (done) => {
      chai.request(app)
      .get('/api/documents')
      .end((err, res) => {
        let all = true;
        res.body.rows.forEach((document) => {
          if (document.access !== 'public') {
            all = false;
          }
        });
        expect(res.status).to.equal(200);
        expect(res.body.rows).to.be.a('array');
        expect(res.body.rows.length).to.equal(1);
        expect(all).to.be.true;
        done();
      });
    });

    it('should return correct documents(s) for a query', (done) => {
      chai.request(app)
        .get('/api/documents?q=Non')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.rows).to.be.a('array');
          expect(res.body.rows[0].title).to.eql('Non-Sucking Document Management System');
          done();
        });
    });

    it('can limit the number of documents returned', (done) => {
      chai.request(app)
        .get('/api/documents?limit=2')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.rows).to.be.a('array');
          expect(res.body.rows.length).to.equal(2);
          dummyId = res.body.rows[1].id;
          done();
        });
    });

    it('can offset the starting position of returned documents', (done) => {
      chai.request(app)
        .get('/api/documents?offset=1')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.rows).to.be.a('array');
          expect(res.body.rows[0].id).to.eql(dummyId);
          done();
        });
    });
  });


    describe('Fetching documents based on user id', () => {
      let publisherToken;
      before((done) => {
        chai.request(app)
          .post('/api/users/login')
          .send({ username: publisher.username, password: 'banana' })
          .end((err, res) => {
            publisherToken = res.body.token;
            done();
          });
      });

      it('should return a particular document given an id', (done) => {
        chai.request(app)
          .get('/api/documents/2')
          .set({ 'x-access-token': userToken })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.keys(['id', 'title', 'body', 'access',
              'authorId', 'createdAt', 'updatedAt', 'User']);
            expect(res.body.title).to.equal('Taken Epic Liam Neeson Monologue');
            done();
          });
      });

      it('should allow an anonymous user to view a public document', (done) => {
        chai.request(app)
        .get('/api/documents/2')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body.title).to.equal('Taken Epic Liam Neeson Monologue');
          done();
        });
      });

      it("should not allow a user to access another user's private document",
      (done) => {
        chai.request(app)
        .get(`/api/documents/${privateDoc.docId}`)
        .set({ 'x-access-token': authorToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('Access denied');
          done();
        });
      });

      it('should allow a user to access a document with the same role',
      (done) => {
        chai.request(app)
        .get(`/api/documents/${roleDoc.docId}`)
        .set({ 'x-access-token': publisherToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.keys(['id', 'title', 'body', 'access',
            'authorId', 'createdAt', 'updatedAt', 'User']);
          expect(res.body.User.roleId).to.equal(publisher.roleId);
          done();
        });
      });

      it('should send "Document not found" for an invalid id', (done) => {
        chai.request(app)
        .get('/api/documents/250')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('Document not found');
          done();
        });
      });

      it('should fail if the provided id is out of range',
      (done) => {
        chai.request(app)
        .get('/api/documents/3000000000')
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


  describe('Updating a document', () => {
    it('should allow a user to update his/her document', (done) => {
      chai.request(app)
      .put('/api/documents/2')
      .set({ 'x-access-token': userToken })
      .send({ title: 'No title now' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.title).to.eql('No title now');
        done();
      });
    });

    it("should deny access if a user tries to update another user's document",
    (done) => {
      chai.request(app)
      .put('/api/documents/2')
      .set({ 'x-access-token': authorToken })
      .send({ title: 'False True' })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('You dont have privileges');
        done();
      });
    });

    // it('should not allow a user to use an existing document title',
    // (done) => {
    //   chai.request(app)
    //   .put(`/documents/${privateDoc.docId}`)
    //   .set({ 'x-access-token': userToken })
    //   .send({ title: 'No title now' })
    //   .end((err, res) => {
    //     expect(res.status).to.equal(400);
    //     expect(res.body).to.be.a('object');
    //     expect(res.body.message).to.eql('Title already exist');
    //     done();
    //   });
    // });
  });


  describe('Deleting a document', () => {
    it("should deny access if a user tries to delete another user's document",
    (done) => {
      chai.request(app)
      .delete(`/api/documents/${roleDoc.docId}`)
      .set({ 'x-access-token': userToken })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('You dont have privileges');
        done();
      });
    });

    it('should allow a user to delete his/her document', (done) => {
      chai.request(app)
      .delete(`/api/documents/${privateDoc.docId}`)
      .set({ 'x-access-token': userToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Document deleted');
        done();
      });
    });

    it('should send "Document not found" given an invalid id', (done) => {
      chai.request(app)
      .delete('/api/documents/250')
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Document not found');
        done();
      });
    });

    it('should fail if the provided id is out of range',
    (done) => {
      chai.request(app)
      .delete('/api/documents/3000000000')
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
