import Controller from '../controllers';
import Authenticate from '../middleware/authenticate';

export default (app) => {
  /**
   * @swagger
   * definition:
   *   Puppy:
   *     properties:
   *       name:
   *         type: string
   *       breed:
   *         type: string
   *       age:
   *         type: integer
   *       sex:
   *         type: string
   */

   /**
    * @swagger
    * /api/v1/puppies/{id}:
    *   get:
    *     tags:
    *       - Puppies
    *     description: Returns a single puppy
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: id
    *         description: Puppy's id
    *         in: path
    *         required: true
    *         type: integer
    *     responses:
    *       200:
    *         description: A single puppy
    *         schema:
    *           $ref: '#/definitions/Puppy'
    */
  app.post('/api/v1/users/login', Controller.user.login);

  // Logout route
  app.post('/api/v1/users/logout', Controller.user.logout);

  // Create new user route
  app.post('/api/v1/users', Controller.user.createNewUser);

//  Fetch all users route
  app.get('/api/v1/users', Authenticate.checkUser, Authenticate.allowAdmin,
    Controller.user.fetchAllUsers);

    // Search for a user by username route
  app.get('/api/v1/search/users', Authenticate.checkUser,
  Authenticate.allowAdmin,
  Controller.user.fetchAllUsers);

  // Fetch user route
  app.get('/api/v1/users/:id', Authenticate.checkUser,
  Controller.user.fetchUser);

  // Update user info route
  app.put('/api/v1/users/:id', Authenticate.checkUser,
  Authenticate.allowUser,
  Controller.user.updateUser);

// Delete user route
  app.delete('/api/v1/users/:id', Authenticate.checkUser,
  Authenticate.allowUser,
  Controller.user.deleteUser);

// Fetch User saved documents route
  app.get('/api/v1/users/:id/documents',
  Authenticate.checkUser, Authenticate.allowUser,
  Controller.user.fetchUserDocuments);
};
