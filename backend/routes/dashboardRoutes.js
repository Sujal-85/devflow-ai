import express from 'express';
import { Metric } from '../models/Metric.js';

const router = express.Router();

// Get current metrics
router.get('/metrics', async (req, res) => {
    try {
        const metrics = await Metric.find().sort({ timestamp: -1 }).limit(4);
        res.json(metrics);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get recent activity (mock for now as we don't have a specific Activity model yet, or reuse Metrics)
router.get('/activity', (req, res) => {
    // Mock activity data
    const activity = [
        { type: 'commit', message: 'Initial commit', user: 'Alex', time: '2 hours ago' },
        { type: 'review', message: 'Code review completed', user: 'Sarah', time: '4 hours ago' },
    ];
    res.json(activity);
});

export default router;
