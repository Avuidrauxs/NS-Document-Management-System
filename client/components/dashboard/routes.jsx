import UsersTable from './UsersTable';
import DocumentsList from './DocumentList';
import AdminDocumentsList from './AdminDocumentList';
import DocumentEditor from '../document-editor/DocumentEditor';
import RestrictRoute from '../../utilities/restrictRoutes';

const routes = [
  { path: '/dashboard',
    exact: true,
    main: RestrictRoute(DocumentsList)
  },
  { path: '/dash-documents',
    exact: true,
    main: RestrictRoute(DocumentsList)
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
  }
];

export default routes;
