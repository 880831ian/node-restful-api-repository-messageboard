"use strict";
module.exports = (req, res, next) => {
  if (!req.session.userid) {
    return res.status(401).json({ message: "用戶需要認證" });
  }
  next();
};
