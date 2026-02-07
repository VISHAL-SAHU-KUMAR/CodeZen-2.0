const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const chatController = require('../controllers/chatController');

// Forum routes
router.get('/posts', forumController.getPosts);
router.get('/posts/:id', forumController.getPost);
router.post('/posts', forumController.createPost);
router.post('/posts/:id/answers', forumController.addAnswer);
router.post('/posts/:id/vote', forumController.votePost);
router.post('/posts/:id/answers/:answerId/accept', forumController.acceptAnswer);

// Chat routes
router.get('/chat/conversations', chatController.getConversations);
router.get('/chat/:conversationId', chatController.getConversation);
router.post('/chat/messages', chatController.sendMessage);
router.post('/chat/:conversationId/read', chatController.markAsRead);
router.delete('/chat/messages/:id', chatController.deleteMessage);

// Health check
router.get('/', (req, res) => {
  res.json({ message: 'Community module active', endpoints: ['/posts', '/chat'] });
});

module.exports = router;
