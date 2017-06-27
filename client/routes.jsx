import Landing from './components/landing/Landing';
import Dashboard from './components/dashboard/Dashboard';
import NotFoundPage from './components/NotFound';
import RestrictRoute from './utilities/restrictRoutes';
import UsersTable from './components/dashboard/UsersTable';
import DocumentsList from './components/dashboard/DocumentList';
import AdminDocumentsList from './components/dashboard/AdminDocumentList';
import DocumentEditor from './components/document-editor/DocumentEditor';

const routes = [
  { path: '/',
    exact: true,
    component: Landing,
  },
  { path: '/dashboard',
    exact: true,
    component: RestrictRoute(Dashboard),
  },
  // { path: '/dash-documents',
  //   exact: true,
  //   main: RestrictRoute(DocumentsList)
  // },
  // { path: '/admin-documents',
  //   exact: true,
  //   main: RestrictRoute(AdminDocumentsList)
  // },
  // { path: '/dash-users',
  //   exact: true,
  //   main: RestrictRoute(UsersTable)
  // },
  // { path: '/create-document',
  //   exact: true,
  //   main: RestrictRoute(DocumentEditor)
  // }
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
