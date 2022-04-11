const Reply = require("../repositories/reply");

//新增回覆
const createReply = async (req, res) => {
  if (!req.body.content || req.body.content.length > 20) {
    return res.status(400).json({ message: "沒有輸入回覆或長度超過20個字元" });
  }

  if (
    !(reply = await Reply.create(
      req.params.message_id,
      req.session.userid,
      req.body.content
    ))
  ) {
    return res.status(400).json({ message: "新增回覆失敗" });
  }
  return res.status(201).json({ message: reply });
};

//修改回覆
const updateReply = async (req, res) => {
  if (!(reply = await Reply.get(req.params.reply_id, req.params.message_id))) {
    return res.status(404).json({ message: "找不到回覆" });
  }

  if (!req.body.content || req.body.content.length > 20) {
    return res.status(400).json({ message: "沒有輸入回覆或長度超過20個字元" });
  }

  if (
    (await Reply.update(
      req.params.reply_id,
      req.params.message_id,
      req.session.userid,
      req.body.content,
      reply["version"]
    )) == "0"
  ) {
    return res.status(400).json({ message: "修改回覆失敗" });
  }
  return res.status(200).json({ message: "修改回覆成功" });
};

//刪除回覆
const deleteReply = async (req, res) => {
  if (
    !(await Reply.delete(
      req.params.reply_id,
      req.params.message_id,
      req.session.userid
    ))
  ) {
    return res.status(400).json({ message: "刪除回覆失敗" });
  }
  return res.status(204).json({ message: "刪除回覆成功" });
};

module.exports = {
  createReply,
  updateReply,
  deleteReply,
};
