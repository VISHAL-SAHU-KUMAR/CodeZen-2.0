const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    timestamp: { type: Number, required: true }, // seconds
    description: String
});

const commentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    timestamp: Number, // at which second
    createdAt: { type: Date, default: Date.now }
});

const videoSchema = new mongoose.Schema({
    title: {
        en: { type: String, required: true },
        hi: String,
        pa: String,
        mr: String
    },
    description: { type: String },
    category: {
        type: String,
        enum: ['disease', 'tutorial', 'course', 'webinar', 'general'],
        default: 'general'
    },
    diseaseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Disease' },
    duration: { type: Number }, // seconds
    languages: [{
        code: { type: String, enum: ['en', 'hi', 'pa', 'mr'] },
        videoUrl: String,
        audioUrl: String,
        subtitleUrl: String // VTT file
    }],
    thumbnailUrl: { type: String },
    chapters: [chapterSchema],
    relatedProducts: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        timestamp: Number // when to show
    }],
    aiGenerated: { type: Boolean, default: false },
    generationPrompt: String,
    stats: {
        views: { type: Number, default: 0 },
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
        shares: { type: Number, default: 0 },
        avgWatchTime: { type: Number, default: 0 },
        completionRate: { type: Number, default: 0 }
    },
    comments: [commentSchema],
    isPublished: { type: Boolean, default: true }
}, { timestamps: true });

// Indexes
videoSchema.index({ category: 1 });
videoSchema.index({ diseaseId: 1 });
videoSchema.index({ 'stats.views': -1 });
videoSchema.index({ createdAt: -1 });

// Virtual for primary title
videoSchema.virtual('displayTitle').get(function () {
    return this.title.en || this.title.hi || 'Untitled Video';
});

// Method to increment views
videoSchema.methods.incrementViews = function () {
    this.stats.views += 1;
    return this.save();
};

videoSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Video', videoSchema);
