import mongoose from 'mongoose';

const DiseaseSchema = new mongoose.Schema({
  name: {
    en: String,
    hi: String,
    pa: String, // Punjabi
    mr: String  // Marathi
  },
  
  scientificName: String,
  
  affectedCrops: [String],
  
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical']
  },
  
  type: {
    type: String,
    enum: ['fungal', 'bacterial', 'viral', 'pest']
  },
  
  season: [String], // ['rainy', 'winter', 'summer']
  
  symptoms: [{
    description: String,
    stage: String, // 'early', 'mid', 'late'
    imageUrl: String
  }],
  
  treatment: {
    chemical: [{
      name: String,
      dosage: String,
      applicationMethod: String,
      cost: Number,
      timing: String
    }],
    organic: [{
      name: String,
      recipe: String,
      applicationMethod: String
    }],
    cultural: [String] // preventive practices
  },
  
  impact: {
    yieldLoss: Number, // percentage
    spreadRate: String, // 'slow', 'moderate', 'fast'
    recoveryTime: Number // days
  },
  
  videos: [{
    title: String,
    language: String,
    duration: Number,
    url: String,
    thumbnailUrl: String,
    viewCount: Number,
    transcript: String
  }],
  
  model3D: {
    url: String,
    format: String // 'gltf', 'fbx'
  },
  
  relatedDiseases: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Disease'
  }],
  
  detectionCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.models.Disease || mongoose.model('Disease', DiseaseSchema);
