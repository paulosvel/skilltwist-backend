const mongoose = require('mongoose');
const User = require("./User"); // Import the User model

const listingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    skillOffered: { type: String, required: true },
    skillNeeded: { type: String, required: true },
    description: { type: String, required: true },
}, {
    timestamps: true,
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
