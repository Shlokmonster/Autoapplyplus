import express from 'express';
import { getSettings, updateSettings, uploadResume, upload } from '../controllers/settingsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getSettings);
router.post('/update', protect, updateSettings);
router.post('/resume-upload', protect, upload.single('resume'), uploadResume);

export default router;
