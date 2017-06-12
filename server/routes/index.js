import user from './user';
import documents from './documents';

export default (app) => {
  user(app);
  documents(app);
};
