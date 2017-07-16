import { USER } from '../../../constants/Constants';
import * as UserActions from '../../../actions/UserActions';

describe('User Actions', () => {
  it('should get user information', () => {
    const users = {
      users: {},
      metaData: {},
      offset: 0,
      query: ''
    };
    const expectedAction = {
      type: USER.GET_ALL_SUCCESS,
      users: {},
      metaData: {},
      offset: 0,
      query: ''
    };
    expect(UserActions.fetchAllUsersSuccess(users)).toEqual(expectedAction);
  });
  it('should send error if unable to get user information', () => {
    const error = {
      error: { message: 'Error: err' }
    };
    const expectedAction = {
      type: USER.GET_ALL_FAILURE,
      error
    };
    expect(UserActions.fetchAllUsersFailure(error)).toEqual(expectedAction);
  });
  it('should send error if unable to update user information', () => {
    const error = {
      error: { message: 'Error: err' }
    };
    const expectedAction = {
      type: USER.UPDATE_FAILURE,
      error
    };
    expect(UserActions.updateUserFailure(error)).toEqual(expectedAction);
  });
  it('should send error if unable to delete user information', () => {
    const error = {
      message: 'Error: [object Object]'
    };
    const expectedAction = {
      type: USER.DELETE_FAILURE,
      error
    };
    expect(UserActions.deleteUserFailure(error)).toEqual(expectedAction);
  });
  it('should successfully delete user information', () => {
    const user = {
      id: 1
    };
    const expectedAction = {
      type: USER.DELETE_SUCCESS,
      user
    };
    expect(UserActions.deleteUserSuccess(user)).toEqual(expectedAction);
  });
});
