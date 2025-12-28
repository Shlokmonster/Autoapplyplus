import mongoose from 'mongoose';

const applicationLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    jobTitle: String,
    company: String,
    status: { type: String, enum: ['success', 'failed', 'pending'], default: 'pending' },
    message: String,
    appliedAt: { type: Date, default: Date.now },
});

export default mongoose.model('ApplicationLog', applicationLogSchema);
