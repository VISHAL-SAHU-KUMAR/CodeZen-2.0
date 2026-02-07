import mongoose from 'mongoose';

const DetectionHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  image: {
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  },
  
  detection: {
    diseaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Disease'
    },
    diseaseName: String,
    confidence: Number, // 0-100
    heatmapUrl: String, // AI-generated heatmap
    
    affectedArea: Number, // percentage of leaf
    severity: String
  },
  
  farmContext: {
    cropName: String,
    fieldArea: Number,
    location: {
      coordinates: {
        lat: Number,
        lng: Number
      },
      address: String
    }
  },
  
  treatmentPlan: {
    recommended: String,
    costEstimate: Number,
    timeline: String
  },
  
  financialImpact: {
    potentialLoss: Number,
    treatmentCost: Number,
    netImpact: Number
  },
  
  actions: [{
    type: String, // 'treatment-applied', 'expert-consulted'
    date: Date,
    notes: String
  }],
  
  status: {
    type: String,
    enum: ['detected', 'treating', 'resolved', 'lost'],
    default: 'detected'
  }
}, {
  timestamps: true
});

export default mongoose.models.DetectionHistory || mongoose.model('DetectionHistory', DetectionHistorySchema);
