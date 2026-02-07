const mongoose = require('mongoose');

const governmentSchemeSchema = new mongoose.Schema({
    name: {
        en: { type: String, required: true },
        hi: String
    },
    description: { type: String, required: true },
    provider: {
        type: String,
        enum: ['central', 'state', 'district'],
        required: true
    },
    state: String, // if state-specific
    eligibility: [{ type: String }],
    benefits: { type: String },
    benefitAmount: {
        min: Number,
        max: Number,
        currency: { type: String, default: 'INR' }
    },
    documents: [{ type: String }],
    applicationProcess: {
        steps: [String],
        onlineUrl: String,
        offlineProcess: String,
        estimatedTime: String // e.g., "15-30 days"
    },
    deadline: Date,
    contactInfo: {
        helpline: String,
        email: String,
        website: String,
        officeAddress: String
    },
    videoGuideUrl: String,
    applicationsCount: { type: Number, default: 0 },
    successRate: Number, // percentage
    tags: [{ type: String }],
    category: {
        type: String,
        enum: ['subsidy', 'loan', 'insurance', 'equipment', 'training', 'marketing', 'other'],
        default: 'other'
    },
    targetCrops: [String],
    targetFarmers: {
        type: String,
        enum: ['all', 'small', 'marginal', 'women', 'sc_st', 'organic'],
        default: 'all'
    },
    active: { type: Boolean, default: true },
    featured: { type: Boolean, default: false }
}, { timestamps: true });

// Indexes
governmentSchemeSchema.index({ provider: 1 });
governmentSchemeSchema.index({ state: 1 });
governmentSchemeSchema.index({ category: 1 });
governmentSchemeSchema.index({ active: 1 });
governmentSchemeSchema.index({ tags: 1 });
governmentSchemeSchema.index({ deadline: 1 });

// Virtual for display name
governmentSchemeSchema.virtual('displayName').get(function () {
    return this.name.en || this.name.hi;
});

// Method to check if scheme is expired
governmentSchemeSchema.methods.isExpired = function () {
    return this.deadline && new Date() > this.deadline;
};

governmentSchemeSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('GovernmentScheme', governmentSchemeSchema);
