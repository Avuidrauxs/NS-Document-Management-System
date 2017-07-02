import axios from 'axios';
import { USER, DOCUMENT } from '../constants/constants';

/**
 * Fetch all documents action
 * @param  {Number} [offset=0] [Offset variable]
 * @param  {Number} [limit=20]  [limit variable]
 * @return {object}            [action object with metadata, type description and documents]
 */
export function fetchDocuments(offset = 0, limit = 20) {
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

/**
 * Delete document from backend method
 * @param  {number} id [The id of the document to be deleted]
 * @return {object}    [action object with type and payload]
 */
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

/**
 * This method is for searching through documents from the backend
 * @param  {string} query      [this is search quiery string]
 * @param  {Number} [offset=0] [offset parameter]
 * @param  {Number} [limit=9]  [limit parameter]
 * @return {object}    [action object with type and payload]
 */
export function searchDocuments(query, offset = 0, limit = 20) {
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

/**
 * This method fetches documents based on id from the backend
 * @param  {number} id [document id paramter]
 * @return {object}    [action object with type and payload]
 */
export function fetchDocument(id) {
  return (dispatch) => {
    return axios.get(`/api/documents/${id}`)
      .then((res) => {
        dispatch({
          type: DOCUMENT.GET_SUCCESS,
          document: res.data
        });
      }, (err) => {
        dispatch({
          type: DOCUMENT.GET_FAILURE,
          error: { message: `Error: ${err}` }
        });
      });
  };
}
/**
 * This method fetches User authored documents
 * @param  {number} id [the user's id parameter]
 * @return {object}    [action object with type and payload]
 */
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
