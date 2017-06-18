export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'Role description already exist' },
      validate: { notEmpty: { args: true, msg: 'Set a role description' } }
    }
  }, {
    classMethods: {
      associate: (models) => {
        Role.hasMany(models.User, {
          foreignKey: 'roleId',
          as: 'users'
        });
      }
    }
  });
  return Role;
};
