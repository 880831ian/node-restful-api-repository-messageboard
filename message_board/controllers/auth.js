const Auth = require("../repositories/auth");
const bcrypt = require("bcrypt");

// 註冊
const register = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ user: "沒有正確輸入帳號或密碼" });
  }

  const salt = await bcrypt.genSalt(10);
  const bcrypt_password = await bcrypt.hash(req.body.password, salt);

  user = await Auth.register(req.body.username, bcrypt_password);
  if (!user[1]) {
    return res.status(400).json({ user: "username已存在" });
  }
  return res.status(201).json({ user: user });
};

// 登入
const login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ user: "沒有正確輸入帳號或密碼" });
  }

  user = await Auth.login(req.body.username, req.body.password);
  if (!user) {
    return res.status(400).json({ user: "帳號或密碼錯誤" });
  }
  session = req.session;
  session.userid = user.id;
  return res.status(200).json({ user: "登入成功" });
};

// 登出
const logout = async (req, res) => {
  session = req.session;
  session.destroy();
  return res.status(200).json({ user: "登出成功" });
};

module.exports = {
  register,
  login,
  logout,
};
