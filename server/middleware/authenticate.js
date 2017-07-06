import jwt from 'jsonwebtoken';
import models from '../models';

const secretKey = process.env.SECRET_KEY || 'pass me the salt';

const Authenticate = {

  /**
   * Return secure user details
   *
   * @param {String} user user details
   * @returns {Object} secure data
   */
  userDetails(user) {
    return {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      roleId: user.roleId
    };
  },

  /**
  * Generate a token
  *
  * @param {Object} userDetails user details
  * @returns {String} token
  */
  createToken(userDetails) {
    return jwt.sign(userDetails, secretKey, {
      expiresIn: 14400
    });
  },

  /**
   * Verify user token
   *
   * @param {String} token the token
   * @returns {Object|Boolean} decoded token or false
   */
  checkToken(token) {
    try {
      return jwt.verify(token, secretKey);
    } catch (err) {
      return false;
    }
  },

  /**
  * Allow access for the document author
  *
  * @param {Object} req request object
  * @param {Object} res response object
  * @param {Function} next next function
  * @returns {Response} response object
  */
  allowAuthor(req, res, next) {
    return models.Document.findById(req.params.id)
        .then((document) => {
          if (!document) {
            return res.status(404).send({ message: 'Document not found' });
          }

          if (res.header.decoded.id !== document.authorId) {
            return res.status(403).send({ message: 'You dont have privileges' });
          }

          res.header.document = document;
          return next();
        })
        .catch(error => res.status(400).send(error));
  },

  /**
  * Permit an admin or profile owner
  *
  * @param {Object} req request object
  * @param {Object} res response object
  * @param {Function} next next function
  * @returns {Response} response object
  */
  allowUser(req, res, next) {
    return models.User.findById(req.params.id)
      .then((user) => {
        if (!user) return res.status(404).send({ message: 'User not found' });

        if (res.header.decoded.roleId !== 1
          && res.header.decoded.id !== user.id) {
          return res.status(403).send({ message: 'You dont have privileges yet!' });
        }
        res.header.user = user;
        return next();
      })
      .catch(error => res.status(400).send(error));
  },

  /**
    * Allow access for an admin only
    *
    * @param {Object} req request object
    * @param {Object} res response object
    * @param {Function} next next function
    * @returns {Response} response object
    */
  allowAdmin(req, res, next) {
    if (res.header.decoded.roleId === 1) {
      return next();
    }
    return res.status(403).send({ message: 'You dont have privileges' });
  },

  /**
   * Verify a user
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next next function
   * @returns {Response} response object
   */
  checkUser(req, res, next) {
    const token = req.body.token
      || req.query.token
      || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(403).send({ message: 'Authentication failure' });
        }
        res.header.decoded = decoded;
        return next();
      });
    } else {
      return res.status(403).send({
        message: 'No token provided'
      });
    }
  },

};

export default Authenticate;
