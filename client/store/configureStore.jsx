import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import DocumentReducer from '../reducers/DocumentReducer';
import AuthReducer from '../reducers/AuthReducer';
import UserReducer from '../reducers/UserReducer';


const configureStore = (initialState = {}) => {
  const reducer = combineReducers({
    AuthReducer,
    DocumentReducer,
    UserReducer
  });

  const store = createStore(reducer,
    initialState,
  compose(applyMiddleware(thunk),
    window.devToolsExtension
  ? window.devToolsExtension()
  : f => f));

  // persistStore(store);
  return store;
};

export default configureStore;
