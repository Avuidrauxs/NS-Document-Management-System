import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { DocumentReducer, Document } from '../reducers/DocumentReducer';
import AuthReducer from '../reducers/AuthReducer';
import UserReducer from '../reducers/UserReducer';
import PaginationReducer from '../reducers/PaginationReducer';

/**
 * This function handles the configuration of a redux store
 * @param  {Object} [initialState={}] [intial state of the store states]
 * @return {object}     returns store object
 */
const configureStore = (initialState = {}) => {
  const reducer = combineReducers({
    AuthReducer,
    DocumentReducer,
    UserReducer,
    PaginationReducer,
    Document
  });

  const store = createStore(reducer,
    initialState,
  compose(applyMiddleware(thunk),
    window.devToolsExtension
  ? window.devToolsExtension()
  : f => f));

  return store;
};

export default configureStore;
