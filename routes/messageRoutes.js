const express = require("express");
const { getMessages, sendMessage } = require("../controllers/messageController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/:id", authMiddleware, getMessages);
router.post("/send/:id", authMiddleware, sendMessage);

module.exports = router;
