import * as CONSTANTS from '../constants/Constants';
import initialState from '../utilities/initialState';

const UserReducer = (state = initialState.users, action) => {
  let newState;
  switch (action.type) {
  case CONSTANTS.USER.GET_ALL_SUCCESS:
    return Object.assign({}, state, { users: action.users });

  case CONSTANTS.USER.GET_ALL_FAILURE:
  case CONSTANTS.USER.SEARCH_FAILURE:
  case CONSTANTS.USER.UPDATE_FAILURE:
    return action.error;

  case CONSTANTS.USER.UPDATE_SUCCESS:
    newState = [action.user,
      ...state.users.filter(item => item.id !== action.user.id)];
    return Object.assign({}, state, { users: newState });

  case CONSTANTS.USER.SEARCH_SUCCESS:
    return Object.assign({}, state, { users: action.user });

  default:
    return state;
  }
};

export default UserReducer;
