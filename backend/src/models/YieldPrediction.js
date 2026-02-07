const mongoose = require('mongoose');

const yieldPredictionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cropName: { type: String, required: true },
    variety: String,
    farmDetails: {
        area: { type: Number, required: true }, // in acres
        location: {
            coordinates: {
                lat: Number,
                lng: Number
            },
            address: String,
            district: String,
            state: String
        },
        soilType: {
            type: String,
            enum: ['alluvial', 'black', 'red', 'laterite', 'desert', 'mountain', 'other']
        },
        irrigationType: {
            type: String,
            enum: ['rainfed', 'canal', 'tubewell', 'drip', 'sprinkler', 'other']
        }
    },
    inputData: {
        sowingDate: Date,
        expectedHarvestDate: Date,
        fertilizers: [{
            name: String,
            quantity: Number, // kg
            applicationDate: Date
        }],
        pesticides: [{
            name: String,
            quantity: Number, // liters
            applicationDate: Date
        }],
        weatherData: mongoose.Schema.Types.Mixed, // API response cached
        historicalYield: [Number] // previous years in tons
    },
    prediction: {
        estimatedYield: Number, // tons
        yieldPerAcre: Number,
        confidence: { type: Number, min: 0, max: 100 },
        modelUsed: { type: String, enum: ['lstm', 'xgboost', 'random_forest', 'ensemble'] },
        predictedDate: Date,
        factors: [{
            name: String, // 'rainfall', 'temperature', 'soil-health'
            impact: { type: String, enum: ['positive', 'negative', 'neutral'] },
            weight: { type: Number, min: 0, max: 1 },
            description: String
        }]
    },
    financialForecast: {
        estimatedRevenue: Number,
        costs: Number,
        profit: Number,
        marketPrice: Number, // per kg at prediction time
        breakEvenPrice: Number
    },
    alternatives: [{
        cropName: String,
        estimatedYield: Number,
        estimatedProfit: Number,
        profitDifference: Number, // % vs current crop
        feasibility: { type: String, enum: ['high', 'medium', 'low'] },
        reason: String
    }],
    actualYield: Number, // filled after harvest
    accuracy: Number, // calculated post-harvest
    status: {
        type: String,
        enum: ['pending', 'predicted', 'harvested', 'verified'],
        default: 'pending'
    }
}, { timestamps: true });

// Indexes
yieldPredictionSchema.index({ userId: 1 });
yieldPredictionSchema.index({ cropName: 1 });
yieldPredictionSchema.index({ createdAt: -1 });
yieldPredictionSchema.index({ 'farmDetails.location.state': 1 });

// Method to calculate accuracy after harvest
yieldPredictionSchema.methods.calculateAccuracy = function () {
    if (this.actualYield && this.prediction.estimatedYield) {
        const diff = Math.abs(this.actualYield - this.prediction.estimatedYield);
        this.accuracy = Math.max(0, 100 - (diff / this.prediction.estimatedYield * 100));
        this.status = 'verified';
        return this.save();
    }
    return this;
};

module.exports = mongoose.model('YieldPrediction', yieldPredictionSchema);
