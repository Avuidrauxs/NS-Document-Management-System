import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, HashRouter } from 'react-router-dom';
import Main from './components/Main';
import routes from './routes';
import './styles/app.scss';
import configureStore from './store/configureStore';
import * as CONSTANTS from './constants/Constants';
import { login } from './actions/AuthActions';
import NotFoundPage from './components/NotFound';


const store = configureStore();
const token = localStorage.getItem('jwt-token');
if (token) {
  store.dispatch(login(token, CONSTANTS.AUTH.SIGNIN_SUCCESS));
}

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
