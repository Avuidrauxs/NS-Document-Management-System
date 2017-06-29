import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import { browserHistory } from 'react-router';
import Container from 'muicss/lib/react/container';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DashboardAppBar from './DashboardAppBar';
import routes from './routes';


const Dashboard = () => (
  <HashRouter history={browserHistory}>
    <MuiThemeProvider>
      <div>
        <DashboardAppBar />
        <Container>
          {routes.map((route, index) => (
            <Route
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.main}
      />
    ))}
        </Container>
      </div>
    </MuiThemeProvider>
  </HashRouter>
);


export default Dashboard;
