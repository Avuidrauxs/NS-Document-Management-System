import axios from 'axios';
import { USER } from '../constants/Constants';

/**
 * This function fetches all users of the NSDMS sytem stored in the backend
 * @param  {Number} [offset=0] [offset parameter]
 * @param  {Number} [limit=9]  [limit paramter]
 * @return {object}    [action object with type and payload]
 */
export function fetchAllUsers(offset = 0, limit = 20) {
  return (dispatch) => {
    return axios.get(`/api/users?limit=${limit}&offset=${offset}`)
    .then((res) => {
      dispatch({
        type: USER.GET_ALL_SUCCESS,
        users: res.data.rows,
        metaData: res.data.metaData,
        offset,
        query: ''
      });
    }, (err) => {
      dispatch({
        type: USER.GET_ALL_FAILURE,
        error: { message: `Error: ${err}` }
      });
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
    return axios.put(`/api/users/${user.id}`, user)
      .then((res) => {
        dispatch({
          type: USER.UPDATE_SUCCESS,
          user: res.data
        });
      }, (err) => {
        dispatch({
          type: USER.UPDATE_FAILURE,
          error: { message: `Error: ${err}` }
        });
      });
  };
}

/**
 * Deletes a user from the NSDMS backend
 * @param  {number} id [The user's id parameter]
 * @return {object}    [action object with type and payload]
 */
export function deleteUser(id) {
  return (dispatch) => {
    return axios.delete(`/api/users/${id}`)
      .then(() => {
        dispatch({
          type: USER.DELETE_SUCCESS,
        });
      }, (err) => {
        dispatch({
          type: USER.DELETE_FAILURE,
          error: { message: `Error: ${err}` }
        });
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
    return axios.get(`/api/users/${id}`)
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
export function searchUsers(query, offset = 0, limit = 20) {
  return (dispatch) => {
    return axios.get(`/api/search/users?q=${query}&limit=${limit}&offset=${offset}`)
      .then((res) => {
        dispatch({
          type: USER.SEARCH_SUCCESS,
          users: res.data.rows,
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
