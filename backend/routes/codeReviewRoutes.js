import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const router = express.Router();

// Initialize Chat Model (Lazy load)
const getChat = () => new ChatGoogleGenerativeAI({
    model: "gemini-pro",
    maxOutputTokens: 2048,
    apiKey: process.env.GOOGLE_API_KEY,
});

// @desc    Analyze code using AI
// @route   POST /api/codereview/analyze
// @access  Private
router.post('/analyze', protect, async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ message: 'Code is required' });
    }

    try {
        const chat = getChat();
        const systemPrompt = `You are an expert AI Code Reviewer. Analyze the provided code snippet for quality, security, performance, and best practices.
        
        Output MUST be a valid JSON object with the following structure:
        {
            "score": <number 0-100>,
            "issues": [
                {
                    "type": "warning" | "info" | "suggestion" | "critical",
                    "line": <approximate line number or 0>,
                    "message": "<concise issue description>",
                    "suggestion": "<actionable fix or code snippet>"
                }
            ]
        }
        
        Do not include markdown formatting like \`\`\`json. Just return the raw JSON string.`;

        const response = await chat.invoke([
            new SystemMessage(systemPrompt),
            new HumanMessage(code),
        ]);

        // Clean up response if it contains markdown code blocks
        let cleanResponse = response.content.replace(/```json/g, '').replace(/```/g, '').trim();

        const analysisResult = JSON.parse(cleanResponse);
        res.json(analysisResult);

    } catch (error) {
        console.error('Code Analysis Error:', error);
        res.status(500).json({
            message: 'Analysis failed',
            // Fallback mock response so frontend doesn't break
            score: 0,
            issues: [{ type: 'error', line: 0, message: 'AI Analysis failed', suggestion: 'Try again later' }]
        });
    }
});

export default router;
