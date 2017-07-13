import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { USER } from '../../constants/Constants';
import * as UserActions from '../../actions/UserActions';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Fetch Users', () => {
    it('should fetch users and dispatche GET_ALL_USERS_SUCCESS', (done) => {
      moxios.stubRequest('/api/v1/users?limit=9&offset=0', {
        status: 200,
        response: {
          rows: [{ username: 'PepperSoup' }],
          metaData: {}
        }
      });

      const expectedActions = [{ type: USER.GET_ALL_SUCCESS,
        users: [{ username: 'PepperSoup' }],
        metaData: {},
        offset: 0,
        query: '' }];
      const store = mockStore();
      done();
      return store.dispatch(UserActions.fetchAllUsers())
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
    });

    it('should not fetch users and dispatche GET_ALL_USERS_FAILURE', (done) => {
      moxios.stubRequest('/api/v1/users?limit=9&offset=0', {
        status: 400,
      });

      const expectedActions = [{ type: USER.GET_ALL_FAILURE }];
      const store = mockStore();
      done();
      return store.dispatch(UserActions.fetchAllUsers())
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
    });
  });

  describe('SearchUsers', () => {
    it('searches for users and dispatches USER_SEARCH_SUCCESS', (done) => {
      moxios.stubRequest('/api/v1/search/users?q=tony&limit=9&offset=0', {
        status: 200,
        response: {
          rows: [{ username: 'Neo' }],
          metaData: {}
        }
      });

      const expectedActions = [{ type:
        USER.GET_SUCCESS,
        searchResult: [{ username: 'Neo' }],
        metaData: {},
        offset: 0,
        query: 'Neo' }
      ];
      const store = mockStore();
      done();
      return store.dispatch(UserActions.searchUsers('Neo'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });


  describe('Update a user details', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it("updates a user's detail dispatching USER_UPDATE_SUCCESS", (done) => {
      moxios.stubRequest('/api/v1/users/2', {
        status: 200,
        response: {}
      });
      const expectedAction = [{ type: USER.UPDATE_SUCCESS, user: {} }];

      const store = mockStore({});
      done();
      return store.dispatch(UserActions.updateUser({ id: 2, username: 'PepperSoup' }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });

  describe('Get User details', () => {
    it("fetches a user's profile and dispatches GET_USER_SUCCESS", (done) => {
      moxios.stubRequest('/users/4', {
        status: 200,
        response: { username: 'Neo' }
      });

      const expectedActions = [{ type: 'GET_PROFILE_SUCCESS',
        profile: { username: 'Neo' } }];
      const store = mockStore();
      done();
      return store.dispatch(UserActions.getUserDetails(4))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Deletes a User by id', () => {
    it("deletes a user's profile and dispatches DELETE_USER_SUCCESS", (done) => {
      moxios.stubRequest('/api/v1/users/3', {
        status: 200
      });

      const expectedActions = [{ type: USER.DELETE_SUCCESS }
      ];
      const store = mockStore();
      done();
      return store.dispatch(UserActions.deleteUser(3))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
