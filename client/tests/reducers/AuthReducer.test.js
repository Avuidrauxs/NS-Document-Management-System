import expect from 'expect';
import AuthReducer from '../../reducers/AuthReducer';
import { AUTH } from '../../constants/Constants';
import initialState from '../../utilities/initialState';

describe('Authentication Reducer', () => {
  it('should set user when action type passed is SIGNIN_SUCCESS', () => {
    // arrange
    const user = { id: 1, username: 'admin', roleId: 1 };
    const action = { type: AUTH.SIGNIN_SUCCESS, user };

    const expectedState = {
      loggedIn: true, user: { id: 1, username: 'admin', roleId: 1 }
    };

    // act
    const newState = AuthReducer(initialState.auth, action);

    expect(newState).toEqual(expectedState);
  });
  it('should not set user when action type passed is SIGNIN_FAILURE', () => {
    // arrange
    const error = {};
    const action = { type: AUTH.SIGNIN_FAILURE, error };

    const expectedState = {};

    // act
    const newState = AuthReducer(initialState.auth, action);

    expect(newState).toEqual(expectedState);
  });
  it('should not register user when action type passed is SIGNUP_FAILURE',
  () => {
    // arrange
    const error = {
      message: 'Error: Error: Request failed with status code 400' };
    const action = { type: AUTH.SIGNUP_FAILURE, error };

    const expectedState = {
      message: 'Error: Error: Request failed with status code 400' };

    // act
    const newState = AuthReducer(initialState.auth, action);

    expect(newState).toEqual(expectedState);
  });
  it('should register user when action type passed is SIGNUP_SUCCESS', () => {
    // arrange
    const user = { id: 1, username: 'admin', roleId: 1 };
    const action = { type: AUTH.SIGNUP_SUCCESS, user };

    const expectedState = {
      loggedIn: true, user: { id: 1, username: 'admin', roleId: 1 }
    };

    // act
    const newState = AuthReducer(initialState.auth, action);

    expect(newState).toEqual(expectedState);
  });
  it('should set initial state when action type passed is SIGNOUT_SUCCESS',
  () => {
    // arrange
    const currentState = {
      loggedIn: true,
      user: { id: 1, username: 'admin', roleId: 1 },
    };
    const action = { type: AUTH.SIGNOUT_SUCCESS };

    const expectedState = { loggedIn: false, user: {} };

    // act
    const newState = AuthReducer(currentState, action);

    expect(newState).toEqual(expectedState);
  });
  it('should return the state when not affected', () => {
    // arrange
    const currentState = {
      state: true,
    };
    const action = { type: 'DELETE_DOCUMENT_SUCCESS' };

    // act
    const newState = AuthReducer(currentState, action);

    expect(newState).toEqual(currentState);
  });
});
