"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class reply extends Model {
    static associate(models) {
      reply.belongsTo(models.message, {
        foreignKey: "message_id",
      });
      reply.belongsTo(models.user, {
        foreignKey: "user_id",
      });
    }
  }
  reply.init(
    {
      message_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
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
      modelName: "reply",
    }
  );
  return reply;
};
