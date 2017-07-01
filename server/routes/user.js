import Controller from '../controllers';
import Authenticate from '../middleware/authenticate';

export default (app) => {
  // Login route
  app.post('/api/users/login', Controller.user.login);

  // Logout route
  app.post('/api/users/logout', Controller.user.logout);

  // Create new user route
  app.post('/api/users', Controller.user.createNewUser);

//  Fetch all users route
  app.get('/api/users', Authenticate.checkUser, Authenticate.allowAdmin,
    Controller.user.fetchAllUsers);

    // Search for a user by username route
  app.get('/api/search/users', Authenticate.checkUser, Authenticate.allowAdmin,
  Controller.user.fetchAllUsers);

  // Fetch user route
  app.get('/api/users/:id', Authenticate.checkUser, Controller.user.fetchUser);

  // Update user info route
  app.put('/api/users/:id', Authenticate.checkUser, Authenticate.allowUser,
  Controller.user.updateUser);

// Delete user route
  app.delete('/api/users/:id', Authenticate.checkUser, Authenticate.allowUser,
  Controller.user.deleteUser);

// Fetch User saved documents route
  app.get('/api/users/:id/documents', Authenticate.checkUser, Authenticate.allowUser,
  Controller.user.fetchUserDocuments);
};
