import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { User } from '../models/User.js';
import fetch from 'node-fetch'; // Requires node-fetch v2 or v3 dependent on setup. Node 18 has native fetch.

const router = express.Router();

// @desc    Connect GitHub (Store PAT)
// @route   POST /api/github/connect
// @access  Private
router.post('/connect', protect, async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: 'GitHub Token is required' });
    }

    try {
        // Validate Token by fetching user profile
        const response = await fetch('https://api.github.com/user', {
            headers: { Authorization: `token ${token}` }
        });

        if (!response.ok) {
            return res.status(401).json({ message: 'Invalid GitHub Token' });
        }

        const user = await User.findById(req.user._id);
        user.githubToken = token;
        await user.save();

        res.json({ message: 'GitHub connected successfully', connected: true });
    } catch (error) {
        res.status(500).json({ message: 'Server Error connecting to GitHub' });
    }
});

// @desc    Get GitHub Repositories
// @route   GET /api/github/repos
// @access  Private
router.get('/repos', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        const token = user.githubToken || process.env.GITHUB_ACCESS_TOKEN;

        if (!token) {
            return res.status(400).json({ message: 'GitHub not connected' });
        }

        const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=10', {
            headers: { Authorization: `bearer ${token}` }
        });

        if (!response.ok) {
            return res.status(response.status).json({ message: 'Failed to fetch repos' });
        }

        const repos = await response.json();

        // Map to simplified format
        const formattedRepos = repos.map(repo => ({
            id: repo.id,
            name: repo.name,
            full_name: repo.full_name,
            description: repo.description,
            html_url: repo.html_url,
            language: repo.language,
            stars: repo.stargazers_count
        }));

        res.json(formattedRepos);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching repos' });
    }
});

// @desc    Disconnect GitHub
// @route   POST /api/github/disconnect
// @access  Private
router.post('/disconnect', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.githubToken = null;
        await user.save();
        res.json({ message: 'GitHub disconnected', connected: false });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
