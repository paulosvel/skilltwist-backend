const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/send', auth, sendMessage);
router.get('/:conversationId', auth, getMessages);

module.exports = router;
