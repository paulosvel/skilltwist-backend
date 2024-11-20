const express = require('express');
const { createConversation, getConversations } = require('../controllers/conversationController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/start', auth, createConversation);
router.get('/', auth, getConversations);
// In your conversation routes
router.get('/:otherUserId', auth, async (req, res) => {
    try {
        // Try to find existing conversation
        let conversation = await Conversation.findOne({
            $or: [
                { user1Id: req.user.id, user2Id: req.params.otherUserId },
                { user1Id: req.params.otherUserId, user2Id: req.user.id }
            ]
        });

        // If no conversation exists, create one
        if (!conversation) {
            conversation = await Conversation.create({
                user1Id: req.user.id,
                user2Id: req.params.otherUserId
            });
        }

        res.json(conversation);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
module.exports = router;
