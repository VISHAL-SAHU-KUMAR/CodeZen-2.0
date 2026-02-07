const GovernmentScheme = require('../models/GovernmentScheme');

// Get all schemes with filters
exports.getSchemes = async (req, res) => {
    try {
        const { provider, state, category, page = 1, limit = 10, search } = req.query;
        const query = { active: true };

        if (provider) query.provider = provider;
        if (state) query.$or = [{ state }, { provider: 'central' }];
        if (category) query.category = category;
        if (search) {
            query.$or = [
                { 'name.en': { $regex: search, $options: 'i' } },
                { 'name.hi': { $regex: search, $options: 'i' } },
                { tags: { $in: [search] } }
            ];
        }

        const schemes = await GovernmentScheme.find(query)
            .sort({ featured: -1, createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .select('name provider state category benefits deadline tags featured');

        const total = await GovernmentScheme.countDocuments(query);

        res.json({
            success: true,
            data: schemes,
            pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single scheme
exports.getScheme = async (req, res) => {
    try {
        const scheme = await GovernmentScheme.findById(req.params.id);

        if (!scheme) {
            return res.status(404).json({ success: false, message: 'Scheme not found' });
        }

        res.json({ success: true, data: scheme });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get featured schemes
exports.getFeatured = async (req, res) => {
    try {
        const schemes = await GovernmentScheme.find({ active: true, featured: true })
            .limit(5)
            .select('name provider benefits deadline tags');

        res.json({ success: true, data: schemes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get schemes by eligibility
exports.getEligibleSchemes = async (req, res) => {
    try {
        const { farmerType, crops, state } = req.query;
        const query = {
            active: true,
            $or: [{ targetFarmers: 'all' }]
        };

        if (farmerType) query.$or.push({ targetFarmers: farmerType });
        if (state) query.$or.push({ state }, { provider: 'central' });
        if (crops) query.$or.push({ targetCrops: { $in: crops.split(',') } });

        const schemes = await GovernmentScheme.find(query)
            .sort({ deadline: 1 })
            .select('name provider benefits deadline category');

        res.json({ success: true, data: schemes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Increment application count
exports.trackApplication = async (req, res) => {
    try {
        const scheme = await GovernmentScheme.findByIdAndUpdate(
            req.params.id,
            { $inc: { applicationsCount: 1 } },
            { new: true }
        );

        res.json({ success: true, data: { applicationsCount: scheme.applicationsCount } });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get scheme categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await GovernmentScheme.aggregate([
            { $match: { active: true } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        res.json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
