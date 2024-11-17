const Skill = require("../models/Skill");

// Add Skill
const addSkill = async (req, res) => {
    const { skillType, skillName } = req.body;

    try {
        const skill = await Skill.create({
            userId: req.user.id, // Assuming `req.user` contains authenticated user
            skillType,
            skillName,
        });
        res.status(201).json({ message: 'Skill added successfully', skill });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get All Skills by User
const getUserSkills = async (req, res) => {
    try {
        const skills = await Skill.findAll({ where: { userId: req.user.id } });
        res.status(200).json(skills);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update Skill
const updateSkill = async (req, res) => {
    const { skillName } = req.body;
    const { id } = req.params;

    try {
        const skill = await Skill.findOne({ where: { id, userId: req.user.id } });
        if (!skill) return res.status(404).json({ error: 'Skill not found' });

        skill.skillName = skillName;
        await skill.save();
        res.status(200).json({ message: 'Skill updated successfully', skill });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete Skill
const deleteSkill = async (req, res) => {
    const { id } = req.params;

    try {
        const skill = await Skill.findOne({ where: { id, userId: req.user.id } });
        if (!skill) return res.status(404).json({ error: 'Skill not found' });

        await skill.destroy();
        res.status(200).json({ message: 'Skill deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { addSkill, getUserSkills, updateSkill, deleteSkill };
