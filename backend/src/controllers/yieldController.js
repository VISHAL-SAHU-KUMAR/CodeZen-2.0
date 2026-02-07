const YieldPrediction = require('../models/YieldPrediction');

// Get user predictions
exports.getPredictions = async (req, res) => {
    try {
        const userId = req.user?.id || req.query.userId;
        const { page = 1, limit = 10, status } = req.query;
        const query = userId ? { userId } : {};
        if (status) query.status = status;

        const predictions = await YieldPrediction.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .select('cropName farmDetails.area prediction.estimatedYield prediction.confidence status createdAt');

        const total = await YieldPrediction.countDocuments(query);

        res.json({
            success: true,
            data: predictions,
            pagination: { page: parseInt(page), limit: parseInt(limit), total }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single prediction
exports.getPrediction = async (req, res) => {
    try {
        const prediction = await YieldPrediction.findById(req.params.id)
            .populate('userId', 'name email');

        if (!prediction) {
            return res.status(404).json({ success: false, message: 'Prediction not found' });
        }

        res.json({ success: true, data: prediction });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create prediction
exports.createPrediction = async (req, res) => {
    try {
        const { cropName, variety, farmDetails, inputData } = req.body;

        // Simulated ML prediction (in production, call AI service)
        const estimatedYield = farmDetails.area * (Math.random() * 2 + 1.5); // 1.5-3.5 tons/acre
        const confidence = Math.floor(Math.random() * 20 + 75); // 75-95%

        const prediction = new YieldPrediction({
            userId: req.user?.id || '65f0a1b2c3d4e5f6a7b8c9d0',
            cropName,
            variety,
            farmDetails,
            inputData,
            prediction: {
                estimatedYield: parseFloat(estimatedYield.toFixed(2)),
                yieldPerAcre: parseFloat((estimatedYield / farmDetails.area).toFixed(2)),
                confidence,
                modelUsed: 'xgboost',
                predictedDate: new Date(),
                factors: [
                    { name: 'Weather', impact: 'positive', weight: 0.35, description: 'Favorable rainfall expected' },
                    { name: 'Soil Quality', impact: 'positive', weight: 0.25, description: 'Good soil nutrients' },
                    { name: 'Irrigation', impact: 'neutral', weight: 0.20, description: 'Adequate water supply' },
                    { name: 'Historical Yield', impact: 'positive', weight: 0.20, description: 'Consistent past performance' }
                ]
            },
            financialForecast: {
                marketPrice: 2500, // Rs per quintal
                estimatedRevenue: estimatedYield * 10 * 2500, // tons to quintals * price
                costs: farmDetails.area * 15000, // estimated cost per acre
                profit: (estimatedYield * 10 * 2500) - (farmDetails.area * 15000)
            },
            alternatives: [
                { cropName: 'Soybean', estimatedYield: farmDetails.area * 1.2, estimatedProfit: farmDetails.area * 1.2 * 10 * 4000 - farmDetails.area * 12000, feasibility: 'high' },
                { cropName: 'Maize', estimatedYield: farmDetails.area * 2.5, estimatedProfit: farmDetails.area * 2.5 * 10 * 1800 - farmDetails.area * 10000, feasibility: 'medium' }
            ],
            status: 'predicted'
        });

        await prediction.save();
        res.status(201).json({ success: true, data: prediction });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update actual yield
exports.updateActualYield = async (req, res) => {
    try {
        const { actualYield } = req.body;
        const prediction = await YieldPrediction.findById(req.params.id);

        if (!prediction) {
            return res.status(404).json({ success: false, message: 'Prediction not found' });
        }

        prediction.actualYield = actualYield;
        await prediction.calculateAccuracy();

        res.json({ success: true, data: prediction });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get crop recommendations
exports.getCropRecommendations = async (req, res) => {
    try {
        const { soilType, irrigationType, state } = req.query;

        // Simulated recommendations based on inputs
        const crops = [
            { name: 'Wheat', suitability: 'high', expectedYield: 2.5, profitPotential: 'medium' },
            { name: 'Rice', suitability: irrigationType === 'canal' ? 'high' : 'medium', expectedYield: 3.0, profitPotential: 'high' },
            { name: 'Cotton', suitability: soilType === 'black' ? 'high' : 'medium', expectedYield: 1.8, profitPotential: 'high' },
            { name: 'Soybean', suitability: 'medium', expectedYield: 1.2, profitPotential: 'medium' }
        ];

        res.json({ success: true, data: crops });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
