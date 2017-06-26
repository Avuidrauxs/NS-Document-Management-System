import axios from 'axios';
import * as CONSTANTS from '../constants/constants';

export function fetchAllUsers(offset = 0, limit = 9) {
  return (dispatch) => {
    return axios.get(`/users?limit=${limit}&offset=${offset}`)
    .then((res) => {
      dispatch({
        type: CONSTANTS.USER.GET_ALL_SUCCESS,
        users: res.data.rows,
        metaData: res.data.metaData,
        offset,
        query: ''
      });
    }, (err) => {
      dispatch({
        type: CONSTANTS.USER.GET_ALL_FAILURE,
        error: { message: `Error: ${err}` }
      });
    });
  };
}
