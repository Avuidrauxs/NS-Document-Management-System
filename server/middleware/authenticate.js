import jwt from 'jsonwebtoken';
import models from '../models';

const secretKey = process.env.SECRET_KEY || 'pass me the salt';

const Authenticate = {


  userDetails(user) {
    return {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      roleId: user.roleId
    };
  },

  createToken(userDetails) {
    return jwt.sign(userDetails, secretKey, {
      expiresIn: 14400
    });
  },
  checkToken(token) {
    try {
      return jwt.verify(token, secretKey);
    } catch (err) {
      return false;
    }
  },

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

  allowAdmin(req, res, next) {
    if (res.header.decoded.roleId === 1) {
      return next();
    }
    return res.status(403).send({ message: 'You dont have privileges' });
  },

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
        message: 'Token absent'
      });
    }
  },

};

export default Authenticate;
