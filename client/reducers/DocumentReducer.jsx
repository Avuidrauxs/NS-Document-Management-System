import { DOCUMENT, USER } from '../constants/Constants';
import initialState from '../utilities/initialState';

const DocumentReducer = (state = initialState.documents, action) => {
  const newDoc = action.document;
  let newState;
  switch (action.type) {
  case DOCUMENT.GET_ALL_SUCCESS:
    return action.documents;

  case DOCUMENT.GET_ALL_FAILURE:
    return state;

  case DOCUMENT.CREATE_SUCCESS:
    newState = [Object.assign({}, newDoc), ...state];
    if (newState.length > 9) newState.pop();
    return newState;

  case DOCUMENT.CREATE_FAILURE:
    return state;

  case DOCUMENT.UPDATE_SUCCESS:
    return [Object.assign({}, newDoc),
      ...state.filter(item => item.id !== newDoc.id)];

  case USER.GET_DOCS_SUCCESS:
    return action.documents;

  case USER.GET_DOCS_FAILURE:
    return action.error;

  default:
    return state;
  }
};

export default DocumentReducer;
