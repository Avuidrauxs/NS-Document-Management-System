import axios from 'axios';
import jwt from 'jwt-decode';
import { AUTH } from '../constants/Constants';
import setHeader from '../utilities/setHeader';

/**
 * Login action
 * @param  {string} token [Jwt token string]
 * @param  {string} type  [action type description]
 * @return {object}       [action object with type and payload]
 */
export function login(token, type) {
  setHeader(token);
  let user = {};
  const decoded = jwt(token);
  user = { id: decoded.id, roleId: decoded.roleId, username: decoded.username };
  return {
    type,
    user
  };
}

/**
 * Logout action
 * @return {object} [action object with type description]
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwt-token');
    setHeader(null);
    return dispatch({ type: AUTH.SIGNOUT_SUCCESS });
  };
}

/**
 * SignUp action
 * @param  {object} userDetails [user details object]
 * @return {object}             [action object with type description]
 */
export function postSignUp(userDetails) {
  return (dispatch) => {
    return axios.post('/api/v1/users', userDetails)
    .then((res) => {
      const token = res.data.token;
      localStorage.setItem('jwt-token', token);
      dispatch(login(token, AUTH.SIGNUP_SUCCESS));
    },
  (err) => {
    dispatch({
      type: AUTH.SIGNUP_FAILURE,
      error: { message: `Error: ${err}` }
    });
  });
  };
}
/**
 * SignIn action
 * @param  {object} userDetails [user details object]
 * @return {object}             [action object with type description]
 */
export function postLogin(userDetails) {
  return (dispatch) => {
    return axios.post('/api/v1/users/login', userDetails)
      .then((res) => {
        if (res.data.message === 'Invalid password or username') {
          dispatch({
            type: AUTH.SIGNIN_FAILURE,
            error: res.data.message
          });
        } else {
          const token = res.data.token;
          localStorage.setItem('jwt-token', token);
          dispatch(login(token, AUTH.SIGNIN_SUCCESS));
        }
      },
      (err) => {
        dispatch({
          type: AUTH.SIGNIN_FAILURE,
          error: { message: `Error: ${err} action here` }
        });
      });
  };
}
