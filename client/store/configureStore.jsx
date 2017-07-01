import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import DocumentReducer from '../reducers/DocumentReducer';
import AuthReducer from '../reducers/AuthReducer';
import UserReducer from '../reducers/UserReducer';
import PaginationReducer from '../reducers/PaginationReducer';


const configureStore = (initialState = {}) => {
  const reducer = combineReducers({
    AuthReducer,
    DocumentReducer,
    UserReducer,
    PaginationReducer
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
