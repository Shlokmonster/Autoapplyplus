import express from 'express';
import { getApplications, getStats } from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';

import { runAutoApply } from '../services/autoApplyService.js';

const router = express.Router();

router.get('/', protect, getApplications);
router.get('/stats', protect, getStats);

router.post('/run', protect, async (req, res) => {
    try {
        console.log("Triggering Auto-Apply for user:", req.user.id);
        // Run asynchronously (don't wait for it to finish to respond, or do wait?)
        // For debugging, it's better to wait and see the output.
        await runAutoApply(req.user.id);
        res.json({ message: 'Auto-apply process completed successfully' });
    } catch (error) {
        console.error("Auto-apply failed:", error);
        res.status(500).json({ message: error.message });
    }
});

export default router;
