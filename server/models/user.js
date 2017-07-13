const bcrypt = require('bcrypt');

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'Email already exist' },
      validate: { isEmail: { args: true, msg: 'Please enter a valid email' } }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'Username already exist' },
      validate: {
        not: { args: ['\\s+'], msg: 'Use a valid username' },
        notEmpty: { args: true, msg: 'Please enter username' } }
    },
    fullName: {
      type: DataTypes.STRING
    },
    roleId: {
      type: DataTypes.INTEGER,
      defaultValue: 2
    }
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Document, {
          foreignKey: 'authorId',
          onDelete: 'SET NULL',
        });
        User.belongsTo(models.Role, {
          foreignKey: 'roleId',
          onDelete: 'SET NULL'
        });
      }
    },

    instanceMethods: {

      checkPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },


      encryptPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
      }
    },

    hooks: {
      beforeCreate(user) {
        user.encryptPassword();
      },

      beforeUpdate(user) {
        if (user._changed.password) {
          user.encryptPassword();
        }
      }
    }
  });
  return User;
};
