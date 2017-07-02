import UsersTable from './UsersTable';
import DocumentsList from './DocumentList';
import AdminDocumentsList from './AdminDocumentList';
import DocumentEditor from '../document-editor/DocumentEditor';
import RestrictRoute from '../../utilities/restrictRoutes';
import UserDocumentsList from './UserDocumentList';
import NotFoundPage from '../NotFound';

/**
 * This is the Routes array that contains components for the React Router
 * @type {Array}
 */
const routes = [
  { path: '/',
    exact: true,
    main: RestrictRoute(DocumentsList)
  },
  { path: '/user-documents',
    exact: true,
    main: RestrictRoute(UserDocumentsList)
  },
  { path: '/admin-documents',
    exact: true,
    main: RestrictRoute(AdminDocumentsList)
  },
  { path: '/dash-users',
    exact: true,
    main: RestrictRoute(UsersTable)
  },
  { path: '/create-document',
    exact: true,
    main: RestrictRoute(DocumentEditor)
  },
  { path: '*',
    exact: true,
    component: NotFoundPage,
  }
];

export default routes;
