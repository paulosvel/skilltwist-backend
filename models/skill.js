const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    skillType: { type: String, enum: ['offered', 'needed'], required: true },
    skillName: { type: String, required: true },
});

const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;