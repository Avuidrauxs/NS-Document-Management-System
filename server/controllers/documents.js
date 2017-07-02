import models from '../models';
import Authenticate from '../middleware/authenticate';
import Paginate from '../helpers/paginate';

const documents = {

/**
 * Route: POST: /documents
 * @param  {object} req [request object parameter]
 * @param  {object} res [response object paramter]
 * @return {object}    returns a response object
 */
  createDocument(req, res) {
    return models.User.findById(res.header.decoded.id)
       .then((user) => {
         req.body.authorId = user.id;
         return models.Document.create(req.body)
           .then((document) => {
             const response = {
               id: document.id,
               title: document.title,
               body: document.body,
               access: document.access,
               User: { username: user.username, roleId: user.roleId },
               authorId: document.authorId,
               createdAt: document.createdAt,
               message: `"${document.title}" created`
             };
             return res.status(201).send(response);
           })
           .catch(error => res.status(400).send(error));
       })
       .catch(error => res.status(400).send(error));
  },

/**
 * Route: GET: /documents/:id
 * @param  {object} req [request object parameter]
 * @param  {object} res [response object paramter]
 * @return {object}    returns a response object
 */
  fetchDocument(req, res) {
    return models.Document.findById(req.params.id, {
      include: [{
        model: models.User,
        attributes: ['username', 'roleId'] }]
    })
    .then((document) => {
      if (!document) {
        return res.status(404).send({ message: 'Document not found' });
      }
      const token = req.body.token || req.query.token || req.headers['x-access-token'];
      const decoded = Authenticate.checkToken(token);
      const userId = decoded ? decoded.id : null;
      const userRoleId = decoded ? decoded.roleId : null;
      if (document.access !== 'public'
        && userRoleId !== 1
        && userId !== document.authorId
        && !(document.access === 'role'
          && userRoleId === document.User.roleId)) {
        return res.status(403).send({ message: 'Access denied' });
      }

      return res.status(200).send(document);
    })
    .catch(error => res.status(400).send(error));
  },

/**
 * Route: PUT: /documents/:id
 * @param  {object} req [request object parameter]
 * @param  {object} res [response object paramter]
 * @return {object}    returns a response object
 */
  updateDocument(req, res) {
    return res.header.document
    .update(req.body, { fields: Object.keys(req.body) })
    .then((updatedDocument) => {
      return models.Document.findById(updatedDocument.id, {
        include: [{
          model: models.User,
          attributes: ['username', 'roleId'] }]
      })
      .then(document => res.status(200).send(document));
    })
    .catch(error => res.status(400).send(error));
  },

/**
 *  Route: DELETE: /documents/:id
 * @param  {object} req [request object parameter]
 * @param  {object} res [response object paramter]
 * @return {object}    returns a response object
 */
  deleteDocument(req, res) {
    res.header.document.destroy()
    .then(() => res.status(200).send({ message: 'Document deleted' }));
  },

  /**
   * Route: GET: /documents or GET: /documents/?limit=[integer]&offset=[integer]&q=[title]
   * @param  {object} req [request object parameter]
   * @param  {object} res [response object paramter]
   * @return {object}    returns a response object
   */
  fetchAllDocuments(req, res) {
    let searchKey = '%%';
    if (req.query.q) {
      searchKey = `%${req.query.q}%`;
    }

    let queryOptions = { access: 'public', title: { $iLike: searchKey } };
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const decoded = Authenticate.checkToken(token);

    if (decoded) {
      queryOptions = (decoded.roleId === 1) ? { title: { $iLike: searchKey } } : {
        $or: [
          { access: { $or: ['public', 'role'] } },
          { authorId: decoded.id }
        ],
        title: { $iLike: searchKey } };
    }

    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 20;

    return models.Document.findAndCount({
      offset,
      limit,
      where: queryOptions,
      include: [{
        model: models.User,
        attributes: ['username', 'roleId'] }],
      order: [['createdAt', 'DESC']]
    })
    .then((allDocuments) => {
      const documentRows = decoded.roleId === 1 ? allDocuments.rows :
        allDocuments.rows.filter(
          doc => !(doc.access === 'role' && doc.User.roleId !== decoded.roleId)
        );

      const response = {
        rows: documentRows,
        metaData: Paginate(allDocuments.count, limit, offset)
      };

      res.status(200).send(response);
    })
    .catch(error => res.status(400).send(error));
  },
};

export default documents;
