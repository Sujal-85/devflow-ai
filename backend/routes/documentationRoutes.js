import express from 'express';

const router = express.Router();

const mockFiles = [
    { name: 'auth.service.ts', type: 'service', documented: true },
    { name: 'UserController.ts', type: 'controller', documented: true },
    { name: 'database.utils.ts', type: 'utility', documented: false },
];

router.get('/files', (req, res) => {
    res.json(mockFiles);
});

router.post('/generate', (req, res) => {
    const { fileName } = req.body;
    res.json({
        content: `# Documentation for ${fileName}\n\n## Overview\nAuto-generated documentation...`
    });
});

export default router;
