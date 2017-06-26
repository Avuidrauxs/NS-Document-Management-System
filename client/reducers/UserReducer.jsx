import * as CONSTANTS from '../constants/Constants';
import initialState from '../utilities/initialState';

const UserReducer = (state = initialState.users, action) => {
  // let newState;
  switch (action.type) {
  case CONSTANTS.USER.GET_ALL_SUCCESS:
    return Object.assign({}, state, { users: action.users });
  case CONSTANTS.USER.GET_ALL_FAILURE:
    return state;
  default:
    return state;
  }
};

export default UserReducer;
