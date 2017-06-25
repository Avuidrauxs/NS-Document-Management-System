import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import DocumentReducer from '../reducers/DocumentReducer';
import AuthReducer from '../reducers/AuthReducer';
import UserReducer from '../reducers/UserReducer';

const thunk = require('redux-thunk').default;

const configureStore = (initialState = {}) => {
  const reducer = combineReducers({
    AuthReducer,
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
