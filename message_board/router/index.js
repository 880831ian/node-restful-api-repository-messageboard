"use strict";
const express = require("express");
const middleware = require("../middleware");
const router = express();

const { register, login, logout } = require("../controllers/auth");

const {
  getAllMessage,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
} = require("../controllers/message");

const {
  createReply,
  updateReply,
  deleteReply,
} = require("../controllers/reply");

// 註冊、登入、登出
router.post("/register", express.json(), register);
router.post("/login", express.json(), login);
router.post("/logout", logout);

// 查詢留言
router.get("/message", getAllMessage);
router.get("/message/:message_id", getMessage);

//需要驗證才可以使用（新增留言、修改留言、刪除留言、新增留言回覆、修改留言回覆、刪除留言回覆）
router.use(middleware);
router.post("/message", express.json(), createMessage);
router.patch("/message/:message_id", express.json(), updateMessage);
router.delete("/message/:message_id", deleteMessage);
router.post("/message/:message_id", express.json(), createReply);
router.patch("/message/:message_id/:reply_id", express.json(), updateReply);
router.delete("/message/:message_id/:reply_id", deleteReply);

module.exports = router;
