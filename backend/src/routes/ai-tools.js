const express = require('express');
const router = express.Router();
const yieldController = require('../controllers/yieldController');

// Yield prediction routes
router.get('/yield-predictions', yieldController.getPredictions);
router.get('/yield-predictions/:id', yieldController.getPrediction);
router.post('/yield-predictions', yieldController.createPrediction);
router.put('/yield-predictions/:id/actual', yieldController.updateActualYield);
router.get('/crop-recommendations', yieldController.getCropRecommendations);

// Health check
router.get('/', (req, res) => {
  res.json({ message: 'AI Tools module active', endpoints: ['/yield-predictions', '/crop-recommendations'] });
});

module.exports = router;
