const Chat = require("../models/chat");
const Message = require("../models/message");

// Start a new chat
const startChat = async (req, res) => {
    const { participants } = req.body;

    try {
        const chat = await Chat.create({ participants });
        res.status(201).json({ message: "Chat created successfully", chat });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// Fetch chat messages
const getChatMessages = async (req, res) => {
    const { chatId } = req.params;

    try {
        const messages = await Message.findAll({ where: { chatId } });
        res.status(200).json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// Send a new message
const sendMessage = async (req, res) => {
    const { chatId } = req.params;
    const { senderId, text } = req.body;

    try {
        const message = await Message.create({ chatId, senderId, text });
        res.status(201).json({ message: "Message sent successfully", message });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { startChat, getChatMessages, sendMessage };