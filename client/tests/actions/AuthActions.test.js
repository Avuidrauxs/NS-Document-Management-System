import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AUTH } from '../../constants/Constants';
import * as AuthActions from '../../actions/AuthActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbW' +
'UiOiJhZG1pbiIsInJvbGVJZCI6MSwiaWF0IjoxNDk5MTIyMjk3LCJleHAiOjE0OTkxMzY2O' +
'Td9.MiqArbAiDB5LYIpO_MQDqbx_kh4XsQAUIK1-ZYQNYGI';

describe('Authentication actions ', () => {
  describe('User', () => {
    const expectedAction = {
      type: AUTH.SIGNIN_SUCCESS,
      user: { id: 1, roleId: 1, username: 'admin' }
    };
    const action = AuthActions.login(token, AUTH.SIGNIN_SUCCESS);
    expect(action).toEqual(expectedAction);
  });

  describe('Login Action,', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('fetches user token and logs the user in returning SIGNIN_SUCCESS',
    (done) => {
      moxios.stubRequest('/api/v1/users/login', {
        status: 200,
        response: {
          token,
          message: 'Successfully logged in'
        }
      });
      const expectedAction = [{
        type: AUTH.SIGNIN_SUCCESS,
        user: { id: 1, roleId: 1, username: 'admin' }
      }];
      const store = mockStore({ loggedIn: false, user: {} }, done);
      done();
      return store.dispatch(AuthActions.postLogin({
        username: 'admin',
        password: 'admin' }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });

    it('should dispath SIGNIN_FAILURE for bad requests', (done) => {
      moxios.stubRequest('/api/v1/users/login', {
        status: 400,
      });
      const expectedAction = [{
        type: AUTH.SIGNIN_FAILURE,
        error: { message: 'Error' }
      }];
      const store = mockStore({ loggedIn: false, user: {} }, done);
      done();
      return store.dispatch(AuthActions.postLogin({
        username: 'ad',
        password: 'ad' }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
    it('should show Invalid password or username in returning SIGNIN_FAILURE',
    (done) => {
      moxios.stubRequest('/api/v1/users/login', {
        status: 401,
        response: {
          message: 'Invalid password or username'
        }
      });
      const expectedAction = [{
        type: AUTH.SIGNIN_FAILURE,
        error: { message: 'Error' }
      }];
      const store = mockStore({ loggedIn: false, user: {} }, done);
      done();
      return store.dispatch(AuthActions.postLogin({
        username: 'ad',
        password: 'ad' }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });

  describe('Sign Up new user', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it(' should register and log in a user dispatching SIGNUP_SUCCESS',
    (done) => {
      moxios.stubRequest('/api/v1/users', {
        status: 200,
        response: {
          token,
          message: 'Login successful'
        }
      });

      const expectedActions = [{ type: AUTH.SIGNUP_SUCCESS,
        user: { id: 1, roleId: 1, username: 'admin' }
      }
      ];
      const store = mockStore({ loggedIn: false, user: {} });
      done();
      return store.dispatch(AuthActions.postSignUp({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it(`should not register a user with wrong information dispatching
      LOGIN_FAILURE`, (done) => {
      moxios.stubRequest('/api/v1/users', {
        status: 400,
      });

      const expectedActions = [{ type: AUTH.SIGNUP_FAILURE,
        error: { message: 'Error' } }];
      const store = mockStore({ loggedIn: false, user: {} });
      done();
      return store.dispatch(AuthActions.postSignUp({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Logout action', () => {
    it('logs a user out and dispatches SIGNOUT_SUCCESS', () => {
      const expectedAction = { type: AUTH.SIGNOUT_SUCCESS };
      const store = mockStore();
      expect(store.dispatch(AuthActions.logout())).toEqual(expectedAction);
    });
  });
});
