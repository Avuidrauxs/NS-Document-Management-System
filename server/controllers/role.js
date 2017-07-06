import models from '../models';

const rolee = {

/**
 * Route: POST: /roles
 * @param  {object} req [request object parameter]
 * @param  {object} res [response object paramter]
 * @return {object}    returns a response object
 */
  addRole(req, res) {
    return models.Role.create(req.body)
    .then(role => res.status(201).send({
      id: role.id,
      description: role.description,
      message: 'Role inserted'
    }))
    .catch(error => res.status(400).send(error));
  },

/**
 * Route: DELETE: /roles/:id
 * @param  {object} req [request object parameter]
 * @param  {object} res [response object paramter]
 * @return {object}    returns a response object
 */
  removeRole(req, res) {
    return models.Role.findById(req.params.id)
      .then((role) => {
        if (!role) return res.status(404).send({ message: 'Role not found' });
        role.destroy(req.body)
          .then(() => res.status(203).send({ message: 'Role deleted' }));
      })
      .catch(error => res.status(400).send(error));
  },

/**
 * Route: GET: /roles or GET: /roles
 * @param  {object} req [request object parameter]
 * @param  {object} res [response object paramter]
 * @return {object}    returns a response object
 */
  fetchRoles(req, res) {
    return models.Role.findAll({
      attributes: ['id', 'description'],
      order: [['id', 'ASC']]
    })
    .then(roles => res.status(200).send(roles))
    .catch(error => res.status(400).send(error));
  },

/**
 * Route: PUT: /roles/:id
 * @param  {object} req [request object parameter]
 * @param  {object} res [response object paramter]
 * @return {object}    returns a response object
 */
  updateRole(req, res) {
    return models.Role.findById(req.params.id)
      .then((role) => {
        if (!role) return res.status(404).send({ message: 'Non existent role' });
        role.update(req.body)
          .then(updatedRole =>
          res.status(200).send({ id: updatedRole.id, description: updatedRole.description }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  /**
   * Route: GET: /roles/:id
   * @param  {object} req [request object parameter]
   * @param  {object} res [response object paramter]
   * @return {object}    returns a response object
   */
  fetchRole(req, res) {
    return models.Role.findById(req.params.id)
    .then((role) => {
      if (!role) return res.status(404).send({ message: 'Role not found' });

      res.status(200).send({ id: role.id, description: role.description });
    })
    .catch(error => res.status(400).send(error));
  }

};

export default rolee;
