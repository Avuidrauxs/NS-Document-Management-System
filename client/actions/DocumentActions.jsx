import axios from 'axios';
import * as CONSTANTS from '../constants/constants';

export function fetchDocuments(offset = 0, limit = 9) {
  return (dispatch) => {
    return axios.get(`/documents?limit=${limit}&offset=${offset}`)
    .then((res) => {
      dispatch({
        type: CONSTANTS.DOCUMENT.GET_ALL_SUCCESS,
        documents: res.data.rows,
        metaData: res.data.metaData,
        offset,
        query: ''
      });
    },
  (err) => {
    dispatch({
      type: CONSTANTS.DOCUMENT.GET_ALL_FAILURE,
      error: { message: `Error: ${err}` }
    });
  });
  };
}
