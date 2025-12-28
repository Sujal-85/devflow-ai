import express from 'express';
import { TeamMember } from '../models/TeamMember.js';

const router = express.Router();

// Get all team members
router.get('/', async (req, res) => {
    try {
        const members = await TeamMember.find();
        res.json(members);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
