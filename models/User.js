const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    messagesSent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    messagesReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    conversations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
