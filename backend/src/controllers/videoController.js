const Video = require('../models/Video');

// Get all videos with filters
exports.getVideos = async (req, res) => {
    try {
        const { category, language, page = 1, limit = 12, sort = 'recent' } = req.query;
        const query = { isPublished: true };

        if (category) query.category = category;
        if (language) query['languages.code'] = language;

        let sortOption = { createdAt: -1 };
        if (sort === 'popular') sortOption = { 'stats.views': -1 };
        if (sort === 'likes') sortOption = { 'stats.likes': -1 };

        const videos = await Video.find(query)
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .select('title thumbnailUrl duration category stats.views createdAt');

        const total = await Video.countDocuments(query);

        res.json({
            success: true,
            data: videos,
            pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single video
exports.getVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id)
            .populate('diseaseId', 'name')
            .populate('comments.userId', 'name avatar');

        if (!video) {
            return res.status(404).json({ success: false, message: 'Video not found' });
        }

        // Increment views
        video.stats.views += 1;
        await video.save();

        res.json({ success: true, data: video });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get recommended videos
exports.getRecommendations = async (req, res) => {
    try {
        const { videoId, limit = 6 } = req.query;
        const currentVideo = await Video.findById(videoId);

        const recommendations = await Video.find({
            _id: { $ne: videoId },
            isPublished: true,
            $or: [
                { category: currentVideo?.category },
                { diseaseId: currentVideo?.diseaseId }
            ]
        })
            .sort({ 'stats.views': -1 })
            .limit(parseInt(limit))
            .select('title thumbnailUrl duration stats.views');

        res.json({ success: true, data: recommendations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Like/dislike video
exports.updateStats = async (req, res) => {
    try {
        const { action } = req.body; // 'like', 'dislike', 'share'
        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({ success: false, message: 'Video not found' });
        }

        if (action === 'like') video.stats.likes += 1;
        else if (action === 'dislike') video.stats.dislikes += 1;
        else if (action === 'share') video.stats.shares += 1;

        await video.save();
        res.json({ success: true, data: video.stats });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Add comment
exports.addComment = async (req, res) => {
    try {
        const { text, timestamp } = req.body;
        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({ success: false, message: 'Video not found' });
        }

        video.comments.push({
            userId: req.user?.id || '65f0a1b2c3d4e5f6a7b8c9d0',
            text,
            timestamp
        });

        await video.save();
        res.json({ success: true, data: video.comments });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update watch progress
exports.updateProgress = async (req, res) => {
    try {
        const { watchTime, completed } = req.body;
        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({ success: false, message: 'Video not found' });
        }

        // Update average watch time
        const currentTotal = video.stats.avgWatchTime * (video.stats.views - 1);
        video.stats.avgWatchTime = (currentTotal + watchTime) / video.stats.views;

        if (completed) {
            video.stats.completionRate = ((video.stats.completionRate * (video.stats.views - 1)) + 1) / video.stats.views;
        }

        await video.save();
        res.json({ success: true, message: 'Progress updated' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
