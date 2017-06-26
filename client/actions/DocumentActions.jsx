import axios from 'axios';
import * as CONSTANTS from '../constants/constants';

export function fetchDocuments(offset = 0, limit = 9) {
  return (dispatch) => {
    return axios.get(`/api/documents?limit=${limit}&offset=${offset}`)
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

export function saveDocument(doc) {
  if (!doc.updateId) {
    return (dispatch) => {
      return axios.post('/api/documents', doc)
    .then((res) => {
      dispatch({
        type: CONSTANTS.DOCUMENT.CREATE_SUCCESS,
        document: res.data
      });
    },
  (err) => {
    dispatch({
      type: CONSTANTS.DOCUMENT.CREATE_FAILURE,
      error: { message: `Error: ${err}` }
    });
  });
    };
  }
  return (dispatch) => {
    return axios.put(`/api/documents/${document.updateId}`, doc)
    .then((res) => {
      dispatch({
        type: CONSTANTS.DOCUMENT.UPDATE_SUCCESS,
        document: res.data
      });
    },
  (err) => {
    dispatch({
      type: CONSTANTS.DOCUMENT.UPDATE_FAILURE,
      error: { message: `Error: ${err}` }
    });
  });
  };
}
