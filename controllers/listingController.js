const Listing = require("../models/listing");

// Create a new listing
const createListing = async (req, res) => {
    const { skillOffered, skillNeeded, description } = req.body;

    try {
        const listing = await Listing.create({
            userId: req.user.id,
            skillOffered,
            skillNeeded,
            description,
        });
        res.status(201).json({ message: "Listing created successfully", listing });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// Get all listings
const getAllListings = async (req, res) => {
    try {
        const listings = await Listing.find();
        res.status(200).json(listings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// Get a listing by ID
const getListingById = async (req, res) => {
    const { id } = req.params;

    try {
        const listing = await Listing.findOne({ where: { id } });
        if (!listing) {
            return res.status(404).json({ error: "Listing not found" });
        }
        res.status(200).json(listing);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// Update a listing
const updateListing = async (req, res) => {
    const { id } = req.params;
    const { skillOffered, skillNeeded, description } = req.body;

    try {
        const listing = await Listing.findOne({ where: { id, userId: req.user.id } });
        if (!listing) return res.status(404).json({ error: "Listing not found" });

        listing.skillOffered = skillOffered;
        listing.skillNeeded = skillNeeded;
        listing.description = description;
        await listing.save();

        res.status(200).json({ message: "Listing updated successfully", listing });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// Delete a listing
const deleteListing = async (req, res) => {
    const { id } = req.params;

    try {
        const listing = await Listing.findOne({ where: { id, userId: req.user.id } });
        if (!listing) return res.status(404).json({ error: "Listing not found" });

        await listing.destroy();
        res.status(200).json({ message: "Listing deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { createListing, getAllListings, updateListing, deleteListing, getListingById };