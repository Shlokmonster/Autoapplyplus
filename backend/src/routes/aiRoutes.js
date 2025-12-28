import express from 'express';
import { generateCoverLetter } from '../services/aiService.js';

const router = express.Router();

router.post('/cover-letter', async (req, res) => {
    const { jobDescription, userResumeSummary } = req.body;
    try {
        const letter = await generateCoverLetter(jobDescription, userResumeSummary);
        res.json({ coverLetter: letter });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
