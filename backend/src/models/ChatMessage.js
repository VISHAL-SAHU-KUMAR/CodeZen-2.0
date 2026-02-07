const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    conversationId: { type: String, required: true, index: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    messageType: {
        type: String,
        enum: ['text', 'image', 'video', 'audio', 'file'],
        default: 'text'
    },
    content: { type: String },
    attachments: [{
        type: { type: String, enum: ['image', 'video', 'audio', 'file'] },
        url: String,
        fileName: String,
        fileSize: Number
    }],
    metadata: {
        language: { type: String, default: 'en' },
        translatedTo: String,
        translatedContent: String,
        aiGenerated: { type: Boolean, default: false }
    },
    readAt: Date,
    deletedAt: Date
}, { timestamps: true });

// Indexes for efficient queries
chatMessageSchema.index({ conversationId: 1, createdAt: -1 });
chatMessageSchema.index({ senderId: 1 });
chatMessageSchema.index({ receiverId: 1 });

// Static method to generate conversation ID
chatMessageSchema.statics.generateConversationId = function (userId1, userId2) {
    const ids = [userId1.toString(), userId2.toString()].sort();
    return `${ids[0]}_${ids[1]}`;
};

// Instance method to mark as read
chatMessageSchema.methods.markAsRead = function () {
    this.readAt = new Date();
    return this.save();
};

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
