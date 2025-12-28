import UserSettings from '../models/UserSettings.js';
import multer from 'multer';
import path from 'path';

// Multer config
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
    }
});
export const upload = multer({ storage });

export const getSettings = async (req, res) => {
    try {
        let settings = await UserSettings.findOne({ userId: req.user.id });
        if (!settings) {
            // Create default settings if not exists
            settings = await UserSettings.create({
                userId: req.user.id,
                keywords: [],
                locations: [],
                coverLetterStyle: 'medium',
                autoApplyEnabled: false
            });
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSettings = async (req, res) => {
    try {
        const settings = await UserSettings.findOneAndUpdate(
            { userId: req.user.id },
            req.body,
            { new: true, upsert: true }
        );
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const uploadResume = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    try {
        const settings = await UserSettings.findOneAndUpdate(
            { userId: req.user.id },
            { resumePath: req.file.path },
            { new: true, upsert: true }
        );
        res.json({ message: "Resume uploaded", path: req.file.path });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
