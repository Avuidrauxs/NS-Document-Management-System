import * as CONSTANTS from '../constants/Constants';
import initialState from '../utilities/initialState';

const DocumentReducer = (state = initialState.documents, action) => {
  const newDoc = action.document;
  let newState;
  switch (action.type) {
  case CONSTANTS.DOCUMENT.GET_ALL_SUCCESS:
    return action.documents;
  case CONSTANTS.DOCUMENT.GET_ALL_FAILURE:
    return state;
  case CONSTANTS.DOCUMENT.CREATE_SUCCESS:
    newState = [Object.assign({}, newDoc), ...state];
    if (newState.length > 9) newState.pop();
    return newState;
  case CONSTANTS.DOCUMENT.CREATE_FAILURE:
    return state;
  case CONSTANTS.DOCUMENT.UPDATE_SUCCESS:
    return [Object.assign({}, newDoc),
      ...state.filter(item => item.id !== newDoc.id)];
  default:
    return state;
  }
};

export default DocumentReducer;
