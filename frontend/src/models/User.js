import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Please provide a username'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide an email'],
  },
  phone: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  role: {
    type: String,
    enum: ['farmer', 'expert', 'supplier'],
    required: true,
  },
  
  profile: {
    fullName: String,
    avatar: String, // URL
    location: {
      state: String,
      district: String,
      village: String,
      coordinates: {
        lat: Number,
        lng: Number
      }
    },
    language: String, // 'hindi', 'punjabi', 'marathi'
    verified: {
      type: Boolean,
      default: false
    }
  },
  
  preferences: {
    notifications: {
      type: Boolean,
      default: true
    },
    emailAlerts: {
      type: Boolean,
      default: true
    },
    smsAlerts: {
      type: Boolean,
      default: true
    }
  },
  
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'premium', 'enterprise'],
      default: 'free'
    },
    expiresAt: Date
  },
  
  stats: {
    level: {
      type: Number,
      default: 1
    },
    points: {
      type: Number,
      default: 0
    },
    badges: [String],
    detectionsCount: {
      type: Number,
      default: 0
    },
    videosWatched: {
      type: Number,
      default: 0
    },
    questionsAsked: {
      type: Number,
      default: 0
    },
    answersGiven: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
