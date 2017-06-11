import Controller from '../controllers';
import Authenticate from '../middleware/authenticate';

export default (app) => {
  // Login route
  app.post('/users/login', Controller.user.login);

  // Logout route
  app.post('/users/logout', Controller.user.logout);

  // Create new user route
  app.post('/users', Controller.user.createNewUser);

  // Fetch all users route
  app.get('/users', Authenticate.checkUser, Authenticate.allowAdmin,
    Controller.user.fetchAllUsers);

  // Fetch user route
  app.get('/users/:id', Authenticate.checkUser, Controller.user.fetchUser);

  // Update user role route
  app.put('/users/:id', Authenticate.checkUser,
    Authenticate.allowUser, Controller.user.updateUser);

// Delete user route
  app.delete('/users/:id', Authenticate.checkUser,
    Authenticate.allowAdmin, Controller.user.deleteUser);

// Fetch User saved documents
  app.get('/users/:id/documents', Authenticate.checkUser,
    Authenticate.allowAdmin, Controller.user.fetchUserDocuments);
};
