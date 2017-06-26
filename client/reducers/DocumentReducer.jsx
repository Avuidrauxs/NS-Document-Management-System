import * as CONSTANTS from '../constants/Constants';
import initialState from '../utilities/initialState';

const DocumentReducer = (state = initialState.documents, action) => {
  switch (action.type) {
  case CONSTANTS.DOCUMENT.GET_ALL_SUCCESS:
    return action.documents;
  case CONSTANTS.DOCUMENT.GET_ALL_FAILURE:
    return state;
  default:
    return state;
  }
};

export default DocumentReducer;
