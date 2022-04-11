"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    static associate(models) {
      message.hasMany(models.reply, {
        foreignKey: "message_id",
      });
      message.belongsTo(models.user, {
        foreignKey: "user_id",
      });
    }
  }
  message.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      version: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      paranoid: true,
      freezeTableName: true,
      modelName: "message",
    }
  );
  return message;
};
