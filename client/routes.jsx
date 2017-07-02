import Landing from './components/landing/Landing';
import Dashboard from './components/dashboard/Dashboard';
import RestrictRoute from './utilities/restrictRoutes';

/**
 * This is the Routes array that contains components for the React Router
 * @type {Array}
 */
const routes = [
  { path: '/',
    exact: true,
    component: Landing,
  },
  { path: '/dashboard',
    exact: true,
    component: RestrictRoute(Dashboard),
  }
];

export default routes;
