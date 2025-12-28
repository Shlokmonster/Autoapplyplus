import mongoose from 'mongoose';

const userSettingsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    keywords: [{ type: String }],
    locations: [{ type: String }],
    resumePath: { type: String },
    coverLetterStyle: { type: String, enum: ['short', 'medium', 'long'], default: 'medium' },
    autoApplyEnabled: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('UserSettings', userSettingsSchema);
