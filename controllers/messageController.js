const { Message, Conversation } = require('../models');

const sendMessage = async (req, res) => {
    const { conversationId, receiverId, content } = req.body;

    try {
        const message = await Message.create({
            conversationId,
            senderId: req.user.id,
            receiverId,
            content,
        });

        await Conversation.update(
            { lastMessage: content },
            { where: { id: conversationId } }
        );

        res.json(message);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getMessages = async (req, res) => {
    const { conversationId } = req.params;

    try {
        const messages = await Message.findAll({ where: { conversationId } });
        res.json(messages);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { sendMessage, getMessages };
