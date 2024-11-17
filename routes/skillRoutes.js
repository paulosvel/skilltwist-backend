const express = require('express');
const {
    addSkill,
    getUserSkills,
    updateSkill,
    deleteSkill,
} = require('../controllers/skillController');
const authMiddleware = require('../middleware/authMiddleware.js'); // Middleware to protect routes

const router = express.Router();

router.post('/', authMiddleware, addSkill); // Add Skill
router.get('/', authMiddleware, getUserSkills); // View Skills
router.put('/:id', authMiddleware, updateSkill); // Update Skill
router.delete('/:id', authMiddleware, deleteSkill); // Delete Skill

module.exports = router;
