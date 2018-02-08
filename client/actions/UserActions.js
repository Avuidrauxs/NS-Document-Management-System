import axios from 'axios';
import { USER } from '../constants/Constants';


export const fetchAllUsersSuccess = users => ({
  type: USER.GET_ALL_SUCCESS,
  users: users.users,
  metaData: users.metaData,
  offset: users.offset,
  query: ''
});

export const fetchAllUsersFailure = error => ({
  type: USER.GET_ALL_FAILURE,
  error
});

export const updateUserFailure = error => ({
  type: USER.UPDATE_FAILURE,
  error
});

export const deleteUserSuccess = user => ({
  type: USER.DELETE_SUCCESS,
  user
});

export const deleteUserFailure = error => ({
  type: USER.DELETE_FAILURE,
  error: { message: `Error: ${error}` }
});

/**
 * This function fetches all users of the NSDMS sytem stored in the backend
 * @param  {Number} [offset=0] [offset parameter]
 * @param  {Number} [limit=9]  [limit paramter]
 * @return {object}    [action object with type and payload]
 */
export function fetchAllUsers(offset = 0, limit = 9) {
  return (dispatch) => {
    return axios.get(`/api/v1/users?limit=${limit}&offset=${offset}`)
    .then((res) => {
      const success = {
        users: res.data.users,
        metaData: res.data.metaData,
        offset,
        query: ''
      };
      dispatch(fetchAllUsersSuccess(success));
    }, (err) => {
      const error = {
        error: { message: `Error: ${err}` }
      };
      dispatch(fetchAllUsersFailure(error));
    });
  };
}
/**
 * Update a user's information in the backend
 * @param  {object} user [the user object]
 * @return {object}    [action object with type and payload]
 */
export function updateUser(user) {
  return (dispatch) => {
    return axios.put(`/api/v1/users/${user.id}`, user)
      .then((res) => {
        dispatch({
          type: USER.UPDATE_SUCCESS,
          user: res.data
        });
      }, (err) => {
        const error = {
          error: { message: `Error: ${err}` }
        };
        dispatch(updateUserFailure(error));
      });
  };
}

/**
 * Deletes a user from the NSDMS backend
 * @param  {object} user [The user's id parameter]
 * @return {object}    [action object with type and payload]
 */
export function deleteUser(user) {
  return (dispatch) => {
    return axios.delete(`/api/v1/users/${user.id}`)
      .then(() => {
        dispatch(deleteUserSuccess(user));
      }, (err) => {
        dispatch(deleteUserFailure(err));
      });
  };
}

/**
* Get user profile
*
* @param {String} id user id
* @returns {Object} dispatch object
*/
export function getUserDetails(id) {
  return (dispatch) => {
    return axios.get(`/api/v1/users/${id}`)
      .then((res) => {
        dispatch({
          type: USER.GET_SUCCESS,
          profile: res.data
        });
      }, (err) => {
        dispatch({
          type: USER.GET_FAILURE,
          error: { message: `Error: ${err}` }
        });
      });
  };
}

/**
 * This function searches for users from the backend by username
 * @param  {string} query      [Username query string ]
 * @param  {Number} [offset=0] [offset parameter]
 * @param  {Number} [limit=9]  [limit parameter]
 * @return {object}    [action object with type and payload]
 */
export function searchUsers(query, offset = 0, limit = 9) {
  return (dispatch) => {
    return axios
    .get(`/api/v1/search/users?q=${query}&limit=${limit}&offset=${offset}`)
      .then((res) => {
        dispatch({
          type: USER.SEARCH_SUCCESS,
          users: res.data.users,
          metaData: res.data.metaData,
          query,
          offset
        });
      }, (err) => {
        dispatch({
          type: USER.SEARCH_FAILURE,
          error: { message: `Error: ${err}` }
        });
      });
  };
}
