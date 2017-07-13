import Landing from './components/landing/Landing';
import Dashboard from './components/dashboard/Dashboard';
import RestrictRoute from './utilities/restrictRoutes';
import UsersTable from './components/dashboard/UsersTable';
import DocumentsList from './components/dashboard/DocumentList';
import AdminDocumentsList from './components/dashboard/AdminDocumentList';
import DocumentEditor from './components/document-editor/DocumentEditor';
import UserDocumentsList from './components/dashboard/UserDocumentList';

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
    main: DocumentsList,
    component: RestrictRoute(Dashboard),
  },
  { path: '/dashboard/user-documents',
    exact: true,
    main: UserDocumentsList,
    component: RestrictRoute(Dashboard),
  },
  { path: '/dashboard/admin-documents',
    exact: true,
    main: AdminDocumentsList,
    component: RestrictRoute(Dashboard),
  },
  { path: '/dashboard/dash-users',
    exact: true,
    main: UsersTable,
    component: RestrictRoute(Dashboard),
  },
  { path: '/dashboard/create-document',
    exact: true,
    main: DocumentEditor,
    component: RestrictRoute(Dashboard),
  }
];

export default routes;
