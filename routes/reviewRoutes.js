const express = require('express');
const { addReview, getUserReviews } = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware.js'); // Middleware to protect routes

const router = express.Router();

router.post('/', authMiddleware, addReview); // Add a review
router.get('/:userId', authMiddleware, getUserReviews); // Get all reviews for a user

module.exports = router;