import expect from 'expect';
import UserReducer from '../../reducers/UserReducer';
import { USER } from '../../constants/Constants';

describe('User Reducer', () => {
  it('should set user profile when action type passed is GET_USER_SUCCESS',
  () => {
  // arrange
    const initialState = {
      users: [],
      profile: { username: '' }
    };
    const loadedProfile = { username: 'PJ' };
    const action = { type: USER.GET_SUCCESS, profile: loadedProfile };

  // act
    const newState = UserReducer(initialState, action);

    expect(newState.profile).toEqual(loadedProfile);
  });
  it('should set users when action type passed is GET_ALL_USERS_SUCCESS',
  () => {
    // arrange
    const initialState = {
      users: [],
      profile: { username: '' }
    };
    const loadedUsers = [
      { id: '1', username: 'Jotaro' },
      { id: '2', username: 'Deku' },
      { id: '3', username: 'Aomine' }
    ];
    const action = { type: USER.GET_ALL_SUCCESS, users: loadedUsers };

    // act
    const newState = UserReducer(initialState, action);

    expect(newState.users).toEqual(loadedUsers);
  });
  it('should update user when action type passed is USER_UPDATE_SUCCESS',
  () => {
    // arrange
    const initialState = {
      users: [
        { id: '1', username: 'Jotaro' },
        { id: '2', username: 'Deku' },
        { id: '3', username: 'Aomine' }
      ],
      profile: { username: '' }
    };
    const action = {
      type: USER.UPDATE_SUCCESS,
      user: { id: '2', username: 'Killua' } };

    const expectedState = {
      users: [
        { id: '2', username: 'Killua' },
        { id: '1', username: 'Jotaro' },
        { id: '3', username: 'Aomine' }
      ],
      profile: { username: '' }
    };

    // act
    const newState = UserReducer(initialState, action);

    // assert
    expect(newState).toEqual(expectedState);
  });
  it('should not update user when action type passed is USER_UPDATE_FAILURE',
  () => {
    // arrange
    const initialState = {
      users: [
        { id: '1', username: 'Jotaro' },
        { id: '2', username: 'Deku' },
        { id: '3', username: 'Aomine' }
      ],
      profile: { username: '' }
    };
    const error = { message: 'Error' };
    const action = { type: USER.UPDATE_FAILURE, error };

    // act
    const newState = UserReducer(initialState, action);

    // assert
    expect(newState).toEqual(error);
  });
  it('should delete user when action type passed is USER_DELETE_SUCCESS',
  () => {
    // arrange
    const initialState = {
      users: [
        { id: '1', username: 'Jotaro' },
        { id: '2', username: 'Deku' },
        { id: '3', username: 'Aomine' }
      ],
      profile: { username: '' }
    };
    const action = {
      type: USER.DELETE_SUCCESS,
      user: { id: '2', username: 'Deku' } };

    const expectedState = {
      users: [
        { id: '1', username: 'Jotaro' },
        { id: '3', username: 'Aomine' }
      ],
      profile: { username: '' }
    };

    // act
    const newState = UserReducer(initialState, action);

    // assert
    expect(newState).toEqual(expectedState);
  });
  it('should set users when action type passed is USERS_SEARCH_SUCCESS', () => {
    // arrange
    const initialState = {
      users: [],
      profile: { username: '' }
    };

    const expectedState = {
      users: [{ username: 'Naruto' }],
      profile: { username: '' }
    };

    const action = {
      type: USER.SEARCH_SUCCESS,
      users: [{ username: 'Naruto' }] };

    // act
    const newState = UserReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });
  it('should return the state when not affected', () => {
    // arrange
    const currentState = {
      state: true,
    };
    const action = { type: 'NO_USER' };

    // act
    const newState = UserReducer(currentState, action);

    expect(newState).toEqual(currentState);
  });
});
