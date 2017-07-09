import { AUTH } from '../constants/Constants';
import initialState from '../utilities/initialState';

/**
 * Authentication Reducer
 * @param {object} [state=initialState.auth] [state object parameter]
 * @param {object} action    object parameter contains action type and payload
 * @returns {object}  returns a state object
 */
const AuthReducer = (state = initialState.auth, action) => {
  switch (action.type) {

  case AUTH.SIGNIN_SUCCESS:
  case AUTH.SIGNUP_SUCCESS:
    return {
      loggedIn: true,
      user: action.user
    };

  case AUTH.SIGNUP_FAILURE:
  case AUTH.SIGNIN_FAILURE:
    return action.error;

  case AUTH.SIGNOUT_SUCCESS:
    return initialState.auth;

  default:
    return state;

  }
};

export default AuthReducer;
