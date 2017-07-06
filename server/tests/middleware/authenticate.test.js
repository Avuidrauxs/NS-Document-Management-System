import chai from 'chai';
import mockHttp from 'node-mocks-http';
import http from 'chai-http';
import event from 'events';
import app from '../../app';
import Authenticate from '../../middleware/authenticate';
import data from '../mockData';

const expect = chai.expect;
const responseEvent = () => mockHttp
.createResponse({ eventEmitter: event.EventEmitter });
chai.use(http);

const { user } = data;
let userToken;


describe('Authenticate middleware', () => {
  before((done) => {
    chai.request(app)
      .post('/api/users/login')
      .send(user)
      .end((err, res) => {
        userToken = res.body.token;
        done();
      });
  });

  describe('Check User', () => {
    it('should grant access if token is valid', (done) => {
      const response = responseEvent();
      response.header = {};
      const request = mockHttp.createRequest({
        method: 'GET',
        url: '/api/users',
        headers: { 'x-access-token': userToken }
      });

      const callback = () => {
        expect(response.header.decoded.id).to.equal(2);
        expect(response.header.decoded.username).to.equal('PepperSoup');
        done();
      };
      Authenticate.checkUser(request, response, callback);

      expect(response._getData().message).to.equal(undefined);
    });


    it('should deny access if no token was provided', (done) => {
      const response = responseEvent();
      response.header = {};
      const request = mockHttp.createRequest({
        method: 'GET',
        url: '/api/users'
      });

      const callback = () => {};
      Authenticate.checkUser(request, response, callback);

      expect(response._getData().message).to.equal('No token provided');
      done();
    });


    it('should deny access if token is invalid', (done) => {
      const response = responseEvent();
      const request = mockHttp.createRequest({
        method: 'GET',
        url: '/api/users',
        headers: { 'x-access-token': 'imabananaanananana' }
      });

      const callback = () => {};
      Authenticate.checkUser(request, response, callback);

      response.on('end', () => {
        expect(response._getData().message).to.equal('Authentication failure');
        done();
      });
    });
  });


  describe('Allow Admin', () => {
    it('should grant access to an admin', (done) => {
      const response = responseEvent();
      response.header = { decoded: { roleId: 1 } };
      const request = mockHttp.createRequest({
        method: 'GET',
        url: '/api/users'
      });

      const callback = () => {
        expect(response.header.decoded.roleId).to.equal(1);
        done();
      };
      Authenticate.allowAdmin(request, response, callback);

      expect(response._getData().message).to.equal(undefined);
    });


    it('should deny access if the user is not an admin', (done) => {
      const response = responseEvent();
      response.header = { decoded: { roleId: 2 } };
      const request = mockHttp.createRequest({
        method: 'GET',
        url: '/api/users'
      });

      const callback = () => {};
      Authenticate.allowAdmin(request, response, callback);

      expect(response._getData().message).to.equal('You dont have privileges');
      done();
    });


    describe('Allow User', () => {
      it('should grant access to an admin', (done) => {
        const response = responseEvent();
        response.header = { decoded: { roleId: 1 } };
        const request = mockHttp.createRequest({
          method: 'GET',
          url: '/api/users',
          params: { id: 2 }
        });

        const callback = () => {
          expect(response.header.decoded.roleId).to.equal(1);
          done();
        };
        Authenticate.allowUser(request, response, callback);

        expect(response._getData().message).to.equal(undefined);
      });

      it('should grant access to the profile owner', (done) => {
        const response = responseEvent();
        response.header = { decoded: { roleId: 2, id: 2 } };
        const request = mockHttp.createRequest({
          method: 'GET',
          url: '/api/users',
          params: { id: 2 }
        });

        const callback = () => {
          expect(response.header.decoded.id).to.equal(2);
          done();
        };
        Authenticate.allowUser(request, response, callback);

        expect(response._getData().message).to.equal(undefined);
      });

      it('should deny access if the user is not an admin or profile owner', (done) => {
        const response = responseEvent();
        response.header = { decoded: { roleId: 2 } };
        const request = mockHttp.createRequest({
          method: 'GET',
          url: '/api/users',
          params: { id: 2 }
        });

        const callback = () => {};
        Authenticate.allowUser(request, response, callback);

        response.on('end', () => {
          expect(response._getData().message).to.equal('You dont have privileges yet!');
          done();
        });
      });
    });
  });


  describe('Allow Author', () => {
    it('should grant access to the author', (done) => {
      const response = responseEvent();
      response.header = { decoded: { roleId: 2, id: 2 } };
      const request = mockHttp.createRequest({
        method: 'DELETE',
        url: '/documents',
        params: { id: 2 }
      });

      const callback = () => {
        expect(response.header.decoded.id).to.equal(2);
        done();
      };
      Authenticate.allowAuthor(request, response, callback);

      expect(response._getData().message).to.equal(undefined);
    });

    it('should deny access if the user is not the document author', (done) => {
      const response = responseEvent();
      response.header = { decoded: { roleId: 1, id: 1 } };
      const request = mockHttp.createRequest({
        method: 'DELETE',
        url: '/documents',
        params: { id: 2 }
      });

      const callback = () => {};
      Authenticate.allowAuthor(request, response, callback);

      response.on('end', () => {
        expect(response._getData().message).to.equal('You dont have privileges');
        done();
      });
    });
  });
});
