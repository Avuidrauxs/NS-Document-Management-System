import Controller from '../controllers';
import Authenticate from '../middleware/authenticate';

export default (app) => {
  // Route fetches all roles
  app.get('/api/v1/roles', Controller.role.fetchRoles);

  // Route adds a new role
  app.post('/api/v1/roles', Authenticate.checkUser, Authenticate.allowAdmin,
  Controller.role.addRole);

  // Route fetches role by id
  app.get('/api/v1/roles/:id', Controller.role.fetchRole);

  // Route to upate a role
  app.put('/api/v1/roles/:id', Authenticate.checkUser,
  Authenticate.allowAdmin, Controller.role.updateRole);

  // Route to remove a role
  app.delete('/api/v1/roles/:id', Authenticate.checkUser,
  Authenticate.allowAdmin, Controller.role.removeRole);
};
