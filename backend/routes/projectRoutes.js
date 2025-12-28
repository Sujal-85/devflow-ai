import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Project from '../models/Project.js';

const router = express.Router();

// @desc    Get all projects for the logged in user
// @route   GET /api/projects
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const projects = await Project.find({ owner: req.user._id }).sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
router.post('/', protect, async (req, res) => {
    const { name, description, techStack, status } = req.body;

    try {
        const project = new Project({
            user: req.user._id, // legacy field if needed, but 'owner' is better
            owner: req.user._id,
            name,
            description,
            techStack,
            status
        });

        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        res.status(400).json({ message: 'Invalid project data' });
    }
});

export default router;
