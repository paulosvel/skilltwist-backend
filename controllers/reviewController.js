const Review = require("../models/review");

// Add a review
const addReview = async (req, res) => {
    const { userId, rating, comment } = req.body;

    try {
        const review = await Review.create({
            userId,
            reviewerId: req.user.id, // Assuming `req.user` contains authenticated user
            rating,
            comment,
        });
        res.status(201).json({ message: "Review added successfully", review });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// Get all reviews for a user
const getUserReviews = async (req, res) => {
    const { userId } = req.params;

    try {
        const reviews = await Review.findAll({ where: { userId } });
        res.status(200).json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { addReview, getUserReviews };