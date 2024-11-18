const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    user1Id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    user2Id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lastMessage: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;
