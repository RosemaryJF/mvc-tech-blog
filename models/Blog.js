const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model { }

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [25],
      }
    },
    createdOn: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true,
      },
    },
    content: {
      type: DataTypes.LONGTEXT,
      allowNull: false
    },
    authorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog',
  }
);

module.exports = Blog;