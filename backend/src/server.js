require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./utils/database');

// Import routes
const authRoutes = require('./routes/auth');
const diseaseRoutes = require('./routes/disease');
const profileRoutes = require('./routes/profile');
const communityRoutes = require('./routes/community');
const aiToolsRoutes = require('./routes/ai-tools');
const learningRoutes = require('./routes/learning');
const marketplaceRoutes = require('./routes/marketplace');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB(); // Uncomment when database utils are implemented

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/disease', diseaseRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/ai-tools', aiToolsRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/marketplace', marketplaceRoutes);

// Root endpoint for Render Health Check
app.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    message: 'AgriPredict360 Backend API is running',
    version: '1.0.0'
  });
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
