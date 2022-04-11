const Message = require("../repositories/message");
const Reply = require("../repositories/reply");

// 查詢所有留言
const getAllMessage = async (req, res) => {
  message = await Message.getAll();
  return res.status(200).json({ message: message });
};

//查詢{id}留言
const getMessage = async (req, res) => {
  if (!(message = await Message.get(req.params.message_id))) {
    return res.status(404).json({ message: "找不到留言" });
  }
  return res.status(200).json({ message: message });
};

//新增留言
const createMessage = async (req, res) => {
  if (!req.body.content || req.body.content.length > 20) {
    return res.status(400).json({ message: "沒有輸入內容或長度超過20個字元" });
  }

  message = await Message.create(req.session.userid, req.body.content);
  return res.status(201).json({ message: message });
};

//修改留言
const updateMessage = async (req, res) => {
  if (!(message = await Message.get(req.params.message_id))) {
    return res.status(404).json({ message: "找不到留言" });
  }

  if (!req.body.content || req.body.content.length > 20) {
    return res.status(400).json({ message: "沒有輸入內容或長度超過20個字元" });
  }

  if (
    (await Message.update(
      req.params.message_id,
      req.session.userid,
      req.body.content,
      message["version"]
    )) == "0"
  ) {
    return res.status(400).json({ message: "修改留言失敗" });
  }
  return res.status(200).json({ message: "修改留言成功" });
};

//刪除留言
const deleteMessage = async (req, res) => {
  if (!(await Message.delete(req.params.message_id, req.session.userid))) {
    return res.status(400).json({ message: "刪除留言失敗" });
  }
  // 刪除留言時同步刪除所有回覆
  await Reply.deleteMessage(req.params.message_id);
  return res.status(204).json({ message: "刪除留言成功" });
};

module.exports = {
  getAllMessage,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
};
