import mongoose from 'mongoose';

const FarmerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  farmDetails: {
    totalArea: Number, // in acres
    irrigationType: String, // 'drip', 'sprinkler', 'flood'
    soilType: String,
    
    crops: [{
      name: String,
      variety: String,
      area: Number,
      sowingDate: Date,
      expectedHarvestDate: Date,
      status: {
        type: String,
        enum: ['growing', 'harvested'],
        default: 'growing'
      }
    }]
  },
  
  equipment: [{
    name: String,
    type: String,
    purchaseDate: Date
  }],
  
  achievements: [{
    title: String,
    description: String,
    icon: String,
    unlockedAt: Date
  }],
  
  bio: String,
  experience: Number, // years
  specialization: [String], // ['organic', 'dairy', 'horticulture']
  
  social: {
    facebook: String,
    twitter: String,
    youtube: String
  },
  
  visibility: {
    type: String,
    enum: ['public', 'private', 'friends'],
    default: 'public'
  },
  
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

export default mongoose.models.FarmerProfile || mongoose.model('FarmerProfile', FarmerProfileSchema);
