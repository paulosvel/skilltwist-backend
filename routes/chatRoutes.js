const express = require('express');
const { startChat, getChatMessages, sendMessage } = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware.js'); // Middleware to protect routes

const router = express.Router();

router.post('/', authMiddleware, startChat); // Start a chat
router.get('/:chatId', authMiddleware, getChatMessages); // Fetch chat messages
router.post('/:chatId/messages', authMiddleware, sendMessage); // Send a new message

module.exports = router;