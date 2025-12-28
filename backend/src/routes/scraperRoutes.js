import express from 'express';
import { runScrapers } from '../services/scraperService.js';

const router = express.Router();

router.get('/run', async (req, res) => {
    try {
        const result = await runScrapers();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
