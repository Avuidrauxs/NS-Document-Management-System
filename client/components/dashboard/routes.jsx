import UsersTable from './UsersTable';
import DocumentsList from './DocumentList';
import AdminDocumentsList from './AdminDocumentList';

const routes = [
  { path: '/dashboard',
    exact: true,
    main: DocumentsList
  },
  { path: '/dash-documents',
    exact: true,
    main: DocumentsList
  },
  { path: '/admin-documents',
    exact: true,
    main: AdminDocumentsList
  },
  { path: '/dash-users',
    exact: true,
    main: UsersTable
  }
];

export default routes;
