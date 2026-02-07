const express = require('express');
const router = express.Router();
const diseaseController = require('../controllers/diseaseController');

router.post('/detect', diseaseController.detectDisease);
router.get('/history', diseaseController.getHistory);
router.get('/:id', diseaseController.getDiseaseDetails);

module.exports = router;
