const Message = require("../models").message;
const Reply = require("../models").reply;

const reply = {
  async get(reply_id, message_id) {
    return await Reply.findOne({
      where: { id: reply_id, message_id: message_id },
    });
  },

  async create(message_id, user_id, content) {
    is_exist = await Message.findOne({
      where: { id: message_id },
    });
    if (is_exist) {
      return await Reply.create({
        message_id: message_id,
        user_id: user_id,
        content: content,
      });
    }
  },

  async update(reply_id, message_id, user_id, content, version) {
    return await Reply.update(
      {
        content: content,
        version: version + 1,
      },
      {
        where: {
          id: reply_id,
          message_id: message_id,
          user_id: user_id,
          version: version,
        },
      }
    );
  },

  async delete(reply_id, message_id, user_id) {
    return await Reply.destroy({
      where: {
        id: reply_id,
        message_id: message_id,
        user_id: user_id,
      },
    });
  },

  async deleteMessage(message_id) {
    return await Reply.destroy({
      where: {
        message_id: message_id,
      },
    });
  },
};

module.exports = reply;
