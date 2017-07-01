import { REHYDRATE } from 'redux-persist/constants';
import { AUTH } from '../constants/Constants';
import initialState from '../utilities/initialState';

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
