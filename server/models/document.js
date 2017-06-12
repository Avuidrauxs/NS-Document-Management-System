export default (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'Title already exist' },
      validate: { notEmpty: { args: true, msg: 'Title cant be empty' } }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: { args: true, msg: 'Body cant be empty' } }
    },
    privilege: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'public',
      validate: { isIn: { args: [['public', 'private', 'role']], msg: 'Use a valid privilege' } }
    },
  }, {
    classMethods: {
      associate: (models) => {
        Document.belongsTo(models.User, {
          foreignKey: 'authorId',
          allowNull: false,
          onDelete: 'SET NULL'
        });
      }
    }
  });
  return Document;
};
