import Controller from '../controllers';
import Authenticate from '../middleware/authenticate';

export default (app) => {
  /**
   * @swagger
   * definition:
   *   User:
   *    type: object
   *    required:
   *      - username
   *      - fullName
   *      - email
   *      - roleId
   *    properties:
   *      id:
   *        type: integer
   *      username:
   *        type: string
   *        example: JDoe
   *      fullName:
   *        type: string
   *        example: John Doe
   *      email:
   *        type: string
   *        format: email
   *        example: jdoe@hot.com
   *      roleId:
   *        type: integer
   *        example: 2
   *      createdAt:
   *        type: string
   *        format: int32
   *        example: 2016-08-29T09:12:33.001Z
   *      updatedAt:
   *        type: string
   *        format: int32
   *        example: 2016-08-29T09:12:33.001Z
   */

   // Security Schema definition
  /**
    * @swagger
    * securityDefinitions:
    *  x-access-token:
    *    type: apiKey
    *    description: JWT Authentication
    *    in: header
    *    name: x-access-token
    */

   /**
    * @swagger
    * /api/v1/users/login:
    *   post:
    *     tags:
    *       - User
    *     summary: logs in a user
    *     operationId: login
    *     description: Logs in a user and provides them with a jwt token to
    *       access other routes where required
    *     produces:
    *       - application/json
    *     consumes:
    *       - application/x-www-form-urlencoded
    *     parameters:
    *       - name: username
    *         in: formData
    *         description: The user name for login
    *         required: true
    *         type: string
    *       - name: password
    *         in: formData
    *         description: The password for login in clear text
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *         description: Successfully logged in
    *         schema:
    *           type: string
    *         headers:
    *           x-access-token:
    *             type: string
    *             format: int32
    *             description: stores user jwt token
    *       400:
    *         description: User not found
    *       401:
    *         description: Invalid password or username
    */
  app.post('/api/v1/users/login', Controller.user.login);

  /**
   * @swagger
   * /api/v1/users/logout:
   *   post:
   *     tags:
   *       - User
   *     summary: Logs out current logged in user session
   *     operationId: logout
   *     description: Logs out a user
   *     produces: []
   *     responses:
   *       200:
   *         description: Successfully logged out
   */
  app.post('/api/v1/users/logout', Controller.user.logout);

  /**
   * @swagger
   * /api/v1/users:
   *   post:
   *     tags:
   *       - User
   *     summary: fetches all users
   *     operationId: fetchAllUsers
   *     description: |
   *       If you have a jwt authentication token you can access this
   *       route and you can also provide a username parameter
   *       to fetch a particular user
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: body
   *         description: User object to be saved
   *         schema:
   *           $ref: '#/definitions/User'
   *     responses:
   *       200:
   *         description: User created
   *       400:
   *         description: invalid input, object invalid
   *       409:
   *         description: an existing item already exists
   */
  app.post('/api/v1/users', Controller.user.createNewUser);

  /**
   * @swagger
   * /api/v1/users:
   *   get:
   *     tags:
   *       - User
   *     summary: fetches all users
   *     operationId: fetchAllUsers
   *     description: |
   *       If you have a jwt authentication token you can access this
   *       route and you can also provide a username parameter
   *       to fetch a particular user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: x-access-token
   *         in: header
   *         description: an authorization header
   *         required: false
   *         type: string
   *       - in: query
   *         name: q
   *         description: pass an optional search string
   *           for looking up users by username
   *         required: false
   *         type: string
   *     responses:
   *       200:
   *         description: search results matching criteria
   *         schema:
   *           $ref: '#/definitions/User'
   *     security:
   *     - x-access-token: []
   */
  app.get('/api/v1/users', Authenticate.checkUser, Authenticate.allowAdmin,
    Controller.user.fetchAllUsers);

    /**
     * @swagger
     * /api/v1/search/users:
     *   get:
     *     tags:
     *       - User
     *     summary: Get user by user name
     *     operationId: fetchAllUsers
     *     description: Get user by user name
     *     produces:
     *       - application/json
     *     consumes:
     *       - x-www-form-urlencoded
     *     parameters:
     *       - name: x-access-token
     *         in: header
     *         description: an authorization header
     *         required: true
     *         type: string
     *       - in: query
     *         name: username
     *         description: The name that needs to be fetched.
     *           Use pepper for testing.
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: successful operation
     *         schema:
     *           $ref: '#/definitions/User'
     *       400:
     *         description: Invalid username supplied
     *     security:
     *     - x-access-token: []
     */
  app.get('/api/v1/search/users', Authenticate.checkUser,
  Authenticate.allowAdmin,
  Controller.user.fetchAllUsers);

  /**
       * @swagger
       * /api/v1/users/{id}:
       *   get:
       *     summary: Fetches a user by id
       *     description: Fetches a user by id
       *     tags:
       *      - User
       *     produces:
       *      - application/json
       *     parameters:
       *       - name: x-access-token
       *         in: header
       *         description: an authorization header
       *         required: true
       *         type: string
       *       - name: id
       *         description: The id that needs to be fetched. Use 2 for testing
       *         in:  path
       *         required: true
       *         type: integer
       *     responses:
       *       200:
       *         description: ''
       *         schema:
       *           $ref: '#/definitions/User'
       *       400:
       *         description: Invalid id supplied
       *       404:
       *         description: User not found
       *     security:
       *     - x-access-token: []
       */
  app.get('/api/v1/users/:id', Authenticate.checkUser,
  Controller.user.fetchUser);

  /**
       * @swagger
       * /api/v1/users/{id}:
       *   put:
       *     summary: Updates a user by id
       *     description: Updates a user by id
       *     tags:
       *      - User
       *     produces:
       *      - application/json
       *     parameters:
       *       - name: x-access-token
       *         in: header
       *         description: an authorization header
       *         required: true
       *         type: string
       *       - name: id
       *         description: The id that needs to be updated. Use 2 for testing
       *         in:  path
       *         required: true
       *         type: integer
       *       - name: body
       *         description: The id that needs to be updated. Use 2 for testing
       *         in:  body
       *         required: true
       *         schema:
       *           $ref: '#/definitions/User'
       *     responses:
       *       200:
       *         description: users
       *         schema:
       *          $ref: '#/definitions/User'
       *       400:
       *         description: users
       *       403:
       *         description: users
       *     security:
       *     - x-access-token: []
       */
  app.put('/api/v1/users/:id', Authenticate.checkUser,
  Authenticate.allowUser,
  Controller.user.updateUser);

  /**
       * @swagger
       * /api/v1/users/{id}:
       *   delete:
       *     summary: Deletes a user by id
       *     description: Deletes a user by id
       *     tags:
       *      - User
       *     produces:
       *      - application/json
       *     parameters:
       *       - name: x-access-token
       *         in: header
       *         description: an authorization header
       *         required: true
       *         type: string
       *       - name: id
       *         description: The id that needs to be fetched. Use 2 for testing
       *         in:  path
       *         required: true
       *         type: integer
       *     responses:
       *       203:
       *         description: users
       *         schema:
       *          type: array
       *     security:
       *     - x-access-token: []
       */
  app.delete('/api/v1/users/:id', Authenticate.checkUser,
  Authenticate.allowUser,
  Controller.user.deleteUser);

  /**
   * @swagger
   * definition:
   *   UserDocument:
   *    type: object
   *    required:
   *      - id
   *      - title
   *      - body
   *      - authorID
   *      - access
   *    properties:
   *      id:
   *        type: integer
   *      title:
   *        type: string
   *        example: Pasco
   *      body:
   *        type: string
   *        example: Lorem Ipsum
   *      authorID:
   *        type: integer
   *        example: 2
   *      access:
   *        type: string
   *        example: public
   *      createdAt:
   *        type: string
   *        format: int32
   *        example: 2016-08-29T09:12:33.001Z
   *      updatedAt:
   *        type: string
   *        format: int32
   *        example: 2016-08-29T09:12:33.001Z
   *      User:
   *        type: object
   *        example:
   *          username: PepperSoup
   *          roleId: 2
   */

   /**
      * @swagger
      * /api/v1/users/{id}/documents:
      *    get:
      *      description: Returns the documents belonging to the user of id
      *      tags:
      *        - User
      *      produces:
      *        - application/json
      *      parameters:
      *        - name: x-access-token
      *          in: header
      *          description: an authorization header
      *          required: true
      *          type: string
      *        - name: id
      *          description: User Id
      *          in:  path
      *          required: true
      *          type: integer
      *      responses:
      *          200:
      *            description: user's documents
      *          schema:
      *            $ref: '#/definitions/UserDocument'
      *      security:
      *      - x-access-token: []
      */
  app.get('/api/v1/users/:id/documents',
  Authenticate.checkUser, Authenticate.allowUser,
  Controller.user.fetchUserDocuments);
};
