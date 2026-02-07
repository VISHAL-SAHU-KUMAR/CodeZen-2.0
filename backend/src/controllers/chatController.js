const ChatMessage = require('../models/ChatMessage');

// Get conversation messages
exports.getConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { page = 1, limit = 50 } = req.query;

        const messages = await ChatMessage.find({ conversationId })
            .populate('senderId', 'name avatar')
            .populate('receiverId', 'name avatar')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.json({
            success: true,
            data: messages.reverse(),
            pagination: { page: parseInt(page), limit: parseInt(limit) }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get user conversations list
exports.getConversations = async (req, res) => {
    try {
        const userId = req.user?.id || req.query.userId;

        const conversations = await ChatMessage.aggregate([
            { $match: { $or: [{ senderId: userId }, { receiverId: userId }] } },
            { $sort: { createdAt: -1 } },
            {
                $group: {
                    _id: '$conversationId',
                    lastMessage: { $first: '$$ROOT' },
                    unreadCount: {
                        $sum: { $cond: [{ $and: [{ $eq: ['$receiverId', userId] }, { $eq: ['$readAt', null] }] }, 1, 0] }
                    }
                }
            },
            { $sort: { 'lastMessage.createdAt': -1 } }
        ]);

        res.json({ success: true, data: conversations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Send message
exports.sendMessage = async (req, res) => {
    try {
        const { receiverId, messageType, content, attachments } = req.body;
        const senderId = req.user?.id || req.body.senderId;

        const conversationId = ChatMessage.generateConversationId(senderId, receiverId);

        const message = new ChatMessage({
            conversationId,
            senderId,
            receiverId,
            messageType: messageType || 'text',
            content,
            attachments
        });

        await message.save();

        // Emit socket event if available
        if (req.io) {
            req.io.to(receiverId.toString()).emit('newMessage', message);
        }

        res.status(201).json({ success: true, data: message });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Mark messages as read
exports.markAsRead = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user?.id || req.query.userId;

        await ChatMessage.updateMany(
            { conversationId, receiverId: userId, readAt: null },
            { readAt: new Date() }
        );

        res.json({ success: true, message: 'Messages marked as read' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete message
exports.deleteMessage = async (req, res) => {
    try {
        const message = await ChatMessage.findByIdAndUpdate(
            req.params.id,
            { deletedAt: new Date() },
            { new: true }
        );

        res.json({ success: true, data: message });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
