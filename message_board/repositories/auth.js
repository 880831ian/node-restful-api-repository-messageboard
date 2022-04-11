const User = require("../models").user;
const bcrypt = require("bcrypt");

const auth = {
  // 註冊
  async register(username, bcrypt_password) {
    return await User.findOrCreate({
      where: { username: username },
      defaults: { username: username, password: bcrypt_password },
    });
  },

  // 登入
  async login(username, password) {
    const user = await User.findOne({ where: { username: username } });
    if (user) {
      return (await bcrypt.compare(password, user.password)) ? user : false;
    }
  },
};

module.exports = auth;
