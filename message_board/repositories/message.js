const Message = require("../models").message;
const Reply = require("../models").reply;

const repository = {
  async getAll() {
    return await Message.findAll({ include: { model: Reply } });
  },

  async get(message_id) {
    return await Message.findOne({
      include: {
        model: Reply,
      },
      where: { id: message_id },
    });
  },

  async create(user_id, content) {
    return await Message.create({ user_id: user_id, content: content });
  },

  async update(message_id, user_id, content, version) {
    return await Message.update(
      {
        content: content,
        version: version + 1,
      },
      {
        where: {
          id: message_id,
          user_id: user_id,
          version: version,
        },
      }
    );
  },

  async delete(message_id, user_id) {
    return await Message.destroy({
      where: { id: message_id, user_id: user_id },
    });
  },
};

module.exports = repository;
