const express = require('express');
const {
    createListing,
    getAllListings,
    updateListing,
    deleteListing,
} = require('../controllers/listingController');
const authMiddleware = require('../middleware/authMiddleware.js'); // Middleware to protect routes

const router = express.Router();

router.post('/', authMiddleware, createListing); // Create a new listing
router.get('/', authMiddleware, getAllListings); // Get all listings
router.put('/:id', authMiddleware, updateListing); // Update a listing
router.delete('/:id', authMiddleware, deleteListing); // Delete a listing

module.exports = router;