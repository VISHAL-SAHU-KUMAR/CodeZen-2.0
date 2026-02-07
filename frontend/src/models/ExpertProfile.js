import mongoose from 'mongoose';

const ExpertProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  credentials: {
    degree: String,
    university: String,
    yearOfCompletion: Number,
    certificates: [{
      name: String,
      issuedBy: String,
      fileUrl: String
    }]
  },
  
  expertise: [String], // ['plant-pathology', 'soil-science', 'agronomy']
  
  experience: {
    years: Number,
    currentOrganization: String,
    designation: String,
    previousWork: [{
      organization: String,
      role: String,
      duration: String
    }]
  },
  
  availability: {
    status: {
      type: String,
      enum: ['available', 'busy', 'offline'],
      default: 'offline'
    },
    consultationRate: Number, // ₹ per hour
    preferredTime: [String], // ['morning', 'evening']
  },
  
  ratings: {
    average: {
      type: Number,
      default: 0
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    reviews: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      rating: Number,
      comment: String,
      date: {
        type: Date,
        default: Date.now
      }
    }]
  },
  
  stats: {
    consultations: {
      type: Number,
      default: 0
    },
    answersGiven: {
      type: Number,
      default: 0
    },
    helpfulVotes: {
      type: Number,
      default: 0
    }
  },
  
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.models.ExpertProfile || mongoose.model('ExpertProfile', ExpertProfileSchema);
