"use strict";
const express = require("express");
const sessions = require("express-session");
const app = express();
const port = 8888;

// 設定 Session
const oneDay = 1000 * 60 * 60 * 1;
app.use(
  sessions({
    secret: "mySecret",
    name: "user",
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

// 註冊路由
app.use("/api/v1", require("./router"));

// 檢查是否有table，沒有就建立
// const Message = require("./models").message;
// const User = require("./models").user;
// Message.sync();
// User.sync();

// 開啟監聽
app.listen(port, console.log("啟動 Server,Port:" + port));
