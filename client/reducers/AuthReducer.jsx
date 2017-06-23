import * as CONSTANTS from '../constants/Constants';
import initialState from '../utilities/initialState';

const AuthReducer = (state = initialState.auth, action) => {
  switch (action.type) {

  case CONSTANTS.AUTH.SIGNIN_SUCCESS:
  case CONSTANTS.AUTH.SIGNUP_SUCCESS:
    return {
      loggedIn: true,
      user: action.user
    };

  case CONSTANTS.AUTH.SIGNUP_FAILURE:
  case CONSTANTS.AUTH.SIGNIN_FAILURE:
    return action.error;

  case CONSTANTS.AUTH.SIGNOUT_SUCCESS:
    return initialState.auth;

  default:
    return state;

  }
};

export default AuthReducer;
