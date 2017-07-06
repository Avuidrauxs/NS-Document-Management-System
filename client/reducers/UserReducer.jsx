import { USER } from '../constants/Constants';
import initialState from '../utilities/initialState';

/**
 * Users Reducer
 * @param {object} [state=initialState.auth] [state object parameter]
 * @param {object} action    object parameter contains action type and payload
 * @returns {object}  returns a state object
 */
const UserReducer = (state = initialState.users, action) => {
  let newState;
  switch (action.type) {
  case USER.GET_ALL_SUCCESS:
    return Object.assign({}, state, { users: action.users });

  case USER.GET_ALL_FAILURE:
  case USER.SEARCH_FAILURE:
  case USER.UPDATE_FAILURE:
  case USER.GET_FAILURE:
    return action.error;

  case USER.UPDATE_SUCCESS:
    newState = [action.user,
      ...state.users.filter(item => item.id !== action.user.id)];
    return Object.assign({}, state, { users: newState });

  case USER.SEARCH_SUCCESS:
    return Object.assign({}, state, { users: action.users });

  case USER.GET_SUCCESS:
    return Object.assign({}, state, { profile: action.profile });


  default:
    return state;
  }
};

export default UserReducer;
