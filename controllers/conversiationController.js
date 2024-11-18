const { Conversation, Message, User } = require('../models');

const createConversation = async (req, res) => {
    const { user1Id, user2Id } = req.body;

    try {
        const existingConversation = await Conversation.findOne({
            $or: [{ user1Id, user2Id }, { user1Id: user2Id, user2Id: user1Id }],
        });

        if (existingConversation) return res.json(existingConversation);

        const conversation = await Conversation.create({ user1Id, user2Id });
        res.json(conversation);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({
            $or: [{ user1Id: req.user.id }, { user2Id: req.user.id }],
        }).populate('user1Id user2Id');
        res.json(conversations);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { createConversation, getConversations };
