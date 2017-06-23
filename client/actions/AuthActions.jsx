import axios from 'axios';
import jwt from 'jwt-decode';
import * as CONSTANTS from '../constants/constants';
import setHeader from '../utilities/setHeader';


const login = (token, type) => {
  setHeader(token);
  let user = {};
  const decoded = jwt(token);
  user = { id: decoded.id, roleId: decoded.roleId, username: decoded.username };
  return {
    type,
    user
  };
};

export function postLogout() {
  return (dispatch) => {
    localStorage.removeItem('jwt-token');
    setHeader(null);
    dispatch({ type: CONSTANTS.AUTH.SIGNOUT_SUCCESS });
  };
}

export function postLogin(userDetails) {
  return (dispatch) => {
    return axios.post('/users/login', userDetails)
      .then((res) => {
        if (res.data.message === 'Invalid password or username') {
          dispatch({
            type: CONSTANTS.AUTH.SIGNUP_FAILURE,
            error: res.data.message
          });
        } else {
          const token = res.data.token;
          localStorage.setItem('jwt-token', token);
          dispatch(login(token, CONSTANTS.AUTH.SIGNIN_SUCCESS));
        }
      },
      (err) => {
        dispatch({
          type: CONSTANTS.AUTH.SIGNUP_FAILURE,
          error: { message: `Error: ${err}` }
        });
      }
    );
  };
}
