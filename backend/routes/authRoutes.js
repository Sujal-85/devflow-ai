import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'devflow_secret_key_123', {
        expiresIn: '30d',
    });
};

// Helper to trigger n8n webhook
const triggerWebhook = async (userData) => {
    try {
        // Using global fetch (Node 18+)
        await fetch('https://agentic-workflow.app.n8n.cloud/webhook/login-event', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: userData.name,
                email: userData.email,
                timestamp: new Date().toISOString()
            })
        });
    } catch (error) {
        console.error('Webhook trigger failed:', error.message);
    }
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            // Trigger webhook asynchronously (don't await to not block response)
            triggerWebhook({ name: user.name, email: user.email });

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            // Trigger webhook asynchronously
            triggerWebhook({ name: user.name, email: user.email });

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Trigger n8n webhook (for social login)
// @route   POST /api/auth/webhook-trigger
// @access  Public
router.post('/webhook-trigger', async (req, res) => {
    const { name, email } = req.body;
    triggerWebhook({ name, email });
    res.status(200).json({ message: 'Webhook triggered' });
});

export default router;
