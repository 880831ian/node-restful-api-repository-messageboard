"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.hasMany(models.message, {
        foreignKey: "user_id",
      });
    }
  }
  user.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      paranoid: true,
      freezeTableName: true,
      modelName: "user",
    }
  );
  return user;
};
