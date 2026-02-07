const ForumPost = require('../models/ForumPost');

// Get all posts with filters
exports.getPosts = async (req, res) => {
    try {
        const { category, tags, status, page = 1, limit = 10 } = req.query;
        const query = {};

        if (category) query.category = category;
        if (status) query.status = status;
        if (tags) query.tags = { $in: tags.split(',') };

        const posts = await ForumPost.find(query)
            .populate('userId', 'name email')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await ForumPost.countDocuments(query);

        res.json({
            success: true,
            data: posts,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single post
exports.getPost = async (req, res) => {
    try {
        const post = await ForumPost.findById(req.params.id)
            .populate('userId', 'name email')
            .populate('answers.userId', 'name email');

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        // Increment views
        post.views += 1;
        await post.save();

        res.json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create post
exports.createPost = async (req, res) => {
    try {
        const { category, title, content, tags, attachments, language } = req.body;

        const post = new ForumPost({
            userId: req.user?.id || '65f0a1b2c3d4e5f6a7b8c9d0', // fallback for demo
            category,
            title,
            content,
            tags,
            attachments,
            language
        });

        await post.save();
        res.status(201).json({ success: true, data: post });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Add answer
exports.addAnswer = async (req, res) => {
    try {
        const { content, attachments } = req.body;
        const post = await ForumPost.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        post.answers.push({
            userId: req.user?.id || '65f0a1b2c3d4e5f6a7b8c9d0',
            content,
            attachments
        });

        if (post.status === 'open') {
            post.status = 'answered';
        }

        await post.save();
        res.json({ success: true, data: post });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Vote on post
exports.votePost = async (req, res) => {
    try {
        const { type } = req.body; // 'upvote' or 'downvote'
        const userId = req.user?.id || '65f0a1b2c3d4e5f6a7b8c9d0';
        const post = await ForumPost.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        // Remove existing votes
        post.upvotes = post.upvotes.filter(id => id.toString() !== userId);
        post.downvotes = post.downvotes.filter(id => id.toString() !== userId);

        // Add new vote
        if (type === 'upvote') {
            post.upvotes.push(userId);
        } else {
            post.downvotes.push(userId);
        }

        await post.save();
        res.json({ success: true, data: post });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Accept answer
exports.acceptAnswer = async (req, res) => {
    try {
        const { answerId } = req.params;
        const post = await ForumPost.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        const answer = post.answers.id(answerId);
        if (!answer) {
            return res.status(404).json({ success: false, message: 'Answer not found' });
        }

        // Unaccept all answers first
        post.answers.forEach(a => a.isAccepted = false);
        answer.isAccepted = true;
        post.status = 'answered';

        await post.save();
        res.json({ success: true, data: post });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
