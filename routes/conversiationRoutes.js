const express = require('express');
const { createConversation, getConversations } = require('../controllers/conversationController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/start', auth, createConversation);
router.get('/', auth, getConversations);

module.exports = router;
