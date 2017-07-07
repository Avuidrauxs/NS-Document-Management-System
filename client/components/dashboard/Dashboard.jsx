import React from 'react';
import { Route } from 'react-router-dom';
import Container from 'muicss/lib/react/container';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DashboardAppBar from './DashboardAppBar';
import routes from '../../routes';

/**
 * Dashboard
 * this function returns a single React element ie. native DOM component
 * @return {React.Component} [A react componet element]
 */
const Dashboard = () => (

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

);


export default Dashboard;
