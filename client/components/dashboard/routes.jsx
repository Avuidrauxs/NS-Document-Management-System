import UsersTable from './UsersTable';
import DocumentsList from './DocumentList';

const routes = [
  { path: '/',
    exact: true,
    main: DocumentsList
  },
  { path: '/dash-documents',
    exact: true,
    main: DocumentsList
  },
  { path: '/dash-users',
    exact: true,
    main: UsersTable
  }
];

export default routes;
