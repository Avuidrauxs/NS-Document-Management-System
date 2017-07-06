import models from '../models';
import Authenticate from '../middleware/authenticate';
import Paginate from '../helpers/paginate';

const User = {

  /**
   * Route: POST: /users
   * @param  {object} req [request object parameter]
   * @param  {object} res [response object paramter]
   * @return {object}    returns a response object
   */
  createNewUser(req, res) {
    if (req.body.roleId === 1) {
      return res.status(401).send({ message: 'Invalid Privilege' });
    }
    return models.User.create(req.body)
    .then((user) => {
      const token = Authenticate.createToken({
        id: user.id,
        username: user.username,
        roleId: user.roleId
      });
      const response = Authenticate.userDetails(user);
      response.message = `Created ${user.username}`;
      response.token = token;
      return res.status(201).send(response);
    })
    .catch(error => res.status(400).send(error));
  },

  /**
   * Route: GET: /users/:id
   * @param  {object} req [request object parameter]
   * @param  {object} res [response object paramter]
   * @return {object}    returns a response object
   */
  fetchUser(req, res) {
    return models.User.findById(req.params.id)
      .then((user) => {
        if (!user) return res.status(404).send({ message: 'User not found' });

        res.status(200).send(Authenticate.userDetails(user));
      })
      .catch(error => res.status(400).send(error));
  },

/**
 * Route: PUT: /users/:id
 * @param  {object} req [request object parameter]
 * @param  {object} res [response object paramter]
 * @return {object}    returns a response object
 */
  updateUser(req, res) {
    if (req.body.roleId === 1 && res.header.decoded.roleId !== 1) {
      return res.status(403).send({
        message: 'You dont have that kinda privilege'
      });
    }
    return res.header.user.update(req.body, { fields: Object.keys(req.body) })
    // return res.header.user.update({ roleId: 0 })
    .then(updatedUser =>
      res.status(200).send(Authenticate.userDetails(updatedUser)))
    .catch(error => res.status(400).send(error));
  },

  /**
   * Route: GET: /users or GET: /search/users/?limit=[integer]&offset=[integer]&q=[username]
   * @param  {object} req [request object parameter]
   * @param  {object} res [response object paramter]
   * @return {object}    returns a response object
   */
  fetchAllUsers(req, res) {
    let searchQuery = '%%';
    if (req.query.q) searchQuery = `%${req.query.q}%`;

    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 20;

    return models.User.findAndCount({
      offset,
      limit,
      attributes: ['id', 'username', 'fullName', 'email', 'roleId'],
      where: { username: {
        $iLike: searchQuery
      } },
      order: [['createdAt', 'DESC']]
    })
    .then((users) => {
      const response = {
        rows: users.rows,
        metaData: Paginate(users.count, limit, offset)
      };
      return res.status(200).send(response);
    })
    .catch(error => res.status(400).send(error));
  },

/**
 * Route: DELETE: /users/:id
 * @param  {object} req [request object parameter]
 * @param  {object} res [response object paramter]
 * @return {object}    returns a response object
 */
  deleteUser(req, res) {
    if (res.header.decoded.roleId === req.params.id && res.header.decoded.roleId !== 1) {
      return res.status(403).send({ message: 'You dont have that privilege' });
    }
    return res.header.user.destroy()
    .then(() => res.status(203).send({ message: 'User deleted' }));
  },

/**
 * Route: POST: /users/login
 * @param  {object} req [request object parameter]
 * @param  {object} res [response object paramter]
 * @return {object}    returns a response object
 */
  login(req, res) {
    return models.User.findOne({ where: {
      username: req.body.username
    } })
  .then((user) => {
    if (user && user.checkPassword(req.body.password)) {
      const token = Authenticate.createToken({
        id: user.id,
        username: user.username,
        roleId: user.roleId
      });
      res.status(200).send({
        token,
        message: 'Successfully logged in'
      });
    } else {
      res.status(401).send({ message: 'Invalid password or username' });
    }
  })
  .catch(error => res.status(400).send(error));
  },

/**
 * Route: GET: /users/:id/documents
 * @param  {object} req [request object parameter]
 * @param  {object} res [response object paramter]
 * @return {object}    returns a response object
 */
  fetchUserDocuments(req, res) {
    return models.Document.findAll({
      where: { authorId: res.header.user.id },
      include: [{
        model: models.User,
        attributes: ['username', 'roleId'] }],
    })
  .then((documents) => {
    res.status(200).send(documents);
  })
  .catch(error => res.status(400).send(error));
  },

/**
 * Route: POST: /users/logout
 * @param  {object} req [request object parameter]
 * @param  {object} res [response object paramter]
 * @return {object}    returns a response object
 */
  logout(req, res) {
    return res.status(203).send({
      message: 'Successfully logged out'
    });
  }

};

export default User;
