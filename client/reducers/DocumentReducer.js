import { DOCUMENT, USER } from '../constants/Constants';
import initialState from '../utilities/initialState';

/**
 * Documents Reducer
 * @param {object} [state=initialState.auth] [state object parameter]
 * @param {object} action    object parameter contains action type and payload
 * @returns {object}  returns a state object
 */
const DocumentReducer = (state = initialState.documents, action) => {
  const newDoc = action.document;
  let newState;
  switch (action.type) {

  case DOCUMENT.GET_ALL_SUCCESS:
    return action.documents;

  case DOCUMENT.CREATE_SUCCESS:
    newState = [Object.assign({}, newDoc), ...state];
    if (newState.length > 9) newState.pop();
    return newState;


  case DOCUMENT.UPDATE_SUCCESS:
    return [Object.assign({}, newDoc),
      ...state.filter(item => item.id !== newDoc.id)];

  case DOCUMENT.SEARCH_SUCCESS:
    return action.documents;

  case USER.GET_DOCS_SUCCESS:
    return action.documents;

  case DOCUMENT.DELETE_SUCCESS:
    return [...state.filter(item => item.id !== newDoc.id)];


  case USER.GET_DOCS_FAILURE:
  case DOCUMENT.CREATE_FAILURE:
  case DOCUMENT.UPDATE_FAILURE:
  case DOCUMENT.GET_ALL_FAILURE:
  case DOCUMENT.DELETE_FAILURE:
    return action.error;

  default:
    return state;
  }
};

/**
 * Document Reducer
 * @param {object} [state=initialState.auth] [state object parameter]
 * @param {object} action    object parameter contains action type and payload
 * @returns {object}  returns a state object
 */
const Document = (state = initialState.document, action) => {
  switch (action.type) {
  case DOCUMENT.GET_SUCCESS:
    return action.document;

  case DOCUMENT.GET_FAILURE:
    return state;

  default:
    return state;
  }
};

export { DocumentReducer, Document };
