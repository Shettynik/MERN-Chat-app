const express = require("express");
const chatroomControllers = require("../controllers/chatroomControllers");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/",auth, chatroomControllers.getChatrooms);
router.post("/",chatroomControllers.creatChatRoom);
router.get("/messages/:chatroomId", auth, chatroomControllers.getChatMessages);

module.exports = router;