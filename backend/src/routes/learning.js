const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const schemeController = require('../controllers/schemeController');

// Video routes
router.get('/videos', videoController.getVideos);
router.get('/videos/recommendations', videoController.getRecommendations);
router.get('/videos/:id', videoController.getVideo);
router.post('/videos/:id/stats', videoController.updateStats);
router.post('/videos/:id/comments', videoController.addComment);
router.post('/videos/:id/progress', videoController.updateProgress);

// Government scheme routes
router.get('/schemes', schemeController.getSchemes);
router.get('/schemes/featured', schemeController.getFeatured);
router.get('/schemes/categories', schemeController.getCategories);
router.get('/schemes/eligible', schemeController.getEligibleSchemes);
router.get('/schemes/:id', schemeController.getScheme);
router.post('/schemes/:id/apply', schemeController.trackApplication);

// Health check
router.get('/', (req, res) => {
  res.json({ message: 'Learning module active', endpoints: ['/videos', '/schemes'] });
});

module.exports = router;
