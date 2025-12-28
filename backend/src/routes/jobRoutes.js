import express from 'express';
import Job from '../models/Job.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find().sort({ scrapedAt: -1 }).limit(100);
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/stats', async (req, res) => {
    try {
        const total = await Job.countDocuments();
        const applied = await Job.countDocuments({ applied: true });
        res.json({ total, applied });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
