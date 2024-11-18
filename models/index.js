const mongoose = require('mongoose');

const User = require('./User');
const Message = require('./message');
const Conversation = require('./conversation');

module.exports = { User, Message, Conversation };
