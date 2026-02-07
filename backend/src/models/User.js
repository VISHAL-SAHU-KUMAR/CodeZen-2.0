const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    fullName: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['farmer', 'expert', 'admin'],
        default: 'farmer'
    },
    location: {
        coordinates: { lat: Number, lng: Number },
        address: String,
        district: String,
        state: String,
        pincode: String
    },
    farmDetails: {
        totalArea: { type: Number, default: 0 },
        soilType: String,
        irrigationType: String,
        crops: [{
            id: mongoose.Schema.Types.ObjectId,
            name: String,
            variety: String,
            area: Number,
            sowingDate: Date,
            expectedHarvestDate: Date,
            status: { type: String, enum: ['planned', 'growing', 'harvested'], default: 'planned' }
        }]
    },
    experience: { type: Number, default: 0 },
    bio: { type: String, maxlength: 500 },
    language: { type: String, default: 'hi' },

    // Social
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    // Gamification
    stats: {
        level: { type: Number, default: 1 },
        points: { type: Number, default: 0 },
        detectionsCount: { type: Number, default: 0 },
        answersGiven: { type: Number, default: 0 },
        videosWatched: { type: Number, default: 0 }
    },
    achievements: [{
        id: String,
        title: String,
        icon: String,
        description: String,
        unlockedAt: Date
    }],

    // Expert fields
    expertise: [String],
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    rate: { type: Number, default: 0 },
    availability: {
        status: { type: String, enum: ['available', 'busy', 'offline'], default: 'offline' },
        schedule: mongoose.Schema.Types.Mixed
    },

    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    lastLogin: Date
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { id: this._id, role: this.role },
        process.env.JWT_SECRET || 'agripredict360_secret_key',
        { expiresIn: '7d' }
    );
};

// Virtual for follower count
userSchema.virtual('followerCount').get(function () {
    return this.followers.length;
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ 'location.state': 1, 'location.district': 1 });
userSchema.index({ role: 1, 'availability.status': 1 });

module.exports = mongoose.model('User', userSchema);
