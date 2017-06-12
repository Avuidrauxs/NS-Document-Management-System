import models from '../models';
import Authenticate from '../middleware/authenticate';
import Paginate from '../helpers/paginate';

const User = {

  // Route: POST: /users
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
      response.message = 'User created';
      response.token = token;
      return res.status(201).send(response);
    })
    .catch(error => res.status(400).send(error));
  },

  // Route: GET: /users/:id
  fetchUser(req, res) {
    return models.User.findById(req.params.id)
      .then((user) => {
        if (!user) return res.status(404).send({ message: 'User not found' });

        res.status(200).send(Authenticate.userDetails(user));
      })
      .catch(error => res.status(400).send(error));
  },

// Route: PUT: /users/:id
// This updates user information
  updateUser(req, res) {
    if (req.body.roleId !== 1 && res.header.decoded.roleId !== 1) {
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

  // Route: GET: /users or GET: /users/?limit=[integer]&offset=[integer]&q=[username]
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
      // include: [{
      //   model: models.Role,
      //   as: 'roles',
      // }],
      //   order: [
      //     ['createdAt', 'DESC'],
      //     [{ model: models.Role, as: 'roles' }, 'createdAt', 'ASC'],
      //   ],
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

// DELETE NOT WORKING FOR NOW
// Route: DELETE: /users/:id
  deleteUser(req, res) {
    if (res.header.decoded.roleId === req.params.id && res.header.decoded.roleId !== 1) {
      return res.status(403).send({ message: 'You dont have that privilege' });
    }
    return res.header.user.destroy()
    .then(() => res.status(203).send({ message: 'User deleted' }));
  },

// Route: POST: /users/login
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

// Route: GET: /users/:id/documents
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

// Route: POST: /users/login
  logout(req, res) {
    return res.status(203).send({
      message: 'Successfully logged out'
    });
  }

};

export default User;
