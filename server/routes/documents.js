import Controller from '../controllers';
import Authenticate from '../middleware/authenticate';

export default (app) => {
  /**
* @swagger
* definition:
*   Document:
*     type: object
*     required:
*        - title
*        - body
*        - access
*        - authorId
*     properties:
*        title:
*           type: string
*        body:
*           type: string
*        access:
*            type: string
*        authorId:
*            type: id
*        createdAt:
*            type: string
*            format: int32
*            example: 2016-08-29T09:12:33.001Z
*        updatedAt:
*            type: string
*            format: int32
*            example: 2016-08-29T09:12:33.001Z
*/


/**
  * @swagger
  * /api/v1/documents:
  *   get:
  *      summary: Returns a list of all documents
  *      description: Returns a list of all documents
  *      tags:
  *        - Document
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
  *              description: documents
  *              schema:
  *                  type: array
  *                  items:
  *                      $ref: '#/definitions/Document'
  */
  app.get('/api/v1/documents', Controller.documents.fetchAllDocuments);

  /**
     * @swagger
     * /api/v1/documents:
     *   post:
     *     summary: Creates a new document
     *     description: Creates a new document
     *     tags:
     *      - Document
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: x-access-token
     *         in: header
     *         description: an authorization header
     *         required: true
     *         type: string
     *       - name: body
     *         description: Document object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/Document'
     *     responses:
     *       201:
     *         description: documents
     *         schema:
     *          type: object
     */
  app.post('/api/v1/documents', Authenticate.checkUser,
  Controller.documents.createDocument);

  /**
       * @swagger
       * /api/v1/documents/{id}:
       *   get:
       *     summary: Returns a document by Id
       *     description: Returns a document by Id
       *     tags:
       *      - Document
       *     produces:
       *      - application/json
       *     parameters:
       *        - name: x-access-token
       *          in: header
       *          description: an authorization header
       *          required: true
       *          type: string
       *        - name: id
       *          description: Document Id
       *          in:  path
       *          required: true
       *          type: integer
       *     responses:
       *        200:
       *          description: documents
       *          schema:
       *            type: array
       *            items:
       *              $ref: '#/definitions/Document'
       */
  app.get('/api/v1/documents/:id', Controller.documents.fetchDocument);
  /**
     * @swagger
     * /api/v1/documents/{id}:
     *   put:
     *     summary: Updates a document by Id
     *     description: Updates a document by Id
     *     tags:
     *      - Document
     *     produces:
     *      - application/json
     *     parameters:
     *        - name: x-access-token
     *          in: header
     *          description: an authorization header
     *          required: true
     *          type: string
     *        - name: id
     *          description: Document Id
     *          in:  path
     *          required: true
     *          type: integer
     *        - name: body
     *          description: Document object
     *          in:  body
     *          required: true
     *          type: string
     *          schema:
     *            $ref: '#/definitions/Document'
     *     responses:
     *        200:
     *          description: documents
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/Document'
     */
  app.put('/api/v1/documents/:id', Authenticate.checkUser,
  Authenticate.allowAuthor, Controller.documents.updateDocument);

  /**
   * @swagger
   * /api/v1/documents/{id}:
   *   delete:
   *     summary: Removes a document by Id
   *     description: Removes a document by Id
   *     tags:
   *      - Document
   *     produces:
   *      - application/json
   *     parameters:
   *        - name: x-access-token
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *        - name: id
   *          description: Document Id
   *          in:  path
   *          required: true
   *          type: integer
   *     responses:
   *        200:
   *          description: documents
   *          schema:
   *            type: array
   *            items:
   *              $ref: '#/definitions/Document'
   */
  app.delete('/api/v1/documents/:id', Authenticate.checkUser,
  Authenticate.allowAuthor, Controller.documents.deleteDocument);

  /**
     * @swagger
     * /api/v1/search/documents?q=documentTitle}:
     *    get:
     *      description: Returns the documents
     *      tags:
     *        - Document
     *      produces:
     *        - application/json
     *      parameters:
     *        - name: x-access-token
     *          in: header
     *          description: an authorization header
     *          required: true
     *          type: string
     *        - in: query
     *          name: q
     *          description: title of a document
     *          required: true
     *          type: string
     *      responses:
     *        200:
     *          description: document
     *          schema:
     *            $ref: '#/definitions/Document'
     */
  app.get('/api/v1/search/documents', Controller.documents.fetchAllDocuments);
};
