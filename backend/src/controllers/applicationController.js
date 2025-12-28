import ApplicationLog from '../models/ApplicationLog.js';

export const getApplications = async (req, res) => {
    try {
        const logs = await ApplicationLog.find({ userId: req.user.id }).sort({ appliedAt: -1 });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const total = await ApplicationLog.countDocuments({ userId });
        const success = await ApplicationLog.countDocuments({ userId, status: 'success' });
        const pending = await ApplicationLog.countDocuments({ userId, status: 'pending' });

        // Simple daily stats for graph
        const days = 7;
        const dailyStats = [];
        for (let i = 0; i < days; i++) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            d.setHours(0, 0, 0, 0);
            const nextD = new Date(d);
            nextD.setDate(d.getDate() + 1);

            const count = await ApplicationLog.countDocuments({
                userId,
                appliedAt: { $gte: d, $lt: nextD }
            });
            dailyStats.push({ name: d.toLocaleDateString('en-US', { weekday: 'short' }), applications: count });
        }

        res.json({
            stats: { total, success, pending, dailyStats: dailyStats.reverse() }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
