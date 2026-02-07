const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/profile', authMiddleware, authController.getProfile);
router.put('/profile', authMiddleware, authController.updateProfile);
router.get('/users/:id', authController.getUserById);
router.post('/users/:id/follow', authMiddleware, authController.toggleFollow);
router.get('/experts', authController.getExperts);
router.post('/achievements', authMiddleware, authController.addAchievement);

// Route info
router.get('/', (req, res) => {
    res.json({
        message: 'Auth module active',
        endpoints: ['/register', '/login', '/profile', '/users/:id', '/experts']
    });
});

module.exports = router;
