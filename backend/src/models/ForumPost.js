const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  attachments: [{
    type: { type: String, enum: ['image', 'video', 'document'] },
    url: String
  }],
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isAccepted: { type: Boolean, default: false },
  isByExpert: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const forumPostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { 
    type: String, 
    enum: ['disease', 'yield', 'market', 'equipment', 'general'],
    default: 'general'
  },
  title: { type: String, required: true, maxlength: 200 },
  content: { type: String, required: true },
  tags: [{ type: String }],
  attachments: [{
    type: { type: String, enum: ['image', 'video', 'document'] },
    url: String
  }],
  language: { type: String, default: 'en' },
  views: { type: Number, default: 0 },
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  answers: [answerSchema],
  status: { 
    type: String, 
    enum: ['open', 'answered', 'closed'],
    default: 'open'
  }
}, { timestamps: true });

// Indexes for performance
forumPostSchema.index({ category: 1 });
forumPostSchema.index({ tags: 1 });
forumPostSchema.index({ userId: 1 });
forumPostSchema.index({ createdAt: -1 });

// Virtual for answer count
forumPostSchema.virtual('answerCount').get(function() {
  return this.answers.length;
});

// Virtual for vote score
forumPostSchema.virtual('voteScore').get(function() {
  return this.upvotes.length - this.downvotes.length;
});

forumPostSchema.set('toJSON', { virtuals: true });
forumPostSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('ForumPost', forumPostSchema);
