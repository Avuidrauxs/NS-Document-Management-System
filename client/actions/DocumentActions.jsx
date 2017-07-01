import axios from 'axios';
import { USER, DOCUMENT } from '../constants/constants';

/**
 * Fetch all documents action
 * @param  {Number} [offset=0] [Offset variable]
 * @param  {Number} [limit=9]  [limit variable]
 * @return {object}            [action object with metadata, type description and documents]
 */
export function fetchDocuments(offset = 0, limit = 9) {
  return (dispatch) => {
    return axios.get(`/api/documents?limit=${limit}&offset=${offset}`)
    .then((res) => {
      dispatch({
        type: DOCUMENT.GET_ALL_SUCCESS,
        documents: res.data.rows,
        metaData: res.data.metaData,
        offset,
        query: ''
      });
    },
  (err) => {
    dispatch({
      type: DOCUMENT.GET_ALL_FAILURE,
      error: { message: `Error: ${err}` }
    });
  });
  };
}

/**
 * [Save document action description]
 * @param  {object} doc [document object eith document details]
 * @return {object}     [action object with newly saved document and type description]
 */
export function saveDocument(doc) {
  if (!doc.id) {
    return (dispatch) => {
      return axios.post('/api/documents', doc)
    .then((res) => {
      dispatch({
        type: DOCUMENT.CREATE_SUCCESS,
        document: res.data
      });
    },
  (err) => {
    dispatch({
      type: DOCUMENT.CREATE_FAILURE,
      error: { message: `Error: ${err}` }
    });
  });
    };
  }
  return (dispatch) => {
    return axios.put(`/api/documents/${doc.id}`, doc)
    .then((res) => {
      dispatch({
        type: DOCUMENT.UPDATE_SUCCESS,
        document: res.data
      });
    },
  (err) => {
    dispatch({
      type: DOCUMENT.UPDATE_FAILURE,
      error: { message: `Error: ${err}` }
    });
  });
  };
}

export function deleteDocument(id) {
  return (dispatch) => {
    return axios.delete(`/api/documents/${id}`)
    .then(() => {
      dispatch({
        type: DOCUMENT.DELETE_SUCCESS
      });
    },
  (err) => {
    dispatch({
      type: DOCUMENT.DELETE_FAILURE,
      error: { message: `Error: ${err}` }
    });
  });
  };
}

export function searchDocuments(query, offset = 0, limit = 9) {
  return (dispatch) => {
    return axios
      .get(`/api/search/documents?q=${query}&limit=${limit}&offset=${offset}`)
      .then((res) => {
        dispatch({
          type: DOCUMENT.SEARCH_SUCCESS,
          documents: res.data.rows,
          metaData: res.data.metaData,
          query,
          offset
        });
      },
    (err) => {
      dispatch({
        type: DOCUMENT.SEARCH_FAILURE,
        error: { message: `Error: ${err}` }
      });
    });
  };
}
export function fetchUserDocuments(id) {
  return (dispatch) => {
    return axios.get(`/api/users/${id}/documents`)
      .then((res) => {
        dispatch({
          type: USER.GET_DOCS_SUCCESS,
          documents: res.data
        });
      }, (err) => {
        dispatch({
          type: USER.GET_DOCS_FAILURE,
          error: { message: `Error: ${err}` }
        });
      });
  };
}
