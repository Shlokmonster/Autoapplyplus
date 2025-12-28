import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    applyUrl: { type: String, required: true, unique: true },
    description: { type: String },
    source: { type: String, required: true }, // e.g., 'LinkedIn', 'Internshala'
    matched: { type: Boolean, default: false },
    applied: { type: Boolean, default: false },
    status: { type: String, enum: ['pending', 'applied', 'failed'], default: 'pending' },
    scrapedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Job', jobSchema);
