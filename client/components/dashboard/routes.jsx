import UsersTable from './UsersTable';
import DocumentsList from './DocumentList';
import AdminDocumentsList from './AdminDocumentList';
import DocumentEditor from '../document-editor/DocumentEditor';

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
  },
  { path: '/create-document',
    exact: true,
    main: DocumentEditor
  }
];

export default routes;
