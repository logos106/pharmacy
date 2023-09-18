'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING(100),
    isActive: DataTypes.BOOLEAN,
    role: DataTypes.STRING(20),
    token: DataTypes.STRING(500)
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    scopes: {
      // include hash with this scope
      withPassword: { attributes: {} },
    },
  });
  return User;
};