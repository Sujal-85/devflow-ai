import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const router = express.Router();

// Initialize Chat Model
// Requires GOOGLE_API_KEY in .env
// Initialize Chat Model (Lazy load to ensure env vars are ready)
const getChat = () => new ChatGoogleGenerativeAI({
    model: "gemini-pro",
    maxOutputTokens: 2048,
    apiKey: process.env.GOOGLE_API_KEY,
});

// @desc    Chat with AI Assistant
// @route   POST /api/ai/chat
// @access  Private
router.post('/chat', protect, async (req, res) => {
    const { message, context } = req.body;

    if (!message) {
        return res.status(400).json({ message: 'Message is required' });
    }

    try {
        const chat = getChat();
        const systemPrompt = `You are DevFlow AI, an intelligent assistant dedicated to helping developers manage their projects.
        
        Your Constraints:
        1. You ONLY answer questions related to software development, coding, project management, and the DevFlow platform.
        2. If the user asks about unrelated topics (e.g., general knowledge, cooking, sports), politely decline and remind them you are a project assistant.
        3. Be concise, technical, and helpful.
        4. Current Context: ${context || 'General Project Management'}.
        
        Help the user navigate their workflow, debug issues, or plan their sprints.`;

        const response = await chat.invoke([
            new SystemMessage(systemPrompt),
            new HumanMessage(message),
        ]);

        res.json({ reply: response.content });
    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({
            message: 'AI Service Error. Please check your API Key configuration.',
            error: error.message
        });
    }
});

export default router;
