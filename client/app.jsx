import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './components/Main';
import routes from './routes';
import './styles/app.scss';
import configureStore from './store/configureStore';
import * as CONSTANTS from './constants/Constants';
import { login } from './actions/AuthActions';


const store = configureStore();
const token = localStorage.getItem('jwt-token');

// Persisting redux store
if (token) {
  store.dispatch(login(token, CONSTANTS.AUTH.SIGNIN_SUCCESS));
}

/**
 * this function returns a single React element ie. native DOM component
 * @return {React.Component} [A react componet element]
 */
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Main />
        <div className="mui-container-fluid">
          {routes.map((route, index) => (
            <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
        </div>
      </div>
    </Router>
  </Provider>
,
  document.getElementById('app')
);
