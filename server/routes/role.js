import Controller from '../controllers';
import Authenticate from '../middleware/authenticate';

export default (app) => {
  /**
* @swagger
* definition:
*   Role:
*     type: object
*     required:
*       - roleName
*       - description
*     properties:
*       roleName:
*         type: string
*       description:
*         type: string
*       createdAt:
*         type: string
*         format: int32
*         example: 2016-08-29T09:12:33.001Z
*       updatedAt:
*         type: string
*         format: int32
*         example: 2016-08-29T09:12:33.001Z
*/


/**
   * @swagger
   * /api/v1/roles:
   *   get:
   *      summary: Returns a list of all roles
   *      description: Returns a list of all roles
   *      tags:
   *        - Role
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: x-access-token
   *          in: header
   *          description: an authorization header
   *          required: false
   *          type: string
   *      responses:
   *          200:
   *              description: roles
   *              schema:
   *                  type: array
   *                  items:
   *                      $ref: '#/definitions/Role'
   */
  app.get('/api/v1/roles', Controller.role.fetchRoles);

  /**
     * @swagger
     * /api/v1/roles:
     *   post:
     *     summary: Creates a role
     *     description: Creates a role
     *     tags:
     *      - Role
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: x-access-token
     *         in:  header
     *         description: an authorization token
     *         required: true
     *         type: string
     *       - name: body
     *         description: Role object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/Role'
     *     responses:
     *       201:
     *         description: roles
     *         schema:
     *          type: object
     */
  app.post('/api/v1/roles', Authenticate.checkUser, Authenticate.allowAdmin,
  Controller.role.addRole);

  /**
     * @swagger
     * /api/v1/roles/{id}:
     *   get:
     *     summary: Returns a role
     *     description: Returns a role
     *     tags:
     *      - Role
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: x-access-token
     *         in:  header
     *         description: an authorization token
     *         required: true
     *         type: string
     *       - name: id
     *         description: Role Id
     *         in:  path
     *         required: true
     *         type: integer
     *         schema:
     *           $ref: '#/definitions/Role'
     *     responses:
     *       201:
     *         description: roles
     *         schema:
     *          type: object
     */
  app.get('/api/v1/roles/:id', Controller.role.fetchRole);

  /**
     * @swagger
     * /api/roles/{id}:
     *   put:
     *     summary: Updates a role
     *     description: Updates a role
     *     tags:
     *      - Role
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: x-access-token
     *         in:  header
     *         description: an authorization token
     *         required: true
     *         type: string
     *       - name: id
     *         description: Role Id
     *         in:  path
     *         required: true
     *         type: integer
     *       - name: body
     *         description: Role object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/Role'
     *     responses:
     *       201:
     *         description: roles
     *         schema:
     *          type: object
     */
  app.put('/api/v1/roles/:id', Authenticate.checkUser,
  Authenticate.allowAdmin, Controller.role.updateRole);

  /**
     * @swagger
     * /api/v1/roles/{id}:
     *   delete:
     *     summary: Deletes a role
     *     description: Deletes a role
     *     tags:
     *      - Role
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: x-access-token
     *         in:  header
     *         description: an authorization token
     *         required: true
     *         type: string
     *       - name: id
     *         description: Role Id
     *         in:  path
     *         required: true
     *         type: integer
     *         schema:
     *           $ref: '#/definitions/Role'
     *     responses:
     *       201:
     *         description: roles
     *         schema:
     *          type: object
     */
  app.delete('/api/v1/roles/:id', Authenticate.checkUser,
  Authenticate.allowAdmin, Controller.role.removeRole);
};
