import Landing from './components/landing/Landing';
import Dashboard from './components/dashboard/Dashboard';
import NotFoundPage from './components/NotFound';
import RestrictRoute from './utilities/restrictRoutes';

const routes = [
  { path: '/',
    exact: true,
    component: Landing,
  },
  { path: '/dashboard',
    exact: true,
    component: RestrictRoute(Dashboard),
  },
  // { path: '/*',
  //   exact: false,
  //   component: NotFoundPage,
  // },
  // { path: '/signup',
  //   exact: true,
  //   component: PreventAuthenticatedUsers(SignUp),
  // },
  // { path: '/dashboard',
  //   exact: true,
  //   component: RequireAuthentication(Dashboard),
  // },
  // { path: '/new-document',
  //   exact: true,
  //   component: RequireAuthentication(AddDocument),
  // },
  // { path: '/profile',
  //   component: RequireAuthentication(Profile),
  // },
  // { path: '/members',
  //   exact: true,
  //   component: RequireAuthentication(ViewUsers),
  // }
];

export default routes;
