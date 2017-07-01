import axios from 'axios';
import { USER } from '../constants/constants';

export function fetchAllUsers(offset = 0, limit = 9) {
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

export function searchUsers(query, offset = 0, limit = 9) {
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
